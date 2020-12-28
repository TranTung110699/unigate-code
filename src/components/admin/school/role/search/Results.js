import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import actions from 'actions/node/creators';
import UpdateForm from '../new/Form';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  constructor(props) {
    super(props);
    this.updateItem = this.updateItem.bind(this);
  }

  updateItem(item) {
    const { dispatch } = this.props;
    const formid = `edit_role_${item.id}`;
    const contentDialog = (
      <UpdateForm mode="edit" node={item} step={'role'} formid={formid} />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items } = this.props;
    const nameLabel = t1('name');
    const cNameLabel = t1('cname');
    const statusLabel = t1('status');
    const roleLabel = t1('role');
    const actionsLabel = t1('action');
    const editRoleLabel = t1('edit_contest');

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{nameLabel}</TableHeaderColumn>
              <TableHeaderColumn>{cNameLabel}</TableHeaderColumn>
              <TableHeaderColumn>{statusLabel}</TableHeaderColumn>
              <TableHeaderColumn>{roleLabel}</TableHeaderColumn>
              <TableHeaderColumn width="7%">{actionsLabel}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn title={item.name}>{item.name}</TableRowColumn>
                  <TableRowColumn title={item.cname}>
                    {item.cname}
                  </TableRowColumn>
                  <TableRowColumn>{item.status}</TableRowColumn>
                  <TableRowColumn>
                    {item.g &&
                      item.g.map &&
                      item.g.map((role) => <div>{role}</div>)}
                  </TableRowColumn>

                  <TableRowColumn width="7%">
                    <IconButton
                      title={editRoleLabel}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
