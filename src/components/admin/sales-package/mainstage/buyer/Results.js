import React from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import get from 'lodash.get';
import Icon from 'antd/lib/icon';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PreviewUser from 'components/admin/user/account/common/PreviewUser';

function Results({ items, location, dispatch, formid }) {
  const columns = [
    {
      title: t1('name'),
      key: 'name',
      dataIndex: 'customer_name',
      render: (name, { user }) => <PreviewUser user={user} />,
    },
    {
      title: t1('phone'),
      key: 'phone',
      render: (record) => get(record, 'user.phone'),
    },
    {
      title: t1('order_detail'),
      key: 'order_detail',
      render: (item = {}) => (
        <Link
          to={routes.url('node_edit', {
            ntype: 'sales-order',
            iid: item.iid,
            step: 'dashboard',
          })}
          title={t1('edit')}
        >
          <Icon type="eye" />
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

export default connect()(withRouter(Results));
