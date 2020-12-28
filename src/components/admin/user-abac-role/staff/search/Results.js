import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import ActionToggle from 'components/common/toggle/ActionToggle';
import Avatar from 'components/common/avatar';
import RoleEditor from 'components/admin/user-abac-role/role-editor';
import Positions from 'components/admin/group/edit/member/search-results/Positions';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import get from 'lodash.get';

import Remove from './remove';
import '../style/stylesheet.scss';
import { CourseActions, SyllabusActions } from 'configs/constants/permission';

class Results extends Component {
  /**
   * Quyền update quyền của user
   */
  hasPermissionManageCollaborator = () => {
    const { node, hasPermission, permissions } = this.props;
    if (get(node, 'ntype') === 'course') {
      return (
        hasPermission &&
        hasPermission(
          CourseActions.COURSE_ACTION_MANAGE_COLLABORATORS,
          get(node, 'iid'),
          permissions,
        )
      );
    }

    if (get(node, 'ntype') === 'syllabus') {
      return (
        hasPermission &&
        hasPermission(
          SyllabusActions.SYLLABUS_ACTION_MANAGE_COLLABORATORS,
          get(node, 'iid'),
          permissions,
        )
      );
    }

    return true;
  };

  hasPermissionUpdate = () => {
    const { node, hasPermission, permissions } = this.props;
    if (get(node, 'ntype') === 'course') {
      return (
        hasPermission &&
        hasPermission(
          CourseActions.COURSE_ACTION_UPDATE,
          get(node, 'iid'),
          permissions,
        )
      );
    }

    if (get(node, 'ntype') === 'syllabus') {
      return (
        hasPermission &&
        hasPermission(
          SyllabusActions.SYLLABUS_ACTION_UPDATE,
          get(node, 'iid'),
          permissions,
        )
      );
    }

    return true;
  };

  render() {
    const width = {
      code: '15%',
      name: '15%',
      job_position: '20%',
      organization: '20%',
      role: '8%',
      contact_info: '15%',
      action: '7%',
    };
    const { items, node, searchValues, searchFormId } = this.props;

    const hasPermissionUpdate = this.hasPermissionUpdate();
    const hasPermissionManagerCollaborator = this.hasPermissionManageCollaborator();

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.code} title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.name} title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.job_position}>
                {t1('job_position')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.organization}>
                {t1('organization')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.role} title={t1('role')}>
                {t1('role')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={width.contact_info}
                title={t1('contact_info')}
              >
                {t1('contact_info')}
              </TableHeaderColumn>
              {hasPermissionManagerCollaborator && (
                <TableHeaderColumn width={width.action} title={t1('action')}>
                  {t1('action')}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {items &&
              items.map(
                (item) =>
                  item && (
                    <TableRow key={item.id}>
                      <TableRowColumn width={width.code}>
                        <Link to={getUrl('admin_view_teacher', item)}>
                          <Avatar user={item} />
                          &nbsp; {item.code}
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn width={width.name}>
                        {item.name}
                      </TableRowColumn>
                      <TableRowColumn width={width.job_position}>
                        {item.positions && item.positions.length ? (
                          <Positions item={item} attr={'positions'} />
                        ) : (
                          '-'
                        )}
                      </TableRowColumn>
                      <TableRowColumn width={width.organization}>
                        {item.user_organizations &&
                        item.user_organizations.length ? (
                          <OrganizationsOrPhongBan
                            item={item}
                            attr={'user_organizations'}
                          />
                        ) : (
                          '-'
                        )}
                      </TableRowColumn>
                      <TableRowColumn width={width.role}>
                        <RoleEditor
                          searchFormId={searchFormId}
                          appliedTarget={node}
                          type={node && node.ntype}
                          user={item}
                          disabled={!hasPermissionManagerCollaborator}
                        />
                      </TableRowColumn>
                      <TableRowColumn width={width.contact_info}>
                        {item.mail}{' '}
                        {(() => {
                          let value = 'undisplayer';

                          if (node.staff) {
                            node.staff.forEach((staff) => {
                              if (
                                staff.roles &&
                                staff.roles.includes('displayer') &&
                                staff.iid === item.iid
                              ) {
                                value = 'displayer';
                              }
                            });
                          }

                          if (
                            node.ntype === 'course' ||
                            node.ntype === 'syllabus'
                          ) {
                            return (
                              <ActionToggle
                                baseURL={routes.url('node_update', {
                                  ...node,
                                  step: 'staff_displayer',
                                  userIid: item.iid,
                                  ntype: node && node.ntype,
                                })}
                                dataSet={{
                                  on: 'displayer',
                                  off: 'undisplayer',
                                }}
                                labelSet={{
                                  on: t1('displayer'),
                                  off: t1('undisplayer'),
                                }}
                                value={value}
                                name="staff_displayer"
                                user={item}
                                label
                                disabled={!hasPermissionUpdate}
                              />
                            );
                          }
                          return item.phone || item.phone_support;
                        })()}
                      </TableRowColumn>
                      {hasPermissionManagerCollaborator && (
                        <TableRowColumn width={width.action}>
                          <Remove node={node} item={item} />
                        </TableRowColumn>
                      )}
                    </TableRow>
                  ),
              )}
          </TableBody>
        </Table>
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
