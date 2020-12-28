import React from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import lodashGet from 'lodash.get';
import { displayVNMoney } from 'common/utils/money';
import Icon from 'antd/lib/icon';
import { getUrl } from 'routes/links/common';
import { orderStatus } from 'configs/constants/sales-package';
import Badge from 'antd/lib/badge';
import { timestampToDateString } from 'common/utils/Date';
import colors from './colors';

function Results({ items }) {
  const columns = [
    {
      title: t1('iid'),
      key: 'iid',
      dataIndex: 'iid',
    },
    {
      title: t1('order_time'),
      key: 'time',
      dataIndex: 'ts',
      render: (ts) => timestampToDateString(ts, { showTime: true }),
    },
    {
      title: t1('user_order'),
      key: 'user_order',
      dataIndex: 'u',
      render: ({ name, mail, phone, iid, lname }) => (
        <div>
          <Link to={getUrl('admin_view_student', { iid })}>
            {name || lname}
          </Link>
          <div className="text-muted">
            <div>{phone}</div>
            <div>{mail}</div>
          </div>
        </div>
      ),
    },
    {
      title: t1('package'),
      key: 'package',
      render: ({ items }) => {
        if (Array.isArray(items) && items.length) {
          return (
            <div>
              {items.map((item) => (
                <div>
                  <Link
                    to={routes.url(
                      'node_edit',
                      Object.assign({}, item, {
                        ntype: 'sales-package',
                      }),
                    )}
                    target="_blank"
                  >
                    {lodashGet(item, 'name')}
                  </Link>
                </div>
              ))}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: t1('price'),
      key: 'price',
      dataIndex: 'total_amount',
      render: (price) => displayVNMoney(price),
    },
    {
      title: t1('status'),
      key: 'status',
      render: (item) => {
        const status = lodashGet(item, 'order_status', orderStatus.CREATED);
        return <Badge color={colors[status]} text={t1(status.toLowerCase())} />;
      },
    },
    {
      title: t1('actions'),
      key: 'actions',
      className: 'text-center',
      render: ({ iid }) => (
        <Link
          to={routes.url('node_edit', {
            ntype: 'sales-order',
            iid,
            step: 'dashboard',
          })}
          title={t1('edit')}
        >
          <Icon type="edit" />
        </Link>
      ),
    },
  ];

  return (
    <Table
      dataSource={items}
      columns={columns}
      className="white-background"
      rowKey="iid"
      pagination={false}
      childrenColumnName={null}
      bordered
    />
  );
}

export default Results;
