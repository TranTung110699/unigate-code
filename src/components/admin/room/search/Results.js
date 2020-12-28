import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import IconButton from 'material-ui/IconButton';
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
  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_room')}
        node={item}
        step=""
        formid="edit_room"
      />
    );
    const optionsProperties = {
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;
    const iidLabel = t1('id');
    const nameLabel = t1('name');
    const addressLabel = t1('address');
    const codeLabel = t1('code');
    const candidateNumberLabel = t1('candidate_number');
    const actionsLabel = t1('action');
    const editRoomLabel = t1('edit_room');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width="7%">{iidLabel}</TableHeaderColumn>
              <TableHeaderColumn>{nameLabel}</TableHeaderColumn>
              <TableHeaderColumn>{addressLabel}</TableHeaderColumn>
              <TableHeaderColumn>{codeLabel}</TableHeaderColumn>
              <TableHeaderColumn>{candidateNumberLabel}</TableHeaderColumn>
              <TableHeaderColumn width="160">{actionsLabel}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width="7%">{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.address}</TableRowColumn>
                  <TableRowColumn>{item.code}</TableRowColumn>
                  <TableRowColumn>{item.candidate_number}</TableRowColumn>
                  <TableRowColumn width="180">
                    <IconButton
                      title={editRoomLabel}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={removeLabel}
                      textConfirm={textConfirm}
                      formid={formid}
                      ntype={ntype}
                      itemId={item.id}
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

export default connect()(Results);
