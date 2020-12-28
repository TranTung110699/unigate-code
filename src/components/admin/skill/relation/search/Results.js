import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import DisplayHtml from 'components/common/html';
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

class Results extends Component {
  updateItem(item) {
    const { dispatch } = this.props;
    const step = 'skill_relation';

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_skill_relation')}
        node={item}
        step={step}
        formid="edit_skill_relation"
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_skill_relation'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, ntype } = this.props;
    const iidLabel = t1('iid');
    const nameLabel = t1('name');
    const fromLabel = t1('from');
    const toLabel = t1('to');
    const effortLabel = t1('effort');
    const descriptionLabel = t1('description');
    const statusLabel = t1('status');
    const actionLabel = t1('action');
    const editLabel = t1('edit');
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
              <TableHeaderColumn>{iidLabel}</TableHeaderColumn>
              <TableHeaderColumn>{nameLabel}</TableHeaderColumn>
              <TableHeaderColumn>{fromLabel}</TableHeaderColumn>
              <TableHeaderColumn>{toLabel}</TableHeaderColumn>
              <TableHeaderColumn>{effortLabel}</TableHeaderColumn>
              <TableHeaderColumn>{descriptionLabel}</TableHeaderColumn>
              <TableHeaderColumn>{statusLabel}</TableHeaderColumn>
              <TableHeaderColumn width="10%" className="text-center">
                {actionLabel}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>
                    {item.from_mustache && item.from_mustache.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.to_mustache && item.to_mustache.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.estimated_effort} {item.estimated_effort_type}
                    {item.estimated_effort > 1 && 's'}
                  </TableRowColumn>
                  <TableRowColumn>
                    <DisplayHtml content={item.description} />
                  </TableRowColumn>
                  <TableRowColumn>{item.status}</TableRowColumn>
                  <TableRowColumn width="10%">
                    <IconButton
                      title={editLabel}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={removeLabel}
                      textConfirm={textConfirm}
                      formid={formid}
                      ntype={ntype}
                      step="skill_relation"
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      iid: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  ntype: PropTypes.string,
};

Results.defaultProps = {
  items: [{}],
  ntype: 'skill',
};

export default connect()(Results);
