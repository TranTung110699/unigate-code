import React, { Component } from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import {
  abacRoleAppliedScopeToText,
  abacRoleAppliedScopes,
  courseLearningTypes,
} from 'configs/constants';
import Edit from './Edit';
import Icon from 'components/common/Icon';

class Results extends Component {
  cssClass = 'admin-goal-tree-results';

  width = {
    actions: '20%',
    code: '10%',
  };

  render() {
    const { items, formid } = this.props;

    const columns = [
      {
        title: t1('code'),
        key: 'code',
        dataIndex: 'code',
        width: this.width.code,
        render: (code, item) => (
          <span className="text-muted">
            {code} - {item.iid}
          </span>
        ),
      },
      {
        title: t1('name'),
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: t1('applied_scope'),
        key: 'applied_scope',
        dataIndex: 'applied_scope',
        render: (appliedScope) =>
          appliedScope && abacRoleAppliedScopeToText(appliedScope),
      },
      {
        title: t1('freeze_actions'),
        key: 'freeze_actions',
        dataIndex: 'freeze_actions',
        render: (freeze) => (
          <span>{freeze != 0 && freeze != '0' ? <Icon icon="ok" /> : ''}</span>
        ),
      },
      {
        title: t1('compulsory_role'),
        key: 'compulsory_role',
        dataIndex: 'compulsory_role',
        render: (compulsory, item) => (
          <span>
            {compulsory &&
            item.applied_scope == abacRoleAppliedScopes.COURSE ? (
              <span>
                {item.applied_course_type == 1 && t1('all_courses')}
                {item.applied_course_type == courseLearningTypes.ILT && 'ILT'}
                {item.applied_course_type == courseLearningTypes.ONLINE &&
                  'ONLINE'}
              </span>
            ) : (
              ''
            )}
          </span>
        ),
      },
      {
        title: t1('actions'),
        key: 'actions',
        width: this.width.actions,
        render: (item) => (
          <React.Fragment>
            <Edit node={item} searchFormId={formid} />
            <DeleteItem
              title={t1('delete')}
              textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [
                item.name,
              ])}
              formid={formid}
              ntype={'abac_role'}
              itemId={item.id}
              params={{ _sand_purge: 1 }}
              alternativeApi={'/abac-role/delete?_sand_purge=1'}
            />
          </React.Fragment>
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
