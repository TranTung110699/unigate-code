import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import UpdateRedisForm from '../new/Form';

class Results extends Component {
  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateRedisForm
        mode="edit"
        title={t1('edit_redis')}
        node={item}
        step=""
        formid="edit_redis"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_redis'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid } = this.props;

    const keyLabel = t1('key');
    const keyVerboseLabel = t1('key_verbose');
    const typeLabel = t1('type');
    const dbLabel = t1('db');
    const valueLabel = t1('value');
    const meaningLabel = t1('meaning');
    const actionLabel = 'action';
    const editLabel = t1('edit');
    const deleteLabel = t1('delete');
    const confirmDeleteLabel = t1('are_you_sure_you_want_to_do_this');

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>{keyLabel}</TableHeaderColumn>
              <TableHeaderColumn>{keyVerboseLabel}</TableHeaderColumn>
              <TableHeaderColumn>{typeLabel}</TableHeaderColumn>
              <TableHeaderColumn>{dbLabel}</TableHeaderColumn>
              <TableHeaderColumn>{valueLabel}</TableHeaderColumn>
              <TableHeaderColumn>{meaningLabel}</TableHeaderColumn>
              <TableHeaderColumn width="10%">{actionLabel}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>
                    {item.name} <br />
                    {item.key} <br />
                    {item.key_explained}
                  </TableRowColumn>
                  <TableRowColumn>{item.key_verbose}</TableRowColumn>
                  <TableRowColumn>{item.type}</TableRowColumn>
                  <TableRowColumn>{item.display_db}</TableRowColumn>
                  <TableRowColumn>{item.value}</TableRowColumn>
                  <TableRowColumn>{item.meaning}</TableRowColumn>
                  <TableRowColumn width="10%">
                    <IconButton
                      title={editLabel}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={deleteLabel}
                      textConfirm={confirmDeleteLabel}
                      formid={formid}
                      alternativeApi={'/redis/index/delete'}
                      params={{ key: item.name, db: item.db }}
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
