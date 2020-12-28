import React from 'react';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import PassFailIcon from 'components/admin/course/mainstage/score-and-marking/score-by-rubric/PassFailIcon';
import courseRoutes from 'components/admin/course/routes';

const getProgressCourseFromRow = (row) => {
  return lodashGet(row, 'progress_course');
};

const getCourseFromRow = (row) => {
  return lodashGet(row, 'course');
};

const widths = {
  index: '5%',
  name: '65%',
  cp: '10%',
  score: '10%',
  passed: '10%',
};

const ResultLearnProgressOfUser = ({ items }) => {
  const columns = [
    {
      title: t1('stt'),
      width: widths.index,
      className: 'text-center',
      key: 'id',
      render: (text, row, index) => ({
        children: index + 1,
        props: {
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('course'),
      width: widths.name,
      render: (row) => {
        const course = getCourseFromRow(row);
        return (
          <a target="_blank" href={courseRoutes.score_dashboard(course)}>
            {lodashGet(course, 'name')}
          </a>
        );
      },
    },
    {
      title: t1('completion_progress'),
      width: widths.cp,
      className: 'text-center',
      render: (row) => {
        const progressCourse = getProgressCourseFromRow(row);
        const cp = lodashGet(progressCourse, 'cp');
        return {
          children: cp,
          props: {
            className: 'text-center',
          },
        };
      },
    },
    {
      title: t1('completion_score'),
      width: widths.score,
      className: 'text-center',
      render: (row) => {
        const progressCourse = getProgressCourseFromRow(row);
        const score = lodashGet(progressCourse, 'progress');

        return {
          children: score,
          props: {
            className: 'text-center',
          },
        };
      },
    },
    {
      title: t1('passed'),
      width: widths.passed,
      className: 'text-center',
      render: (row) => {
        const progressCourse = getProgressCourseFromRow(row);
        const passed = lodashGet(progressCourse, 'passed');

        return {
          children: <PassFailIcon passed={passed} />,
          props: {
            className: 'text-center',
          },
        };
      },
    },
  ];

  return (
    <AntdTable
      columns={columns}
      dataSource={Array.isArray(items) ? items : []}
      pagination={false}
      bordered
      size="middle"
      rowKey="iid"
      className="white-background"
    />
  );
};

export default ResultLearnProgressOfUser;
