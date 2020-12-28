import React from 'react';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'components/common/avatar/index';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import { formatMoney } from 'common';
import { t1 } from 'translate';
import { TableRow, TableRowColumn } from 'components/common/mui/Table';
import NodeNew from 'components/admin/node/new';
import { schemaCreateInvoiceByFee } from 'components/admin/financial/mainstage/fees-of-user/schema/form';
import apiUrls from 'api-endpoints';
import { invoiceTypes } from 'configs/constants';

const dialogOptionsProperties = {
  handleClose: true,
  width: '90%',
};

class LayoutFreestyle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fees: [],
      addMultiAutomaticallyPaid: false,
    };
  }

  componentWillMount() {
    this.formatFeesByCurrencies(get(this.props, 'currencies'));
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(get(this.props, 'currencies'), get(nextProps, 'currencies'))) {
      this.formatFeesByCurrencies(get(nextProps, 'currencies'));
    }
  }

  theWalletsAndAnExtantAmountCanBePayment = (fee, fees, onlyOne = false) => {
    if (!fee || !fee.feesCurrency || !Array.isArray(fee.feesCurrency.wallets)) {
      return [];
    }

    let wallets = fee.feesCurrency.wallets;

    if (Array.isArray(fees) && fees.length) {
      let breakFor = false;
      fees.forEach((f) => {
        if (f.iid === fee.iid || breakFor) {
          breakFor = true;
          return;
        }

        if (
          f.iid !== fee.iid &&
          f.amount &&
          Array.isArray(f.wallets_payment) &&
          f.wallets_payment.length
        ) {
          let fAmount = f.amount;
          wallets = wallets.map((wallet) => {
            let extantAmount =
              wallet.extantAmount || wallet.money + wallet.vmoney;
            if (
              fAmount > extantAmount &&
              f.wallets_payment.includes(wallet.iid)
            ) {
              fAmount -= extantAmount;
              extantAmount = 0;
            } else if (f.wallets_payment.includes(wallet.iid)) {
              extantAmount -= fAmount;
              fAmount = 0;
            }

            return { ...wallet, extantAmount };
          });
        }
      });
    }

    wallets = wallets.filter(
      (wallet) =>
        typeof wallet.extantAmount === 'undefined' || wallet.extantAmount > 0,
    );

    const walletsAndExtantAmount = {};
    let totalAmount = 0;
    wallets.forEach((wallet) => {
      const extantAmount = wallet.extantAmount || wallet.money + wallet.vmoney;
      if (onlyOne && extantAmount > fee.amount && !totalAmount) {
        walletsAndExtantAmount[wallet.iid] = extantAmount;
        totalAmount = extantAmount;
      } else if (!onlyOne) {
        walletsAndExtantAmount[wallet.iid] = extantAmount;
        totalAmount += extantAmount;
      }
    });

    return totalAmount > fee.amount ? walletsAndExtantAmount : {};
  };

  formatFeesByCurrencies = (groupFees) => {
    if (!groupFees && !Array.isArray(groupFees)) {
      return [];
    }

    const results = [];
    groupFees.forEach((feesByCerrency) => {
      const { fees, ...feesCurrency } = feesByCerrency;
      if (fees && Array.isArray(fees)) {
        fees.forEach((fee, index) => {
          const tmp = Object.assign({}, fee, { feesCurrency });
          if (index === 0) {
            tmp.rowSpanFeesCurrency = fees.length;
          }
          const walletsAndExtantAmount = this.theWalletsAndAnExtantAmountCanBePayment(
            tmp,
            results,
            true,
          );
          if (walletsAndExtantAmount) {
            tmp.wallets_payment = Object.keys(walletsAndExtantAmount).map(
              (iid) => parseInt(iid),
            );
          }
          results.push(tmp);
        });
      }
    });

    this.setState({ fees: results });
  };

  setTheWalletForPayment = (feeIid, walletIid, added = true) => {
    this.setState((state) => {
      const fees = (state.fees || []).map((fee) => {
        if (fee.iid === feeIid) {
          let walletsPayment = fee.wallets_payment || [];
          if (added) {
            walletsPayment.push(walletIid);
          } else {
            walletsPayment = walletsPayment.filter(
              (wallet) => wallet !== walletIid,
            );
          }
          return { ...fee, wallets_payment: walletsPayment };
        }
        return fee;
      });
      return {
        fees,
      };
    }, this.checkAndAddToAutomaticallyPaidList);
  };

  getTotalAmountUsedForPaymentByWalletsSelected = (
    walletIidsSelected,
    walletsAndExtantAmount,
  ) => {
    if (
      !Array.isArray(walletIidsSelected) ||
      !walletIidsSelected.length ||
      !walletsAndExtantAmount
    ) {
      return 0;
    }
    let total = 0;
    walletIidsSelected.forEach((iid) => {
      total += walletsAndExtantAmount[iid] || 0;
    });
    return total;
  };

  getFeesActiveAutomaticallyPayment = () => {
    const fees = this.state.fees || [];
    if (!Array.isArray(fees) && !fees.length) {
      return [];
    }
    return fees
      .map((fee) => {
        const walletsAndExtantAmount = this.theWalletsAndAnExtantAmountCanBePayment(
          fee,
          fees,
        );
        const totalAmountUsedForPayment = this.getTotalAmountUsedForPaymentByWalletsSelected(
          fee.wallets_payment,
          walletsAndExtantAmount,
        );
        const { feesCurrency, ...newFee } = fee;
        return totalAmountUsedForPayment > fee.amount ? newFee : null;
      })
      .filter(Boolean);
  };

  confirmPay = (closeDialog, feesActiveAutomaticallyPayment) => {
    const { user, formid } = this.props;

    return (
      <NodeNew
        ntype="invoice"
        searchFormId={formid}
        schema={schemaCreateInvoiceByFee(user)}
        node={{
          fees: feesActiveAutomaticallyPayment,
          student_iid: user && user.iid,
          type: invoiceTypes.AUTOMATICALLY_PAYMENT_BY_WALLET,
        }}
        alternativeApi={apiUrls.post_new_node('invoice')}
        requestSuccessful={() => {
          closeDialog();
        }}
      />
    );
  };

  checkAndAddToAutomaticallyPaidList = (addToList = false) => {
    const { addMultiAutomaticallyPaid } = this.state;

    if (!addToList && !addMultiAutomaticallyPaid) {
      return;
    }

    const feesActiveAutomaticallyPayment = !addMultiAutomaticallyPaid
      ? []
      : this.getFeesActiveAutomaticallyPayment();

    const { user, addToAutomaticallyPaidList } = this.props;

    if (typeof addToAutomaticallyPaidList === 'function') {
      addToAutomaticallyPaidList(user, feesActiveAutomaticallyPayment);
    }
  };

  render() {
    const fees = this.state.fees || [];
    if (!fees || !Array.isArray(fees) || !fees.length) {
      return null;
    }

    const { user, columnWidth } = this.props;
    const feesActiveAutomaticallyPayment = this.getFeesActiveAutomaticallyPayment();

    let rows = fees.map((fee, index) => {
      const walletsAndExtantAmount = this.theWalletsAndAnExtantAmountCanBePayment(
        fee,
        fees,
      );
      const totalAmountUsedForPayment = this.getTotalAmountUsedForPaymentByWalletsSelected(
        fee.wallets_payment,
        walletsAndExtantAmount,
      );

      return (
        <TableRow key={`automatically-paid-${user.iid}-${index}`}>
          {index === 0 && (
            <TableRowColumn
              rowSpan={fees && fees.length + 1}
              width={columnWidth && columnWidth.stt}
            >
              <Checkbox
                label=""
                disabled={
                  !Array.isArray(feesActiveAutomaticallyPayment) ||
                  !feesActiveAutomaticallyPayment.length
                }
                checked={
                  Array.isArray(feesActiveAutomaticallyPayment) &&
                  feesActiveAutomaticallyPayment.length &&
                  this.state.addMultiAutomaticallyPaid
                }
                onCheck={(event, isChecked) => {
                  this.setState(
                    (state) => {
                      return {
                        addMultiAutomaticallyPaid: isChecked,
                      };
                    },
                    () => this.checkAndAddToAutomaticallyPaidList(true),
                  );
                }}
              />
            </TableRowColumn>
          )}
          {index === 0 && (
            <TableRowColumn
              rowSpan={fees && fees.length + 1}
              width={columnWidth && columnWidth.name}
            >
              <Avatar user={user} size={30} />
              &nbsp;
              {user && user.name}
              <br />
              (#{user && user.code})
            </TableRowColumn>
          )}
          {fee && fee.rowSpanFeesCurrency && (
            <TableRowColumn
              width={columnWidth && columnWidth.fees_currency}
              rowSpan={(fee && fee.rowSpanFeesCurrency) || 1}
            >
              {Array.isArray(fee.feesCurrency.wallets) &&
              fee.feesCurrency.wallets.length > 1 ? (
                <div>
                  <h3>
                    {`${t1('total_money')}: ${formatMoney(
                      fee.feesCurrency.total_money,
                    )} ${fee.feesCurrency.currency}`}
                  </h3>
                  <p>{t1('list_wallet:')}</p>
                  <ol>
                    {fee.feesCurrency.wallets.map((wallet) => (
                      <li>
                        {wallet && wallet.money && (
                          <p>{`${t1('money')}: ${formatMoney(wallet.money)} ${
                            wallet.currency
                          }`}</p>
                        )}
                        {wallet && wallet.vmoney > 0 && (
                          <p>{`${t1('vmoney')}: ${formatMoney(wallet.vmoney)} ${
                            wallet.currency
                          }`}</p>
                        )}
                        {wallet &&
                          wallet.user_major &&
                          wallet.user_major.objectMajor && (
                            <p>
                              {`${t1('apply_the_major')} ${
                                wallet.user_major.objectMajor.name
                              }`}
                            </p>
                          )}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div>
                  {fee.feesCurrency.wallets && fee.feesCurrency.wallets[0] && (
                    <div>
                      {fee.feesCurrency.wallets[0].money && (
                        <p>{`${t1('money')}: ${formatMoney(
                          fee.feesCurrency.wallets[0].money,
                        )} ${fee.feesCurrency.wallets[0].currency}`}</p>
                      )}
                      {fee.feesCurrency.wallets[0].vmoney > 0 && (
                        <p>{`${t1('vmoney')}: ${formatMoney(
                          fee.feesCurrency.wallets[0].vmoney,
                        )} ${fee.feesCurrency.wallets[0].currency}`}</p>
                      )}
                      {fee.feesCurrency.wallets[0].user_major &&
                        fee.feesCurrency.wallets[0].objectMajor && (
                          <p>
                            {`${t1('applied_the_major')}: ${
                              fee.feesCurrency.wallets[0].user_major.objectMajor
                                .name
                            }`}
                          </p>
                        )}
                    </div>
                  )}
                </div>
              )}
            </TableRowColumn>
          )}
          <TableRowColumn width={columnWidth && columnWidth.fees}>
            <div className="col-md-6">
              <p>{t1('information')}</p>
              <ul>
                {fee &&
                  ((fee.fee_template && fee.fee_template.name) || fee.name) && (
                    <li>
                      {(fee.fee_template && fee.fee_template.name) || fee.name}
                    </li>
                  )}
                {
                  <li>{`${t1('amount')}: ${formatMoney(fee.amount)} ${
                    fee.fee_template.currency
                  }`}</li>
                }
              </ul>
            </div>
            <div className="col-md-6">
              <p>{t1('using_wallets_payment')}</p>
              {fee.feesCurrency.wallets &&
                fee.feesCurrency.wallets.map((map) => (
                  <Checkbox
                    label={map && map.wallet_type && map.wallet_type.name}
                    disabled={!walletsAndExtantAmount[map.iid]}
                    checked={
                      Array.isArray(fee.wallets_payment) &&
                      fee.wallets_payment.includes(map.iid)
                    }
                    onCheck={(event, isChecked) =>
                      this.setTheWalletForPayment(fee.iid, map.iid, isChecked)
                    }
                  />
                ))}
              {totalAmountUsedForPayment < fee.amount &&
                Array.isArray(fee.wallets_payment) &&
                fee.wallets_payment.length > 0 && (
                  <p style={{ color: 'red' }}>{`${t1(
                    'amount_used_for_payment',
                  )}: ${formatMoney(totalAmountUsedForPayment)} ${
                    fee.fee_template.currency
                  }`}</p>
                )}
            </div>
          </TableRowColumn>
        </TableRow>
      );
    });

    rows = rows.concat(
      <TableRow>
        <TableRowColumn colSpan={2} className="text-center">
          <DetailOnDialog
            renderPreview={({ showFull }) => (
              <RaisedButton
                label={t1('pay')}
                onClick={showFull}
                disabled={
                  !Array.isArray(feesActiveAutomaticallyPayment) ||
                  !feesActiveAutomaticallyPayment.length
                }
                primary
              />
            )}
            renderFull={({ closeDialog }) =>
              this.confirmPay(closeDialog, feesActiveAutomaticallyPayment)
            }
            dialogOptionsProperties={dialogOptionsProperties}
          />
        </TableRowColumn>
      </TableRow>,
    );

    return rows;
  }
}

export default LayoutFreestyle;
