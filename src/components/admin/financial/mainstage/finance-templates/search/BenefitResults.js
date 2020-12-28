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
import { formatMoney } from 'common';
import { convertValueToLabel } from 'components/admin/financial/mainstage/common/index';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import ActionToggle from 'components/common/toggle/ActionToggle';
import routes from 'routes';
import UpdateForm from '../new/Form';

const label = {
  no: t1('no'),
  iid: t1('iid'),
  name: t1('name'),
  edit: t1('edit'),
  remove: t1('remove'),
  action: t1('action'),
  textConfirm: t1('are_you_sure_you_want_to_do_this'),
  type: t1('type'),
  category: t1('category'),
  amount: t1('amount'),
  recurring: t1('recurring'),
  status: t1('approve'),
};
const width = {
  no: '5%',
  type: '25%',
  category: '15%',
  amount: '10%',
  recurring: '15%',
  status: '6%',
  actions: '150px',
};

const styles = {
  iid: { color: '#8a8d8d' },
};
const statusToggleDataSet = { on: 'approved', off: 'queued' };

class Results extends Component {
  updateItem(item) {
    const { dispatch, searchFormId, classification } = this.props;
    const categoryIids = [];
    const categories = item.category || [];
    categories.map((cate) => {
      categoryIids.push(cate.iid);
    });

    const node = { ...item, category: categoryIids };
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_benefit')}
        node={node}
        classification={classification}
        step="benefit"
        formid="edit_benefit"
        searchFormId={searchFormId}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_benefit'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, ntype, searchFormId, page } = this.props;
    const currentIndex = page ? page.items_per_page * (page.page - 1) + 1 : 1;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.no}>{label.no}</TableHeaderColumn>
              <TableHeaderColumn>{label.name}</TableHeaderColumn>
              <TableHeaderColumn width={width.type}>
                {label.type}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.category}>
                {label.category}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.amount}>
                {label.amount}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status}>
                {label.status}
              </TableHeaderColumn>
              <TableHeaderColumn className="text-center" width={width.actions}>
                {label.action}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.no}>
                    {currentIndex + index}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.name}
                    <span style={styles.iid}>({item.iid}) </span>
                  </TableRowColumn>
                  <TableRowColumn width={width.type}>
                    {convertValueToLabel('benefitTypes', item.benefit_type)}
                  </TableRowColumn>
                  <TableRowColumn width={width.category}>
                    {item.category && item.category.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.amount}>
                    {formatMoney(item.amount)}
                    <span style={styles.iid}>
                      {' '}
                      ({convertValueToLabel('benefitCurrencies', item.currency)}
                      )
                    </span>
                  </TableRowColumn>
                  <TableRowColumn width={width.status}>
                    <ActionToggle
                      hideLabel
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'status',
                        ntype: 'finance-template',
                      })}
                      dataSet={statusToggleDataSet}
                      value={item.status || 'queued'}
                      name="status"
                      title={t1('approve_or_queue_finance_template')}
                    />
                  </TableRowColumn>
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
  classification: PropTypes.string,
};

Results.defaultProps = {
  dispatch: () => {},
  items: [],
  searchFormId: '',
  ntype: '',
  classification: '',
};

export default connect()(Results);
