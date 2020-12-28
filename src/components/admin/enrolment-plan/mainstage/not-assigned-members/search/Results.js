import React from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

const Results = ({ items }) => {
  const columns = [
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
      title: t1('organizations'),
      key: 'organizations',
      render: (row) => {
        return (
          <OrganizationsOrPhongBan item={row} attr={'user_organizations'} />
        );
      },
    },
  ];

  return (
    <AntdTable
      className="white-background"
      columns={columns}
      dataSource={items}
      bordered
      pagination={false}
      size="middle"
      rowKey="id"
    />
  );
};

Results.propTypes = {
  data: PropTypes.shape(),
};

Results.defaultProps = {
  data: {},
};

export default Results;
