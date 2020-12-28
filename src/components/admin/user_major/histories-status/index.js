import React from 'react';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import DisplayHtml from 'components/common/html';

const columns = [
  {
    title: t1('status'),
    key: 'iid',
    width: 50,
    render: (text, row) => get(row, 'status'),
  },
  {
    title: t1('start_date'),
    width: 50,
    render: (text, row) => timestampToDateString(get(row, 'start_date')),
  },
  {
    title: t1('end_date'),
    width: 50,
    render: (text, row) => timestampToDateString(get(row, 'end_date')),
  },
  {
    title: t1('note'),
    width: 200,
    render: (text, row) => <DisplayHtml content={get(row, 'note')} />,
  },
];

export default ({ histories }) => {
  if (!histories) {
    return <div>{t1('histories empty')}</div>;
  }

  return (
    <AntdTable
      columns={columns}
      dataSource={histories}
      pagination={false}
      bordered
      size="middle"
    />
  );
};
