/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { connect } from 'react-redux';
import RoleEditor from 'components/admin/user-abac-role/role-editor';
import getLodash from 'lodash.get';
import routes from 'routes';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import './style/stylesheet.scss';

class TeacherRoles extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const getUrlAppliedTarget = (node) => {
      if (!node) {
        return '';
      }

      switch (node.ntype) {
        case 'course':
          return routes.url('edit_item', { mode: 'roles', item: node });
        case 'credit':
          return routes.url('edit_item', { mode: 'roles', item: node });
        case 'syllabus':
          return routes.url('edit_item', { mode: 'roles', item: node });
        case 'contest':
          return routes.url('node_edit', {
            ...node,
            step: 'roles',
          });
        default:
          return '';
      }
    };

    const { items, node, isRoot } = this.props;

    let schoolRoleEmpty = false;

    if (items) {
      Object.keys(items).forEach((appliedScope) => {
        if (appliedScope === 'school' && items[appliedScope].length === 0) {
          schoolRoleEmpty = true;
        }
      });
    }

    if (!isRoot) {
      schoolRoleEmpty = false;
    }

    return (
      <div className="table-result admin-show-teacher-roles">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width="10%">
                {t1('applied_scope')}
              </TableHeaderColumn>
              <TableHeaderColumn width="20%">
                {t1('applied_target')}
              </TableHeaderColumn>
              <TableHeaderColumn width="60%">{t1('roles')}</TableHeaderColumn>
              <TableHeaderColumn width="10%">{t1('action')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {schoolRoleEmpty && (
              <TableRow>
                <TableRowColumn width="10%" className={'format-text'}>
                  {t1('school_role')}
                </TableRowColumn>
                <TableRowColumn width="20%" />
                <TableRowColumn width="60%" />
                <TableRowColumn width="10%">
                  <RoleEditor
                    searchFormId="admin-show-teacher-roles"
                    appliedTarget={{
                      iid: null,
                    }}
                    type="school"
                    user={node}
                    editTile={<Icon icon="edit" />}
                    requestSuccessful={() => this.props.handleRefetch()}
                  />
                </TableRowColumn>
              </TableRow>
            )}
            {items &&
              Object.keys(items).map((appliedScope) => {
                if (Array.isArray(items[appliedScope])) {
                  return '';
                }

                const appliedScopeRoles = items[appliedScope];

                return Object.keys(appliedScopeRoles).map((objectIid) => {
                  const roles = appliedScopeRoles[objectIid];
                  return (
                    <TableRow>
                      <TableRowColumn width="10%" className={'format-text'}>
                        {t1(`${appliedScope}_role`)}
                      </TableRowColumn>
                      <TableRowColumn width="20%">
                        <Link
                          className={'format-text'}
                          to={getUrlAppliedTarget(roles[0].appliedTargetDetail)}
                        >
                          {getLodash(roles[0], 'appliedTargetDetail.name') ||
                            ''}
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn width="60%">
                        {appliedScopeRoles &&
                          roles.map((item) => (
                            <span className="role-name">
                              {`${item.name}(code: ${item.code})\n`}
                              <DetailOnDialog
                                item={item}
                                textPreview={this.textPreview}
                                renderFull={this.renderFull}
                              />
                            </span>
                          ))}
                      </TableRowColumn>
                      <TableRowColumn width="10%">
                        <RoleEditor
                          searchFormId="admin-show-teacher-roles"
                          appliedTarget={{
                            iid: objectIid === 'school' ? null : objectIid,
                          }}
                          type={appliedScope}
                          user={node}
                          editTile={<Icon icon="edit" />}
                          requestSuccessful={() => this.props.handleRefetch()}
                        />
                      </TableRowColumn>
                    </TableRow>
                  );
                });
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { node } = props;

  return {
    isRoot: getLodash(state, 'domainInfo.isRoot'),
  };
};

// const fetchAbstractRoleConfig = (props) => ({
//   params: {
//     user_iid: props.userIid,
//   },
//   baseUrl: apiUrls.manage_teacher_roles,
//   propKey: 'items',
//   keyState: 'abac_role_teacher_roles',
// });

export default connect(mapStateToProps)(TeacherRoles);

// export default connect(mapStateToProps)(
//   fetchData(fetchAbstractRoleConfig)(TeacherRoles),
// );
