/* eslint-disable no-undef,react/prop-types,jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
// import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';

class Results extends Component {
  cssClass = 'admin-goal-tree-results';

  width = {
    actions: '20%',
  };

  render() {
    const { items, formid } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            style =
            <TableRow>
              <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('code')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('applied_scope')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('status')}</TableHeaderColumn>
              <TableHeaderColumn width={this.width.actions}>
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    {item.name} <br />
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.code} <br />
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.applied_scope} <br />
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.status ? 'active' : 'inactive'} <br />
                  </TableRowColumn>
                  <TableRowColumn width={this.width.actions}>
                    <DeleteItem
                      title={t1(item.status ? 'deactive' : 'active')}
                      textConfirm={t1(
                        'are_you_sure_you_want_to_change_status_of_%s?',
                        [t1(item.name)],
                      )}
                      formid={formid}
                      itemId={item.id}
                      alternativeApi={aApiUrls.abac_role_module_delete}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Results;
