import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Avatar from 'components/common/avatar';
import RoleEditor from 'components/admin/user-abac-role/role-editor';
import { abacRoleTypes, relationTypes } from 'configs/constants';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import apiUrls from 'api-endpoints';

class Results extends Component {
  render() {
    const { items, node, searchValues, searchFormId } = this.props;

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('avatar')}>
                {t1('avatar')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('email')}>
                {t1('email')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('phone_number')}>
                {t1('phone_number')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('role')}>
                {t1('role')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover>
            {items &&
              items.map(
                (item) =>
                  item && (
                    <TableRow key={item.id}>
                      <TableRowColumn>
                        <Avatar user={item} />
                      </TableRowColumn>
                      <TableRowColumn>{item.iid}</TableRowColumn>
                      <TableRowColumn>{item.code}</TableRowColumn>
                      <TableRowColumn>{item.name}</TableRowColumn>
                      <TableRowColumn>{item.mail}</TableRowColumn>
                      <TableRowColumn>{item.phone}</TableRowColumn>
                      <TableRowColumn>
                        <RoleEditor
                          searchFormId={searchFormId}
                          appliedTarget={node}
                          type={abacRoleTypes.GROUP}
                          user={item}
                        />
                      </TableRowColumn>
                      <TableRowColumn>
                        <DeleteItem
                          item={item}
                          alternativeApi={apiUrls.remove_relation}
                          formid={searchFormId}
                          params={{
                            oid: item.iid,
                            sid: node.iid,
                            rt: relationTypes.STAFF_CATEGORY,
                            object: 'user',
                            subject: 'category',
                          }}
                          step={'user_group_staff'}
                        />
                      </TableRowColumn>
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
