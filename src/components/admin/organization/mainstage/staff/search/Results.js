import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import Table from 'antd/lib/table';
import Avatar from 'components/common/avatar';
import { getUrl } from 'routes/links/common';
import RoleEditor from 'components/admin/user-abac-role/role-editor';
import { abacRoleTypes } from 'configs/constants';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import '../stylesheet.scss';

class Results extends Component {
  render() {
    const { items, node, searchValues, searchFormId } = this.props;

    // const width = {
    //   avatar: '5%',
    // };

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        render: (code, item) => (
          <Link to={getUrl('admin_view_teacher', item)}>
            <Avatar user={item} />
            &nbsp; {code} <span className="text-muted">{item.iid}</span>
          </Link>
        ),
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('email'),
        key: 'email',
        dataIndex: 'mail',
      },
      {
        title: t1('phone_number'),
        key: 'phone',
        dataIndex: 'phone',
      },
      ...(!searchValues || !searchValues.include_sub_organizations
        ? [
            {
              title: t1('role'),
              key: 'role',
              render: (item) => (
                <RoleEditor
                  searchFormId={searchFormId}
                  appliedTarget={node}
                  type={abacRoleTypes.SCHOOL}
                  user={item}
                />
              ),
            },
          ]
        : []),
      {
        title: t1('action'),
        key: 'action',
        render: (item) => (
          <ButtonAction
            alternativeApi={'school/add-staff'}
            title={t1('remove_user_as_staff')}
            params={{
              userIid: item.iid,
              status: 'kickout',
            }}
            formid={searchFormId}
            closeDialogAfterActionSuccessFull
          />
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          rowKey="id"
          pagination={false}
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

export default connect()(Results);
