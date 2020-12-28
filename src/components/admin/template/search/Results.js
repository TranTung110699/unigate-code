import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import { reduxForm } from 'redux-form';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import DisplayHtml from 'components/common/html';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import UpdateForm from '../new/Form';

class Results extends Component {
  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_template')}
        node={item}
        step="template"
        formid="edit_template"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_template'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;
    const nameLabel = t1('name');
    const templateTitleLabel = t1('template_title');
    const contentLabel = t1('content');
    const availableMethodsLabel = t1('available_method');
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
              <TableHeaderColumn>{nameLabel}</TableHeaderColumn>
              <TableHeaderColumn>{templateTitleLabel}</TableHeaderColumn>
              <TableHeaderColumn>{contentLabel}</TableHeaderColumn>
              <TableHeaderColumn>{availableMethodsLabel}</TableHeaderColumn>
              <TableHeaderColumn width="160">{actionsLabel}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.template_title}</TableRowColumn>
                  <TableRowColumn>
                    <DisplayHtml content={item.content} />
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.available_methods &&
                      item.available_methods.map((method) => (
                        <div>{method}</div>
                      ))}
                  </TableRowColumn>
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

export default connect()(reduxForm({})(Results));
