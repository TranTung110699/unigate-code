import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { displayOrganizationTypeLabel } from 'utils/Util';
import lodashGet from 'lodash.get';

const previewResult = ({ orgTypes, items }) => {
  const columns = [
    {
      title: t1('org_id'),
      dataIndex: 'data.org_id',
      key: 'data.org_id',
    },
    {
      title: t1('org_code'),
      dataIndex: 'data.code',
      key: 'data.code',
    },
    {
      title: t1('org_name'),
      dataIndex: 'data.name',
      key: 'data.name',
    },
    {
      title: t1('org_short_name'),
      dataIndex: 'data.short_name',
      key: 'data.short_name',
    },
    {
      title: t1('org_parent_code'),
      dataIndex: 'data.p_code',
      key: 'data.p_code',
    },
    {
      title: t1('org_type'),
      dataIndex: 'data.sub_type',
      key: 'data.sub_type',
      render: (sub_type) => {
        return displayOrganizationTypeLabel(orgTypes, sub_type);
      },
    },
    {
      title: t1('email'),
      dataIndex: 'data.mail',
      key: 'data.mail',
    },
    {
      title: t1('phone'),
      dataIndex: 'data.phone',
      key: 'data.phone',
    },
    {
      title: t1('address'),
      dataIndex: 'data.address',
      key: 'data.address',
    },
    {
      title: t1('status'),
      dataIndex: 'data',
      key: 'data',
      render: (text, item) => {
        return (
          <React.Fragment>
            <div className="text-center m-b-10">
              {item.status === 'available' ? (
                <Tag color="#87d068">{t1('ok')}</Tag>
              ) : (
                <Tag color="#f5222d">{t1('errors')}</Tag>
              )}
            </div>

            {Array.isArray(item.validateErrors) &&
              item.validateErrors.map(({ field, message }) => (
                <div>
                  <Tag color="#DAA520">{`${field}: ${message}`}</Tag>
                </div>
              ))}
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      bordered
      pagination={false}
      childrenColumnName={null}
    />
  );
};

const mapStateToProps = (state) => ({
  orgTypes: lodashGet(state, 'domainInfo.school.org_types'),
});

export default connect(mapStateToProps)(previewResult);
