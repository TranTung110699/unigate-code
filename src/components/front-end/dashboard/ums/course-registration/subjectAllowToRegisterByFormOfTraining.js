import React from 'react';
import get from 'lodash.get';
import { t, t1, t3 } from 'translate';
import AntdTable from 'antd/lib/table';
import fetchData from 'components/common/fetchData';
import { daysOfWeek } from 'components/timetable_v2/utils/DateUtils';
import {
  getDateFromUnix,
  getStartTimeAndEndTimeOfTimetable,
} from 'components/timetable_v2/viewers/schema/CourseTimetables';
import ElementActionsContent from './elementActionsContent';

class SubjectAllowToRegster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: [],
      headerRowSpan: 2,
      scoreScale: '0_10',
      testColSpan: 0,
      groupBy: null,
      finalExamColSpan: 1,
    };
  }

  sortSubjectsByFormOfTraining = (subjects) => {
    const major = get(this.props, 'formOfTraining.major');
    const trainingMode = get(this.props, 'formOfTraining.training_mode');
    const trainingLevel = get(this.props, 'formOfTraining.training_level');
    const ico = get(this.props, 'formOfTraining.ico');
    const subjectsOutsideTheTeachingPlan = [];
    const subjectsInTheTeachingPlan = [];

    subjects.forEach(({ courses, ...subject }) => {
      if (!Array.isArray(courses) || !courses.length) {
        return;
      }
      const course = courses.find(
        (row) =>
          row.major === major &&
          row.training_mode === trainingMode &&
          row.training_level === trainingLevel &&
          row.ico === ico,
      );

      if (course) {
        subjectsInTheTeachingPlan.push({
          ...subject,
          courses,
          inTheTeachingPlan: true,
        });
      } else {
        subjectsOutsideTheTeachingPlan.push({ ...subject, courses });
      }
    });

    return subjectsInTheTeachingPlan.concat(subjectsOutsideTheTeachingPlan);
  };

  getDataSourceToRender = (subjectToRegisterGroupBySemester) => {
    if (
      !Array.isArray(subjectToRegisterGroupBySemester) ||
      !subjectToRegisterGroupBySemester.length
    ) {
      return [];
    }

    let stt = 0;

    return subjectToRegisterGroupBySemester.reduce(
      (result, { subjects, ...semester }) => {
        if (!Array.isArray(subjects) || !subjects.length) {
          return result;
        }

        return result.concat(
          this.sortSubjectsByFormOfTraining(subjects).reduce(
            (subjectResult, { courses, ...subject }) => {
              const rowSpan = Array.isArray(courses) && courses.length;
              if (!rowSpan) {
                return subjectResult;
              }
              return subjectResult.concat(
                courses.map((course, index) => {
                  if (index === 0) {
                    stt += 1;
                  }
                  return {
                    ...course,
                    subject,
                    semester,
                    stt,
                    rowSpan: index === 0 ? rowSpan : 0,
                  };
                }),
              );
            },
            [],
          ),
        );
      },
      [],
    );
  };

  render() {
    const { formOfTraining, subjectToRegisterGroupBySemester } = this.props;

    if (
      !formOfTraining ||
      !Array.isArray(subjectToRegisterGroupBySemester) ||
      !subjectToRegisterGroupBySemester.length
    ) {
      return <h3>{t1('no_subject_is_allowed_to_register_at_this_time')}</h3>;
    }

    const columns = [
      {
        title: t3('stt'),
        key: 'iid',
        render: (text, row) => {
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: get(row, 'stt'),
            props: {
              className: `text-center ${subjectFocusOn ? 'focus-on' : ''}`,
              rowSpan: get(row, 'rowSpan'),
            },
          };
        },
      },
      {
        title: t1('subject_name'),
        key: 'iid',
        render: (text, row) => {
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: get(row, 'subject.name'),
            props: {
              rowSpan: get(row, 'rowSpan'),
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
      {
        title: t1('number_credit'),
        render: (text, row) => {
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: get(row, 'subject.credit'),
            props: {
              rowSpan: get(row, 'rowSpan'),
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
      {
        title: t1('class_code'),
        render: (text, row) => {
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: get(row, 'code'),
            props: {
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
      {
        title: t1('teacher'),
        render: (text, row) => {
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: get(row, 'teachers').map((teacher) => (
              <li>{teacher.name}</li>
            )),
            props: {
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
      {
        title: t1('time_learning'),
        render: (text, row) => {
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: get(row, 'timetables').map((timetable) => {
              const day = get(timetable, 'days_of_week.0');
              if (typeof day === 'undefined') {
                return null;
              }
              const dayName = daysOfWeek[day].label;

              const startEndDate =
                timetable.start_date === timetable.end_date
                  ? getDateFromUnix(timetable.start_date)
                  : `${getDateFromUnix(
                      timetable.start_date,
                    )} - ${getDateFromUnix(timetable.end_date)}`;

              return (
                <li>
                  {`${startEndDate} (${dayName} ${t('weekly')} `}{' '}
                  {getStartTimeAndEndTimeOfTimetable(timetable)} {') '}
                </li>
              );
            }),
            props: {
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
      {
        title: t1('number_registered'),
        render: (text, row) => {
          const maxStudent = get(row, 'max_student');
          const numberRegistered = get(row, 'count_members') || 0;
          const subjectFocusOn = get(row, 'subject.inTheTeachingPlan');
          return {
            children: maxStudent
              ? `${numberRegistered}/${maxStudent}`
              : numberRegistered,
            props: {
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
      {
        title: t1('actions'),
        render: (text, { subject, semester, ...course }) => {
          const subjectFocusOn = get(subject, 'inTheTeachingPlan');
          return {
            children: (
              <ElementActionsContent
                course={course}
                semester={semester}
                handleRefetchData={this.props.handleRefetch}
              />
            ),
            props: {
              className: subjectFocusOn ? 'focus-on' : '',
            },
          };
        },
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={this.getDataSourceToRender(
          subjectToRegisterGroupBySemester,
        )}
        pagination={false}
        bordered
        size="middle"
      />
    );
  }
}

export default fetchData((props) => ({
  baseUrl: '/course/api/get-subject-allowed-to-register',
  params: {
    major: get(props, 'formOfTraining.major'),
    training_mode: get(props, 'formOfTraining.training_mode'),
    training_level: get(props, 'formOfTraining.training_level'),
    ico: get(props, 'formOfTraining.ico'),
  },
  propKey: 'subjectToRegisterGroupBySemester',
  fetchCondition: props.userIid,
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(SubjectAllowToRegster);
