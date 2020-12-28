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
import { abacRoleTypes } from 'configs/constants';
import Remove from './remove';

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
              {(!searchValues || !searchValues.include_category_children) && (
                <TableHeaderColumn title={t1('role')}>
                  {t1('role')}
                </TableHeaderColumn>
              )}
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
                          type={abacRoleTypes.ACADEMIC_CATEGORY}
                          user={item}
                        />
                      </TableRowColumn>
                      <TableRowColumn>
                        {(!searchValues ||
                          !searchValues.include_category_children) && (
                          <Remove node={node} item={item} />
                        )}
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
