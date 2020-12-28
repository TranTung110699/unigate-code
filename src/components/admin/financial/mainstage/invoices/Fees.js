import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { formatMoney, amount_in_numbers_to_words } from 'common';
import {
  convertValueToLabel,
  getFeeCurrency,
} from 'components/admin/financial/mainstage/common';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

import './stylesheet.scss';

class Fees extends Component {
  render() {
    const { fees, invoice } = this.props;
    const width = {
      name: '40%',
      amount: '15%',
      benefit: '15%',
      benefit_amount: '15%',
      amount_to_pay: '15%',
    };

    const othersBenefit =
      (invoice &&
        invoice.others_benefit &&
        Array.isArray(invoice.others_benefit.benefits) &&
        invoice.others_benefit.benefits) ||
      [];

    return (
      <div className="paying-fees-wrapper">
        <h3>Danh sách phí / Fee list</h3>
        {fees && (
          <div>
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow selectable={false}>
                  <TableHeaderColumn width={width.name}>
                    {t1('fee_name')}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={width.amount}>
                    {t1('amount')}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={width.benefit}>
                    {t1('benefit')}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={width.benefit_amount}>
                    {t1('benefit_amount')}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={width.amount_to_pay}>
                    {t1('amount_to_pay')}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false}>
                {fees &&
                  fees.map((item) => {
                    const benefitsForIterate =
                      item &&
                      item.applied_benefits &&
                      item.applied_benefits.length
                        ? item.applied_benefits
                        : [null];

                    const creditTransfert =
                      item &&
                      item.credit_transfert &&
                      item.credit_transfert.amount
                        ? item.credit_transfert
                        : null;

                    return [
                      <TableRow
                        key={`${item.id} - ${benefitsForIterate[0] &&
                          benefitsForIterate[0].iid}`}
                        selectable={false}
                      >
                        <TableRowColumn
                          width={width.name}
                          rowSpan={benefitsForIterate.length}
                        >
                          {item && item.name}
                        </TableRowColumn>
                        <TableRowColumn
                          width={width.amount}
                          rowSpan={benefitsForIterate.length}
                        >
                          {item && formatMoney(item.amount)}{' '}
                          {convertValueToLabel(
                            'feeCurrencies',
                            getFeeCurrency(item),
                          )}
                        </TableRowColumn>
                        <TableRowColumn width={width.benefit}>
                          {benefitsForIterate[0] && (
                            <div>
                              {benefitsForIterate[0].name}
                              {benefitsForIterate[0].amount && (
                                <span>
                                  (-
                                  {formatMoney(benefitsForIterate[0].amount)}
                                  {convertValueToLabel(
                                    'benefitCurrencies',
                                    benefitsForIterate[0].currency,
                                  )}
                                  )
                                </span>
                              )}
                            </div>
                          )}
                          {creditTransfert && (
                            <div>
                              <h3>
                                {t1('credit_transfert')}:{' '}
                                {`${formatMoney(creditTransfert.amount)} ${
                                  creditTransfert.currency
                                }`}
                              </h3>
                            </div>
                          )}
                        </TableRowColumn>
                        <TableRowColumn width={width.benefit_amount}>
                          {benefitsForIterate[0] && (
                            <div>
                              {`${formatMoney(
                                benefitsForIterate[0].benefit_amount,
                              )} ${convertValueToLabel(
                                'feeCurrencies',
                                getFeeCurrency(item),
                              )}`}
                            </div>
                          )}

                          {creditTransfert && creditTransfert.detail && (
                            <div>
                              <p>{t1('list_subject_is_credit_transfert')}</p>
                              <ul className="list-group">
                                {creditTransfert.detail.map((map) => (
                                  <li key={`${item.id}-${map.iid}`}>
                                    {map && map.name}
                                    &nbsp;
                                    <span className="text-muted">
                                      (
                                      {`${map &&
                                        formatMoney(map.amount)} ${map &&
                                        map.currency}`}
                                      )
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </TableRowColumn>
                        <TableRowColumn
                          width={width.amount_to_pay}
                          rowSpan={benefitsForIterate.length}
                        >
                          {item && formatMoney(item.amount_to_pay)}{' '}
                          {convertValueToLabel(
                            'feeCurrencies',
                            getFeeCurrency(item),
                          )}
                        </TableRowColumn>
                      </TableRow>,
                    ].concat(
                      benefitsForIterate.slice(1).map((benefit) => (
                        <TableRow
                          key={`${item.id} - ${benefit && benefit.iid}`}
                          selectable={false}
                        >
                          <TableRowColumn width={width.benefit}>
                            {benefit && (
                              <div>
                                {benefit.name}
                                {benefit.amount && (
                                  <span>
                                    (-
                                    {formatMoney(benefit.amount)}
                                    {convertValueToLabel(
                                      'benefitCurrencies',
                                      benefit.currency,
                                    )}
                                    )
                                  </span>
                                )}
                              </div>
                            )}
                          </TableRowColumn>
                          <TableRowColumn width={width.benefit_amount}>
                            {benefit && (
                              <div>
                                {`${formatMoney(
                                  benefit.benefit_amount,
                                )} ${convertValueToLabel(
                                  'feeCurrencies',
                                  getFeeCurrency(item),
                                )}`}
                              </div>
                            )}
                          </TableRowColumn>
                        </TableRow>
                      )),
                    );
                  })}
              </TableBody>
            </Table>
            {othersBenefit.length === 1 && (
              <p>
                Miễn giảm khác / Other benefit: {othersBenefit[0].name}
                <span className="text-muted">
                  ({othersBenefit[0].amount} {othersBenefit[0].currency})
                </span>
              </p>
            )}
            {othersBenefit.length > 1 && (
              <div>
                <p>
                  Các miễn giảm khác / Others benefit :
                  <ol>
                    {othersBenefit.map((map, index) => (
                      <li key={`${map.name}-${index}`}>
                        {map.name}: {formatMoney(map.amount)} {map.currency}
                      </li>
                    ))}
                  </ol>
                </p>
              </div>
            )}
            {invoice && invoice.total_amount_to_pay_group_by_currency && (
              <ul style={{ margin: 0, padding: 15 }}>
                <lh style={{ margin: -15 }}>Tổng cộng / Total:</lh>
                {((totalAmountToPayGroupByCurrency) =>
                  totalAmountToPayGroupByCurrency &&
                  Object.keys(totalAmountToPayGroupByCurrency).map(
                    (currency, index) => {
                      const amount = totalAmountToPayGroupByCurrency[currency];
                      const currencyText = convertValueToLabel(
                        'feeCurrencies',
                        currency,
                      );
                      return (
                        <li>
                          {`Số tiền viết bằng số / Amount in numbers: ${formatMoney(
                            amount,
                          )} ${currencyText}`}
                          <br />
                          {`Số tiền viết bằng chữ / Amount in words: ${t1(
                            amount_in_numbers_to_words(amount),
                          )} ${currencyText}`}
                        </li>
                      );
                    },
                  ))(invoice.total_amount_to_pay_group_by_currency)}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect()(Fees);
