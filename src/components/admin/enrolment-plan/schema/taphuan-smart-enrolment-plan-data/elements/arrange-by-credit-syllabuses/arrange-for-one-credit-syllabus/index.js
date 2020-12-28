import React from 'react';
import fetchData from 'components/common/fetchData';
import { taphuanSmartEnrolmentPlanApi } from 'components/admin/enrolment-plan/endpoints';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import AntdTable from 'antd/lib/table';
import {
  populateRowSpanInfoToRenderListOfItemAsTable,
  unwind,
} from 'common/utils/Array';
import EditCourseTeachersButton from './edit-course-teachers/Button';
import AddCourseTeachersButton from './edit-course-teachers/add-teachers/Button';
import EditCourseUsersButton from './edit-course-users/Button';

const getDataFromRow = (row) => {
  const organizations = lodashGet(row, 'organizations');
  const numberOfCourses = (lodashGet(row, 'courses') || []).length;
  const course = lodashGet(row, 'course');

  const { 'course.iid': courseRowSpan, id: groupRowSpan } = lodashGet(
    row,
    'rowSpans',
  );

  return {
    organizations,
    numberOfCourses,
    course,
    courseRowSpan,
    groupRowSpan,
  };
};

const ArrangeForOneCreditSyllabus = ({
  assignCoursesData,

  refetchCoursesData,
}) => {
  assignCoursesData = unwind(assignCoursesData, 'courses', 'course');
  assignCoursesData = populateRowSpanInfoToRenderListOfItemAsTable(
    assignCoursesData,
    ['id', 'course.iid'],
  );

  const columns = [
    {
      title: t1('organizations'),
      key: 'organization',
      render: (row) => {
        const { organizations, groupRowSpan } = getDataFromRow(row);
        return {
          props: { rowSpan: groupRowSpan },
          children: (
            <ul>
              {(organizations || []).map((org) => {
                const orgName = lodashGet(org, 'name');
                return <li>{orgName}</li>;
              })}
            </ul>
          ),
        };
      },
    },
    {
      title: t1('number_of_courses'),
      key: 'number_of_courses',
      render: (row) => {
        const { numberOfCourses, groupRowSpan } = getDataFromRow(row);
        return {
          props: { rowSpan: groupRowSpan },
          children: numberOfCourses,
        };
      },
    },
    {
      title: t1('course_name'),
      key: 'course_name',
      render: (row) => {
        const { course, courseRowSpan } = getDataFromRow(row);
        return {
          props: { rowSpan: courseRowSpan },
          children: lodashGet(course, 'name'),
        };
      },
    },
    {
      title: t1('number_of_users'),
      key: 'number_of_users',
      render: (row) => {
        const { course, courseRowSpan } = getDataFromRow(row);
        return {
          props: { rowSpan: courseRowSpan },
          children: lodashGet(course, 'number_of_users'),
        };
      },
    },
    {
      title: 'Giáo viên cốt cán',
      key: 'teachers',
      render: (row) => {
        const { course, courseRowSpan } = getDataFromRow(row);
        const numberOfTeachers = (lodashGet(course, 'teachers') || []).length;

        return {
          props: { rowSpan: courseRowSpan },
          children: !course ? null : numberOfTeachers ? (
            <ul>
              {(lodashGet(course, 'teachers') || []).map((t) => {
                return (
                  <li key={lodashGet(t, 'iid')}>{lodashGet(t, 'name')}</li>
                );
              })}
              <li>
                <EditCourseTeachersButton
                  course={course}
                  onCloseDialog={() => refetchCoursesData()}
                />
              </li>
            </ul>
          ) : (
            <AddCourseTeachersButton
              course={course}
              onCloseDialog={() => refetchCoursesData()}
            />
          ),
        };
      },
    },
    {
      title: 'Danh sách lớp',
      render: (row) => {
        const { course } = getDataFromRow(row);
        return (
          <EditCourseUsersButton
            course={course}
            onCloseDialog={() => refetchCoursesData()}
          />
        );
      },
    },
  ];

  return (
    <AntdTable
      size="middle"
      columns={columns}
      dataSource={assignCoursesData}
      pagination={false}
      bordered
      rowKey="id"
    />
  );
};

const fetchAssignCoursesDataForCreditSyllabusAndOrganizations = fetchData(
  (props) => {
    const {
      creditSyllabusIid,
      organizationSelection,
      enrolmentPlanTemplateIid,
      suggestedNumberOfUsersPerCourse,
    } = props || {};

    return {
      baseUrl:
        taphuanSmartEnrolmentPlanApi.get_assign_courses_data_for_credit_syllabus_and_organizations,
      params: {
        credit_syllabus_iid: creditSyllabusIid,
        organization_selection: organizationSelection,
        enrolment_plan_template_iid: enrolmentPlanTemplateIid,
        suggested_number_of_users_per_course: suggestedNumberOfUsersPerCourse,
      },
      fetchCondition:
        creditSyllabusIid &&
        organizationSelection &&
        enrolmentPlanTemplateIid &&
        suggestedNumberOfUsersPerCourse,
      propKey: 'assignCoursesData',
      fetchFunctionPropKey: 'refetchCoursesData',
    };
  },
);

export default fetchAssignCoursesDataForCreditSyllabusAndOrganizations(
  ArrangeForOneCreditSyllabus,
);
