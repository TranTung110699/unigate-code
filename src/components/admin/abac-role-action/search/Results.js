import React, { Component } from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';

class Results extends Component {
  cssClass = 'admin-goal-tree-results';

  width = {
    actions: '20%',
  };

  render() {
    const { items, formid } = this.props;

    const columns = [
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
      },
      {
        title: t1('status'),
        key: 'status',
        dataIndex: 'status',
        render: (status) => (status ? 'active' : 'inactive'),
      },
      {
        title: t1('actions'),
        key: 'actions',
        width: this.width.actions,
        render: (item) => (
          <DeleteItem
            title={t1(item.status ? 'deactive' : 'active')}
            textConfirm={t1('are_you_sure_you_want_to_change_status_of_%s?', [
              t1(item.name),
            ])}
            formid={formid}
            itemId={item.id}
            alternativeApi={aApiUrls.abac_role_action_delete}
          />
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

export default Results;
