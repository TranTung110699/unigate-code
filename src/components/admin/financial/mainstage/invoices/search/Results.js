import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import get from 'lodash.get';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { formatMoney } from 'common';
import { invoiceTypes } from 'configs/constants';
import { timestampToDateString } from 'common/utils/Date';
import GroupAction from 'components/common/GroupAction';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import actions from 'actions/node/creators';
import PrevewInvoice from '../Preview';
import ViewAndPrinterDeposit from '../../deposits/view-and-printer/Viewer';

class Results extends Component {
  handleViewInvoiceDeposit = (item) => {
    const { dispatch } = this.props;
    let contentDialog = null;

    if (item.type && item.type === invoiceTypes.DEPOSIT) {
      contentDialog = <ViewAndPrinterDeposit deposit={item} />;
    } else {
      contentDialog = <PrevewInvoice invoice={item} />;
    }

    const optionsProperties = {
      handleClose: true,

      title: `${t1('invoice')} ${item &&
        `#${item.code} (${t1('date')}: ${timestampToDateString(item.ts)})`}`,
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items, type, typeRender } = this.props;

    const width = {
      code: '5%',
      date: '7%',
      student: '10%',
      fee_template: '10%',
      amount: '10%',
      account_type: '10%',
      accountant: '10%',
      status: '10%',
      note: '10%',
      action: '18%',
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
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.student}>
                {t1('student')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.account_type}>
                {t1('account_type')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.accountant}>
                {t1('accountant')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.amount}>
                {t1('amount')}
              </TableHeaderColumn>
              {(!type || type !== invoiceTypes.DEPOSIT) && (
                <TableHeaderColumn width={width.status}>
                  {t1('status')}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn width={width.date}>
                {t1('date')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id} title={item.note}>
                  <TableRowColumn width={width.code}>
                    {item.code}
                  </TableRowColumn>
                  <TableRowColumn width={width.student}>
                    {`${get(item, 'student.name')} (#${get(
                      item,
                      'student.code',
                    )})`}
                  </TableRowColumn>

                  <TableRowColumn width={width.accountant}>
                    {item.wallet_type && (
                      <div title={item.wallet_type.name}>
                        #{item.wallet_type.code}
                      </div>
                    )}
                  </TableRowColumn>
                  <TableRowColumn width={width.accountant}>
                    {item.u.name}
                  </TableRowColumn>
                  <TableRowColumn width={width.amount}>
                    <span
                      style={{
                        color:
                          item.deposit_fee_template &&
                          item.deposit_fee_template.name
                            ? 'blue'
                            : '',
                      }}
                      title={
                        item.deposit_fee_template &&
                        item.deposit_fee_template.name
                      }
                    >
                      {item.total_amount_to_pay_group_by_currency &&
                        Object.keys(
                          item.total_amount_to_pay_group_by_currency,
                        ).map((key) => (
                          <span>
                            {formatMoney(
                              item.total_amount_to_pay_group_by_currency[key],
                            )}{' '}
                            {key}
                          </span>
                        ))}
                    </span>
                  </TableRowColumn>
                  {(!type || type !== invoiceTypes.DEPOSIT) && (
                    <TableRowColumn width={width.status}>
                      {t1(item.status)}
                    </TableRowColumn>
                  )}
                  <TableRowColumn width={width.date}>
                    {timestampToDateString(item.ts)}
                  </TableRowColumn>
                  <TableRowColumn width={width.action}>
                    {typeRender === 'cancel-invoice' ? (
                      <div>
                        <GroupAction
                          key={item.id}
                          options={[
                            {
                              value: 'accepted',
                              label: t1('accept'),
                            },
                            {
                              value: 'rejected',
                              label: t1('reject'),
                            },
                          ]}
                          url="/invoice/api/request-to-cancel"
                          searchFormId={this.props.formid}
                          params={{
                            id: item.id,
                          }}
                          field="_sand_step"
                        />
                      </div>
                    ) : (
                      <div>
                        {(!type || type !== invoiceTypes.DEPOSIT) && (
                          <Link
                            to={routes.url('node_edit', {
                              ...item,
                              type: 'invoice',
                            })}
                          >
                            <IconButton
                              title={t1('view_this_invoice')}
                              iconClassName="mi mi-remove-red-eye"
                            />
                          </Link>
                        )}
                        {type && type === invoiceTypes.DEPOSIT && (
                          <IconButton
                            onClick={() => this.handleViewInvoiceDeposit(item)}
                            title={t1('view_this_deposit')}
                            iconClassName="mi mi-remove-red-eye"
                          />
                        )}
                      </div>
                    )}
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
