import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import UpdateForm from '../new/Form';

const label = {
  iid: t1('iid'),
  name: t1('name'),
  edit: t1('edit'),
  remove: t1('remove'),
  action: t1('action'),
  textConfirm: t1('are_you_sure_you_want_to_do_this'),
};
const width = {
  iid: '10%',
  actions: '150px',
};

class Results extends Component {
  updateItem(item) {
    const { dispatch, searchFormId } = this.props;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_passdef')}
        node={item}
        formid="edit_passdef"
        searchFormId={searchFormId}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_passdef'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, ntype, searchFormId } = this.props;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.iid}>
                {label.iid}
              </TableHeaderColumn>
              <TableHeaderColumn>{label.name}</TableHeaderColumn>
              <TableHeaderColumn className="text-center" width={width.actions}>
                {label.action}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.iid}>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn width={width.actions} className="text-center">
                    <IconButton
                      title={label.edit}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={label.remove}
                      textConfirm={label.textConfirm}
                      formid={searchFormId}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  searchFormId: PropTypes.string,
  ntype: PropTypes.string,
  dispatch: PropTypes.func,
};

Results.defaultProps = {
  dispatch: () => {},
  items: [],
  searchFormId: 'passdef_search',
  ntype: 'passdef',
};

export default connect()(Results);
