import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionToggle from 'components/common/toggle/ActionToggle';
import DisplayHtml from 'components/common/html';
import routes from 'routes';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import UpdateUpdate from '../new/Form';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateUpdate
        mode="edit"
        title={t1('edit_faq')}
        node={item}
        step=""
        searchFormId="faq_search"
        formid="edit_faq"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_translate'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;

    const label = {
      iid: t1('iid'),
      answer: t1('answer'),
      question: t1('question'),
      action: t1('action'),
      edit: t1('edit'),
      delete: t1('delete'),
      approved: t1('approved'),
      confirmDelete: 'are_you_sure_you_want_to_do_this',
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
              <TableHeaderColumn>{label.iid}</TableHeaderColumn>
              <TableHeaderColumn>{label.question}</TableHeaderColumn>
              <TableHeaderColumn>{label.answer}</TableHeaderColumn>
              <TableHeaderColumn width="10%">
                {label.approved}
              </TableHeaderColumn>
              <TableHeaderColumn width="160">{label.action}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.question}</TableRowColumn>
                  <TableRowColumn>
                    <DisplayHtml content={item.answer} />
                  </TableRowColumn>
                  <TableRowColumn width="10%">
                    <ActionToggle
                      label
                      baseURL={routes.url('node_update', {
                        ...item,
                        ntype: 'faq',
                        step: 'status',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                      hideLabel
                    />
                  </TableRowColumn>
                  <TableRowColumn width="180">
                    <IconButton
                      title={label.edit}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={label.delete}
                      textConfirm={label.confirmDelete}
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
