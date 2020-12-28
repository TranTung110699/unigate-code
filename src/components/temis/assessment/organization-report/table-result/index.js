import React from 'react';
import get from 'lodash.get';
import { isHieuTruong, isLeader } from 'components/admin/user/utils';
import withTemisConfig from 'common/hoc/withTemisConfig';
import { t1 } from 'translate/index';
import AntdTable from 'antd/lib/table';
import { userGradeToText } from 'configs/constants/user';

const getColumns = (scoreScales, tcnn, userRoot) =>
  [
    {
      title: isHieuTruong(userRoot) ? '' : t1('school_level'),
      render: ({ school_level, isChildren, name }) => {
        return {
          children: isChildren ? (
            t1(name)
          ) : (
            <span style={{ fontWeight: 600 }}>
              {isHieuTruong(userRoot)
                ? 'Tất cả'
                : userGradeToText(school_level)}
            </span>
          ),
          props: {
            style: { minWidth: 250 },
          },
        };
      },
    },
    {
      title: t1(`total_of_${tcnn}`),
      render: ({ total }) => {
        return {
          children: total || 0,
          props: {
            className: 'text-center',
          },
        };
      },
    },
    {
      title: t1(`total_of_${tcnn}_assessed`),
      render: ({ total_assessed }) => {
        return {
          children: total_assessed || 0,
          props: {
            className: 'text-center',
          },
        };
      },
    },
  ]
    .concat(
      Array.isArray(scoreScales) && scoreScales.length > 0
        ? scoreScales.map((scoreScale) => {
            return {
              title: get(scoreScale, 'name'),
              children: ['amount_of_people', 'percentage'].map(
                (reportType) => ({
                  title: `${t1(`report_type_by_${reportType}`)} (${
                    reportType === 'amount_of_people' ? t1('people') : '%'
                  })`,
                  render: ({ total_assessed, detail }) => {
                    const dataByScaleId = Array.isArray(detail)
                      ? detail.find(
                          ({ id }) => String(id) === String(scoreScale.id),
                        )
                      : {};

                    let text = get(dataByScaleId, 'total') || 0;
                    if (
                      reportType === 'percentage' &&
                      total_assessed > 0 &&
                      text
                    ) {
                      text = ((text / total_assessed) * 100).toFixed(0);
                    }
                    return {
                      children: total_assessed > 0 ? text : '',
                      props: {
                        className: 'text-center',
                      },
                    };
                  },
                }),
              ),
            };
          })
        : [],
    )
    .filter(Boolean);

const getPropsToRenderTable = (data, userRoot) => {
  if (!Array.isArray(data) || !data.length) {
    return { dataSource: [], expandedRowKeys: [] };
  }

  let indexRowKey = 0;
  const expandedRowKeys = [];
  const dataSource = data
    .map(({ female_in_there, dtts_in_there, ...row }) => {
      const id = `${row.school_level}_${++indexRowKey}`;
      row.id = id;

      if (!row.total && isHieuTruong(userRoot)) {
        return false;
      }
      if (!row.total || (!female_in_there && !dtts_in_there)) {
        return row;
      }

      expandedRowKeys.push(id);

      const children = [
        {
          ...(female_in_there || {}),
          isChildren: true,
          school_level: row.school_level,
          name: 'female_in_there',
          id: `${id}_female_in_there`,
        },
        {
          ...(dtts_in_there || {}),
          school_level: row.school_level,
          isChildren: true,
          name: 'dtts_in_there',
          id: `${id}_dtts_in_there`,
        },
      ];
      row.children = children;
      return row;
    })
    .filter(Boolean);

  return {
    dataSource,
    expandedRowKeys,
  };
};

const TableResult = ({ dataResult, tcnn, userRoot }) => {
  const { dataSource, expandedRowKeys } = getPropsToRenderTable(
    get(dataResult, 'data'),
    userRoot,
  );

  const scoreScale = get(dataResult, 'score_scale');

  return (
    <AntdTable
      bordered
      rowKey="id"
      size="middle"
      pagination={false}
      // expandIcon={() => <span />}
      // defaultExpandAllRows
      className="white-background"
      columns={getColumns(scoreScale, tcnn, userRoot)}
      // onExpand={null}
      // expandedRowKeys={expandedRowKeys}
      dataSource={Array.isArray(dataSource) ? dataSource : []}
    />
  );
};

export default withTemisConfig(TableResult);
