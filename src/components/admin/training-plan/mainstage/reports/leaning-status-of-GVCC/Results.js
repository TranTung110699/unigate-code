import React from 'react';
import get from 'lodash.get';
import { isHieuTruong, isLeader } from 'components/admin/user/utils';
import withTemisConfig from 'common/hoc/withTemisConfig';
import { t1 } from 'translate/index';
import AntdTable from 'antd/lib/table';
import { userGradeToText } from 'configs/constants/user';

const getColumns = (scoreScales, tcnn, userRoot) => [
  {
    title: '',
    render: ({ name }) => name,
  },
  {
    title: 'Tổng số GVPT/CBQLCS được tham gia',
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
    title: 'Tổng số GVPT/CBQLCS đã cử đi học',
    render: ({ total_assigned }) => {
      return {
        children: total_assigned || 0,
        props: {
          className: 'text-center',
        },
      };
    },
  },
  {
    title: 'Tổng số GVPT/CBQLCS đã hòan thành chương trình',
    render: ({ total_assigned, total_not_yet_complete }) => {
      return {
        children: !total_assigned
          ? ''
          : total_assigned - (total_not_yet_complete || 0),
        props: {
          className: 'text-center',
        },
      };
    },
  },
];

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

const formatDataSource = (dataResult) => {
  if (!Array.isArray(dataResult) || !dataResult.length) {
    return [];
  }

  return ['all', 'female', 'dtts'].map((type) => {
    const tmp = dataResult.find(({ id }) => id === type) || {};
    let name = 'Tất cả';
    switch (type) {
      case 'female': {
        name = 'GVCC là nữ';
        break;
      }
      case 'dtts': {
        name = 'GVCC thuộc dân tộc thiểu số';
      }
    }

    return {
      ...tmp,
      name,
    };
  });
};

const TableResult = ({ dataResult }) => {
  return (
    <AntdTable
      bordered
      rowKey="id"
      size="middle"
      pagination={false}
      // expandIcon={() => <span />}
      // defaultExpandAllRows
      className="white-background"
      columns={getColumns()}
      // onExpand={null}
      // expandedRowKeys={expandedRowKeys}
      dataSource={formatDataSource(dataResult)}
    />
  );
};

export default withTemisConfig(TableResult);
