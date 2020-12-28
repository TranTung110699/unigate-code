import React, { Component } from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Edit from './Edit';
import { CourseActions } from 'configs/constants/permission';

class ConcreteRoleResults extends Component {
  width = {
    actions: '20%',
  };

  constructor(props) {
    super(props);
    this.state = { disableButton: false };

    this.renderFull = this.renderFull.bind(this);
    this.textPreview = this.textPreview.bind(this);
  }

  renderFull = ({ closeDialog }, props) => {
    const { item } = props;

    return (
      <div>
        {(() => {
          const permissions = [];
          if (item.module_permissions) {
            for (const index in item.module_permissions) {
              if (item.module_permissions[index].allowed_actions_name) {
                item.module_permissions[index].allowed_actions_name.forEach(
                  (action) => {
                    permissions.push(
                      <span Style="display: block; clear: right">
                        {action}
                      </span>,
                    );
                  },
                );
              }
            }
          }

          return permissions.map((permission) => permission);
        })()}
      </div>
    );
  };

  textPreview = () => <Icon icon="view" />;

  hasPermissionManagerCollaborator = (node, hasPermission, permissions) => {
    if (node && node.ntype === 'course') {
      return (
        hasPermission &&
        hasPermission(
          CourseActions.COURSE_ACTION_MANAGE_COLLABORATORS,
          node && node.iid,
          permissions,
        )
      );
    }
    return true;
  };

  render() {
    const {
      items,
      formid,
      type,
      node,
      hasPermission,
      permissions,
    } = this.props;

    const isSchoolRole = node && node.domain;
    const showOrganization = node.ntype != 'syllabus' && node.ntype != 'course';
    const hasPermissionManagerCollaborator = this.hasPermissionManagerCollaborator(
      node,
      hasPermission,
      permissions,
    );

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
      ...(!!showOrganization
        ? [
            {
              title: t1('organization'),
              key: 'organization',
              dataIndex: 'organizations_name',
              render: (organizationsName) =>
                organizationsName ? organizationsName.join(',') : '',
            },
          ]
        : []),
      {
        title: t1('module_permissions'),
        key: 'module_permissions',
        render: (item) => (
          <DetailOnDialog
            item={item}
            textPreview={this.textPreview}
            renderFull={this.renderFull}
          />
        ),
      },
      ...(hasPermissionManagerCollaborator
        ? [
            {
              title: t1('actions'),
              key: 'actions',
              width: this.width.actions,
              render: (item) => (
                <React.Fragment>
                  <Edit type={type} node={item} searchFormId={formid} />
                  <DeleteItem
                    title={t1('remove_this_role_from_module')}
                    textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [
                      item.name,
                    ])}
                    formid={formid}
                    ntype={'abac_role'}
                    itemId={item.id}
                    step={type}
                  />
                </React.Fragment>
              ),
            },
          ]
        : []),
    ];

    return (
      <div className="table-result admin-goal-tree-results">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
        {hasPermissionManagerCollaborator && (
          <React.Fragment>
            <br />
            <DeleteItem
              newButton
              primary
              label={t1('delete_all')}
              title={t1('delete_all')}
              textConfirm={t1(
                'are_you_sure_you_want_to_delete_all_roles_of_%s?',
                [node && node.name],
              )}
              formid={formid}
              ntype={'abac_role'}
              params={{
                applied_target_iid: node && node.iid,
                type,
              }}
              alternativeApi={aApiUrls.delete_abac_roles_of_target_item}
            />{' '}
            {/*            {isSchoolRole === undefined && (
              <Link
                to={getSubMenuLink(
                  node.type || node.ntype,
                  node,
                  'abstract-roles',
                )}
              >
                <FlatButton
                  primary
                  name="submit"
                  type="submit"
                  label={t1('apply_multi_roles')}
                  icon={<Icon icon="user" />}
                />
              </Link>
            )}
            */}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ConcreteRoleResults;
