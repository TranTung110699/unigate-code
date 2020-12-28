import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import Avatar from 'components/common/avatar';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';

const getColumnByAcademicCategory = (
  academicCategory,
  semesters,
  schoolYear,
) => {
  return {
    title: getLodash(academicCategory, 'name'),
    className: 'text-center',
    children: semesters
      .map((semester) => {
        return {
          title: semester.name,
          className: 'text-center',
          render: (text, row) => {
            return {
              children: getLodash(
                row,
                `score.${getLodash(semester, 'iid')}.${getLodash(
                  academicCategory,
                  'iid',
                )}`,
              ),
              props: {
                className: 'text-center text-transform',
              },
            };
          },
        };
      })
      .concat([
        {
          title: t1('average_by_school_year'),
          className: 'text-center text-bold',
          render: (text, row) => {
            return {
              children: getLodash(
                row,
                `score.${getLodash(schoolYear, 'iid')}.${getLodash(
                  academicCategory,
                  'iid',
                )}`,
              ),
              props: {
                className: 'text-center text-transform text-bold',
              },
            };
          },
        },
      ]),
  };
};

const getColumns = (academicCategories, semesters, schoolYear) => {
  return [
    {
      title: t1('avatar'),
      key: 'ava',
      render: (text, row) => <Avatar user={row} />,
    },
    {
      title: t1('code'),
      key: 'code',
      render: (text, row) => <span>{row.code || row.iid}</span>,
    },
    {
      title: t1('name'),
      key: 'name',
      render: (text, row) => <div>{row.name}</div>,
    },
  ].concat(
    academicCategories
      .map((academicCategory) =>
        getColumnByAcademicCategory(academicCategory, semesters, schoolYear),
      )
      .filter(Boolean),
    semesters
      .map((semester) => {
        if (!semester || !semester.iid || !semester.name) {
          return;
        }
        return {
          title: t1('average_summary_score_%s', semester.name),
          className: 'text-center text-bold',
          render: (text, row) => {
            return {
              children: getLodash(row, `average_summary.${semester.iid}`),
              props: {
                className: 'text-center text-transform text-bold',
              },
            };
          },
        };
      })
      .filter(Boolean),
    [
      {
        title: t1('average_summary_score_by_school_year'),
        className: 'text-center text-bold',
        render: (text, row) => {
          return {
            children: getLodash(row, `average_summary.${schoolYear.iid}`),
            props: {
              className: 'text-center text-transform text-bold',
            },
          };
        },
      },
    ],
  );
};

const yearReport = ({ items, academicCategories, semesters, schoolYear }) => {
  if (
    !Array.isArray(academicCategories) ||
    !academicCategories.length ||
    !Array.isArray(semesters) ||
    !semesters.length
  ) {
    return <div>{t1('no_data')}</div>;
  }

  return (
    <HorizontalScrolling>
      <AntdTable
        columns={getColumns(academicCategories, semesters, schoolYear)}
        dataSource={Array.isArray(items) ? items : []}
        bordered
        pagination={false}
        size="middle"
      />
    </HorizontalScrolling>
  );
};

export default yearReport;
