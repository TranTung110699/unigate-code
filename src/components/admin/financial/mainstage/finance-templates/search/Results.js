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
import { convertValueToLabel } from 'components/admin/financial/mainstage/common/index';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import ActionToggle from 'components/common/toggle/ActionToggle';
import routes from 'routes';
import { formatMoney } from 'common';
import UpdateForm from '../new/Form';
import { displayBenefits } from '../common';

const label = {
  iid: t1('iid'),
  name: t1('name'),
  edit: t1('edit'),
  remove: t1('remove'),
  action: t1('action'),
  textConfirm: t1('are_you_sure_you_want_to_do_this'),
  type: t1('template_type'),
  category: t1('category'),
  amount: t1('amount'),
  benefit: t1('benefit'),
  recurring: t1('recurring'),
  status: t1('approve'),
};
const width = {
  name: '15%',
  type: '15%',
  category: '15%',
  amount: '10%',
  recurring: '15%',
  status: '6%',
  actions: '9%',
  benefit: '15%',
};

const styles = {
  iid: { color: '#aaadad' },
};
const statusToggleDataSet = { on: 'approved', off: 'queued' };

function getRecurring(item) {
  if (item.recurring_type === 'recurring') {
    return `${item.recurring_period} ${convertValueToLabel(
      'feeRecurringUnits',
      item.recurring_unit,
    )}`;
  }

  return convertValueToLabel('feeRecurringTypes', item.recurring_type);
}

const getAmountBySemester = (semesterFees) => {
  if (!semesterFees || semesterFees.length === 0) {
    return 0;
  }
  let feeAmount = 0;
  semesterFees.map((feeData) => {
    feeAmount += feeData.amount;
  });
  return formatMoney(feeAmount);
};

class Results extends Component {
  updateItem(item) {
    const { dispatch, searchFormId } = this.props;
    let categoriesIid = [];
    if (item.category) {
      item.category.map((cat) => {
        categoriesIid.push(cat.iid);
      });
    }
    const node = { ...item, category: categoriesIid };
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_finance_template')}
        node={node}
        formid="edit_finance_template"
        searchFormId={searchFormId}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_finance_template'),
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
              <TableHeaderColumn width={width.name}>
                {label.name}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.type}>
                {label.type}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.category}>
                {label.category}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.amount}>
                {label.amount}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.recurring}>
                {label.recurring}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.benefit}>
                {label.benefit}
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
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.name}>
                    {item.name}
                    <span style={styles.iid}>({item.iid}) </span>
                  </TableRowColumn>
                  <TableRowColumn width={width.type}>
                    {convertValueToLabel(
                      'feeTemplateTypes',
                      item.template_type,
                    )}
                  </TableRowColumn>
                  <TableRowColumn width={width.category}>
                    {item.category &&
                      item.category.map((cat, idx) => {
                        return (
                          <span>
                            {cat.name}{' '}
                            {idx === item.category.length - 1 ? '' : ', '}
                          </span>
                        );
                      })}
                  </TableRowColumn>
                  <TableRowColumn width={width.amount}>
                    {item.amount_for_practice_credit && (
                      <div>
                        {`${t1('practice')}: ${formatMoney(
                          item.amount_for_practice_credit,
                        )}`}
                        <span style={styles.iid}>
                          {' '}
                          ({convertValueToLabel('feeCurrencies', item.currency)}
                          )
                        </span>
                      </div>
                    )}
                    {item.amount_for_theory_credit && (
                      <div>
                        {`${t1('theory')}: ${formatMoney(
                          item.amount_for_theory_credit,
                        )}`}
                        <span style={styles.iid}>
                          {' '}
                          ({convertValueToLabel('feeCurrencies', item.currency)}
                          )
                        </span>
                      </div>
                    )}
                    {item.amount && (
                      <div>
                        {`${formatMoney(item.amount)}`}
                        <span style={styles.iid}>
                          {' '}
                          ({convertValueToLabel('feeCurrencies', item.currency)}
                          )
                        </span>
                      </div>
                    )}

                    {item.semester_fee && (
                      <div>
                        {getAmountBySemester(item.semester_fee)}
                        <span style={styles.iid}>
                          {' '}
                          ({convertValueToLabel('feeCurrencies', item.currency)}
                          )
                        </span>
                      </div>
                    )}
                  </TableRowColumn>
                  <TableRowColumn width={width.recurring}>
                    {getRecurring(item)}
                  </TableRowColumn>
                  <TableRowColumn width={width.benefit}>
                    {displayBenefits(
                      item.applicable_benefits,
                      item.number_of_applicable_benefits,
                    )}
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
};

Results.defaultProps = {
  dispatch: () => {},
  items: [],
  searchFormId: 'finance_template_search',
  ntype: 'finance-template',
};

export default connect()(Results);
