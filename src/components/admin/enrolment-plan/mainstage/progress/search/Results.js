/* eslint-disable react/prop-types */
import React from 'react';

import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { timestampToDateTimeString } from 'common/utils/Date';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import AntdTable from 'antd/lib/table';
import Icon from 'components/common/Icon';

const columns = [
  {
    title: t1('code'),
    key: 'code',
    render: (row) => {
      return lodashGet(row, 'code');
    },
  },
  {
    title: t1('name'),
    key: 'name',
    render: (row) => {
      return lodashGet(row, 'name');
    },
  },
  {
    title: t1('mail'),
    key: 'mail',
    render: (row) => {
      return lodashGet(row, 'mail');
    },
  },
  {
    title: t1('completion_progress'),
    render: (row) => {
      return {
        children: lodashGet(row, 'progress.cp') || null,
        props: {
          className: 'text-center',
        },
      };
    },
  },
  {
    title: t1('completion_score'),
    render: (row) => {
      return {
        children: lodashGet(row, 'progress.p') || null,
        props: {
          className: 'text-center',
        },
      };
    },
  },
  {
    title: t1('passed'),
    render: (row) => {
      const pf = lodashGet(row, 'progress.pf');
      if (typeof pf === 'undefined') {
        return null;
      }
      return {
        children: (
          <Icon
            icon={pf ? 'check' : 'cancel'}
            style={{
              fontSize: 20,
              color: pf ? 'deepskyblue' : 'red',
            }}
          />
        ),
        props: {
          className: 'text-center',
        },
      };
    },
  },
  {
    title: t1('last_learned'),
    key: 'last_learned',
    render: (row) => {
      const epLastLearned = lodashGet(row, 'progress.updated_ts');
      if (!epLastLearned) {
        return null;
      }
      return epLastLearned > 0
        ? timestampToDateTimeString(epLastLearned)
        : '--/--/--';
    },
  },
];

const Results = ({ items }) => {
  return (
    <AntdTable
      className="white-background"
      dataSource={Array.isArray(items) ? items : []}
      columns={columns}
      pagination={false}
      bordered
      size="middle"
    />
  );
};

export default withSchoolConfigs(Results);
