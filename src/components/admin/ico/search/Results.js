import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import IconButton from 'material-ui/IconButton';
import actions from 'actions/node/creators';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

import UpdateForm from '../new/Form';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_ico')}
        node={item}
        step=""
        formid={`edit_ico_${item.id}`}
        searchFormId="ico_search"
      />
    );

    const optionsProperties = {
      handleClose: true,
      title: t1('edit_ico'),

      modal: true,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype, searchValues } = this.props;

    const width = {
      code: '10%',
      start_time: '20%',
      status: '10%',
      action: '7%',
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.code}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.start_time}>
                {t1('start_time')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status}>
                {t1('approved')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {t1('actions')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  className={
                    item.status === 'deleted' && 'searchResultsDeletedRow'
                  }
                >
                  <TableRowColumn width={width.code}>
                    {item.name}{' '}
                    <span className="text-muted">({item.code})</span>
                  </TableRowColumn>
                  <TableRowColumn width={width.start_time}>
                    {item.start_month} - {item.start_year}
                  </TableRowColumn>
                  <TableRowColumn width={width.status}>
                    <ActionToggle
                      hideLabel
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'status',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                    />
                  </TableRowColumn>
                  <TableRowColumn width={width.action}>
                    <IconButton
                      title={t1('edit')}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={t1('delete_ico')}
                      textConfirm={t1('do_you_really_want_to_delete_this_ico')}
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
