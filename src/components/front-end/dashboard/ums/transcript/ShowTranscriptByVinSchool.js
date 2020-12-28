import React from 'react';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import getLodash from 'lodash.get';
import apiUrls from 'api-endpoints/index';
import AntdTable from 'antd/lib/table';
import ProgressDetailInEnrolmentPlanForUser from './progressDetailInEnrolmentPlanForUser';

const getColumns = (semesters, schoolYear, score, averageSummary) => {
  return [
    {
      title: t1('subject'),
      className: 'text-center text-bold',
      key: 'id',
      render: (text, row, index) => {
        return {
          children: getLodash(row, 'name'),
          props: {
            className: 'text-center',
          },
        };
      },
    },
  ].concat(
    semesters
      .map((semester) => {
        return {
          title: getLodash(semester, 'name'),
          className: 'text-center',
          render: (text, row, index) => {
            return {
              children: getLodash(
                score,
                `${getLodash(semester, 'iid')}.${getLodash(row, 'iid')}`,
              ),
              props: {
                className: 'text-center text-transform',
              },
            };
          },
        };
      })
      .filter(Boolean),
    [
      {
        title: getLodash(schoolYear, 'name'),
        className: 'text-center text-bold',
        render: (text, row) => {
          return {
            children: getLodash(
              score,
              `${getLodash(schoolYear, 'iid')}.${getLodash(row, 'iid')}`,
            ),
            props: {
              className: 'text-center text-transform text-bold',
            },
          };
        },
      },
    ],
  );
};

const getDataSource = (academicCategories) => {
  if (!Array.isArray(academicCategories) || !academicCategories.length) {
    return [];
  }
  return academicCategories;
};

const progressDetailBySemester = (
  userIid,
  semesters = [],
  enrolmentPlan = {},
  academicCategory,
) => {
  if (!userIid || !Array.isArray(semesters) || !semesters.length) {
    return null;
  }

  return semesters
    .map((semester) => {
      const enrolmentPlanIid = getLodash(enrolmentPlan, semester.iid);
      if (!enrolmentPlanIid) {
        return null;
      }

      return (
        <ProgressDetailInEnrolmentPlanForUser
          userIid={userIid}
          semester={semester}
          enrolmentPlanIid={enrolmentPlanIid}
          academicCategoryIid={getLodash(academicCategory, 'iid')}
        />
      );
    })
    .filter(Boolean);
};

const showTranscriptBySemester = ({ data = {} }) => {
  const {
    semesters,
    schoolYear,
    academicCategories,
    score,
    average_summary,
    enrolment_plan,
    iid,
  } = data || {};

  if (!getLodash(data, 'score') || !semesters || !academicCategories) {
    return <div>{t1('no_data')}</div>;
  }

  return (
    <AntdTable
      columns={getColumns(semesters, schoolYear, score, average_summary)}
      dataSource={getDataSource(academicCategories)}
      bordered
      expandedRowRender={(record) => {
        return progressDetailBySemester(iid, semesters, enrolment_plan, record);
      }}
      pagination={false}
      size="middle"
    />
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_transcript,
  propKey: 'data',
  params: (() => {
    const user_iid = getLodash(props, 'user_iid');
    return user_iid ? { user_iid } : {};
  })(),
  fetchCondition: true,
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(showTranscriptBySemester);
