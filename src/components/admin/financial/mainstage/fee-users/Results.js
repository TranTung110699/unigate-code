import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timestampToDateString } from 'common/utils/Date';
import { formatMoneyWithCurrency } from 'common';
import { mapObject } from 'common/utils/object';
import { groupByKey, sum } from 'common/utils/Array';
import { t, t1 } from 'translate';
import get from 'lodash.get';
import Avatar from 'components/common/avatar/index';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { feeStatuses } from 'configs/constants';
import PostponeFees from './mainstate/postponeFees';
import ChangeStatusFees from './mainstate/changeStatus';
import CreateInvoice from './mainstate/createInvoice';

class Results extends Component {
  cssClass = 'admin-financial-fee-users-search-result';

  styleButtonAction = {
    fontSize: 20,
    margin: 10,
  };

  width = {
    name: '10%',
    major: '10%',
    phase: '10%',
    overview: '20%',
    fees: '30%',
    actions: '20%',
  };

  formatItemsForTable = (items) => {
    const listOfFeesWithMajorAndFcp =
      items &&
      items.filter(Boolean).reduce((result, user) => {
        if (!Array.isArray(user.fees) || user.fees.length === 0) {
          return result.concat([user]);
        }

        /**
         * after grouping, groupFeesByMajorAndFcp will look like this
         * {
         *  'iid_of_major_1': {
         *    'iid_of_fcp_1': [...list of fees],
         *    'iid_of_fcp_2': [...list of fees],
         *  },
         *  'iid_of_major_2': {
         *    'iid_of_fcp_1': [...list of fees],
         *    'iid_of_fcp_2': [...list of fees],
         *  }
         * }
         */
        let feesGroupByMajorAndFcp = {};
        feesGroupByMajorAndFcp = groupByKey(
          user.fees,
          'applied_scope_by_major',
        );

        feesGroupByMajorAndFcp = mapObject(
          feesGroupByMajorAndFcp,
          (fees) => fees && groupByKey(fees, 'fee_collecting_phase'),
        );

        return result.concat(
          Object.keys(feesGroupByMajorAndFcp)
            .sort()
            .reduce((result, majorIid) => {
              const feesOfMajorGroupByFcp = feesGroupByMajorAndFcp[majorIid];

              return result.concat(
                Object.keys(feesOfMajorGroupByFcp)
                  .sort()
                  .reduce((result, fcpIid) => {
                    const feesOfFcpOfMajor = feesOfMajorGroupByFcp[fcpIid];
                    const sampleFeeWithMajorAndFcpInfo = feesOfFcpOfMajor[0];
                    if (!sampleFeeWithMajorAndFcpInfo) {
                      return result;
                    }

                    return result.concat([
                      {
                        ...user,
                        applied_scope_by_major: get(
                          sampleFeeWithMajorAndFcpInfo,
                          'applied_scope_by_major',
                        ),
                        applied_scope_by_major_detail: get(
                          sampleFeeWithMajorAndFcpInfo,
                          'applied_scope_by_major_detail',
                        ),
                        fee_collecting_phase: get(
                          sampleFeeWithMajorAndFcpInfo,
                          'fee_collecting_phase',
                        ),
                        fee_collecting_phase_name: get(
                          sampleFeeWithMajorAndFcpInfo,
                          'fee_collecting_phase_name',
                        ),
                        fees: feesOfFcpOfMajor,
                      },
                    ]);
                  }, []),
              );
            }, []),
        );
      }, []);

    let prevItem = null;

    return listOfFeesWithMajorAndFcp
      ? listOfFeesWithMajorAndFcp
          .filter(Boolean)
          .reverse()
          .map((item, index, arr) => {
            if (index === 0) {
              prevItem = {
                ...item,
                userRowSpan: 1,
                majorRowSpan: 1,
              };
              return prevItem;
            }

            const prevItemMajorIid = get(prevItem, 'applied_scope_by_major');
            const prevItemUserIid = get(prevItem, 'iid');
            const prevItemUserRowSpan = get(prevItem, 'userRowSpan');
            const prevItemMajorRowSpan = get(prevItem, 'majorRowSpan');

            const itemMajorIid = get(item, 'applied_scope_by_major');
            const itemUserIid = get(item, 'iid');

            if (itemUserIid !== prevItemUserIid) {
              prevItem = {
                ...item,
                userRowSpan: 1,
                majorRowSpan: 1,
              };
              return prevItem;
            }

            if (itemMajorIid !== prevItemMajorIid) {
              prevItem = {
                ...item,
                userRowSpan: prevItemUserRowSpan + 1,
                majorRowSpan: 1,
              };
              return prevItem;
            }

            prevItem = {
              ...item,
              userRowSpan: prevItemUserRowSpan + 1,
              majorRowSpan: prevItemMajorRowSpan + 1,
            };
            return prevItem;
          })
          .reverse()
          .map((item, index, arr) => {
            if (index === 0) {
              prevItem = {
                ...item,
                startOfUser: true,
                startOfMajor: true,
              };
              return prevItem;
            }

            const prevItemMajorIid = get(prevItem, 'applied_scope_by_major');
            const prevItemUserIid = get(prevItem, 'iid');

            const itemMajorIid = get(item, 'applied_scope_by_major');
            const itemUserIid = get(item, 'iid');

            if (itemUserIid !== prevItemUserIid) {
              prevItem = {
                ...item,
                startOfUser: true,
                startOfMajor: true,
              };
              return prevItem;
            }

            if (itemMajorIid !== prevItemMajorIid) {
              prevItem = {
                ...item,
                startOfUser: false,
                startOfMajor: true,
              };
              return prevItem;
            }

            prevItem = {
              ...item,
              startOfUser: false,
              startOfMajor: false,
            };
            return prevItem;
          })
      : [];
  };

  getButtonActions = (userIid) => {
    const { items } = this.props;

    const userFees =
      Array.isArray(items) &&
      items.find((item) => item && item.iid === userIid);

    if (!userFees && !Array.isArray(userFees.fees)) {
      return [];
    }

    let displayCancelFee = false;
    let displayReactivateFee = false;
    let displayCreateInvoiceButton = false;
    let displayPostPoneFeeButton = false;

    userFees.fees.forEach((fee) => {
      if (
        [feeStatuses.NEW, feeStatuses.POSTPONE_DEADLINE].includes(fee.status)
      ) {
        displayPostPoneFeeButton = true;
        displayCreateInvoiceButton = true;
      }
      if (fee.status === feeStatuses.NEW) {
        displayCancelFee = true;
      }
      if (fee.status === feeStatuses.CANCELLED) {
        displayReactivateFee = true;
      }
    });

    const buttons = [];

    if (displayCreateInvoiceButton) {
      buttons.push(this.createInvoiceButton(userFees));
    }

    if (displayPostPoneFeeButton) {
      buttons.push(this.postponeFeesButton(userIid));
    }

    if (displayReactivateFee) {
      buttons.push(this.changeStatusFeeButton(userFees, feeStatuses.NEW));
    }

    if (displayCancelFee) {
      buttons.push(this.changeStatusFeeButton(userFees, feeStatuses.CANCELLED));
    }

    return buttons;
  };

  changeStatusFeeButton = (userFees, status = feeStatuses.CANCELLED) => {
    const fees = this.getFeesCanBeChangeByStatus(userFees, status);
    const title =
      status === feeStatuses.CANCELLED
        ? t1('cancellation_fees')
        : t1('reactivate_fees');
    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <Icon
            title={
              status === feeStatuses.CANCELLED
                ? t1('cancellation_fees')
                : t1('reactivate_fees')
            }
            className="action"
            icon={status === feeStatuses.CANCELLED ? 'unlink' : 'link'}
            style={this.styleButtonAction}
            onClick={showFull}
          />
        )}
        renderFull={() => (
          <ChangeStatusFees
            searchFormId={this.props.searchFormId}
            user={userFees}
            fees={fees}
            status={status}
          />
        )}
        dialogOptionsProperties={this.getDialogOptionsProperties('', title)}
      />
    );
  };

  getFeesCanBeChangeByStatus = (userFees, status = feeStatuses.CANCELLED) => {
    if (!userFees && !Array.isArray(userFees.fees)) {
      return [];
    }

    return userFees.fees.filter((fee) =>
      status === feeStatuses.CANCELLED
        ? [
            feeStatuses.NEW,
            feeStatuses.POSTPONE_DEADLINE,
            feeStatuses.PAID,
          ].includes(fee && fee.status)
        : [feeStatuses.CANCELLED].includes(fee && fee.status),
    );
  };

  createInvoiceButton = (userFees) => (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <Icon
          title={t1('create_invoice')}
          icon="package"
          className="action"
          style={this.styleButtonAction}
          onClick={showFull}
        />
      )}
      renderFull={() => (
        <CreateInvoice
          searchFormId={this.props.searchFormId}
          userFees={userFees}
        />
      )}
      dialogOptionsProperties={this.getDialogOptionsProperties()}
    />
  );

  postponeFeesButton = (userIid) => (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <Icon
          title={t1('postpone_fees_for_user')}
          icon="pulse"
          className="action"
          style={this.styleButtonAction}
          onClick={showFull}
        />
      )}
      renderFull={({ closeDialog }) => (
        <PostponeFees
          userIid={userIid}
          closeDialog={closeDialog}
          searchFormId={this.props.searchFormId}
        />
      )}
      dialogOptionsProperties={this.getDialogOptionsProperties('postpone_fees')}
    />
  );

  getDialogOptionsProperties = (type, title) => {
    switch (type) {
      case 'postpone_fees':
        return {
          title: title || t1('postpone_fees'),
          width: '80%',
        };
      default:
        return {
          title,
        };
    }
  };

  render() {
    const { items, className } = this.props;

    if (!Array.isArray(items) || !items.length) {
      return <h3 className="m-t-30">{t1('fees_not_found')}</h3>;
    }

    const componentClassName = `${className || ''} ${this.cssClass ||
      ''} table-result`;

    return (
      <div className={componentClassName}>
        <table className="table table-border whitebox m-t-20">
          <thead className="text-center">
            <tr>
              <th width={this.width.name} height={60}>
                {t1('full_name')} - {t1('code')}
              </th>
              {/*    <th width={this.width.major}>{t1('major')}</th>*/}
              <th width={this.width.phase}>{t1('phase')}</th>
              <th width={this.width.overview}>{t1('overview')}</th>
              <th width={this.width.fees}>{t1('fees')}</th>
              <th width={this.width.actions}>{t1('actions')}</th>
            </tr>
          </thead>

          <tbody displayRowCheckbox={false}>
            {this.formatItemsForTable(items).map((item, index) => (
              <tr key={index}>
                {item.startOfUser && (
                  <td width={this.width.name} rowSpan={item.userRowSpan}>
                    <Avatar user={item} size={30} />
                    &nbsp;
                    {item && item.name}
                    <span className="text-muted">
                      {item.code && `( ${item.code} )`}
                    </span>
                  </td>
                )}
                {/*{item.startOfMajor && (*/}
                {/*  <td width={this.width.major} rowSpan={item.majorRowSpan}>*/}
                {/*    {`${get(item, 'applied_scope_by_major_detail.name')} (${get(*/}
                {/*      item,*/}
                {/*      'applied_scope_by_major_detail.code',*/}
                {/*    )})`}*/}
                {/*  </td>*/}
                {/*)}*/}
                <td width={this.width.phase}>
                  {item.fee_collecting_phase_name}
                </td>
                <td width={this.width.overview}>
                  {(() => {
                    const feesOfFcp = item.fees;

                    if (!feesOfFcp) {
                      return null;
                    }

                    const mandatoryFees = feesOfFcp.filter((fee) =>
                      get(fee, 'fee_template.is_mandatory'),
                    );
                    const optionalFees = feesOfFcp.filter(
                      (fee) => !get(fee, 'fee_template.is_mandatory'),
                    );

                    const renderFeeDataGroupByStatus = (title, fees) => {
                      if (!Array.isArray(fees) || fees.length === 0) {
                        return null;
                      }

                      const groupFeesByStatus = groupByKey(fees, 'status');
                      return (
                        <li>
                          {title}
                          <ul>
                            {Object.keys(groupFeesByStatus).map((status) => {
                              const feesWithStatus = groupFeesByStatus[status];
                              const feesWithStatusGroupByCurrencies = groupByKey(
                                feesWithStatus,
                                'fee_template.currency',
                              );

                              const renderAmountByCurrency = (title, key) => {
                                const totalInEachCurrency = Object.keys(
                                  feesWithStatusGroupByCurrencies,
                                )
                                  .map((currency) => ({
                                    currency,
                                    total: sum(
                                      feesWithStatusGroupByCurrencies[currency],
                                      (fee) => (fee && fee[key]) || 0,
                                    ),
                                  }))
                                  .filter((elem) => elem && elem.total);

                                if (totalInEachCurrency.length === 0) {
                                  return null;
                                }

                                return (
                                  <li>
                                    {totalInEachCurrency.length === 1
                                      ? [
                                          `${title} : ${formatMoneyWithCurrency(
                                            totalInEachCurrency[0].currency,
                                            totalInEachCurrency[0].total,
                                          )}
                                            `,
                                        ]
                                      : [
                                          <div>{title}</div>,
                                          <ul>
                                            {totalInEachCurrency.map((elem) => (
                                              <li>
                                                {formatMoneyWithCurrency(
                                                  elem.currency,
                                                  elem.total,
                                                )}
                                              </li>
                                            ))}
                                          </ul>,
                                        ]}
                                  </li>
                                );
                              };

                              return (
                                <li>
                                  <div>{t1(status)}</div>
                                  <ul>
                                    {renderAmountByCurrency(
                                      t1('total_amount'),
                                      'amount',
                                    )}
                                    {renderAmountByCurrency(
                                      t1('benefit_amount'),
                                      'benefit_amount',
                                    )}
                                    {renderAmountByCurrency(
                                      t1('paid_amount'),
                                      'paid_amount',
                                    )}
                                  </ul>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    };

                    return (
                      <ul>
                        {renderFeeDataGroupByStatus(
                          t1('mandatory_fees'),
                          mandatoryFees,
                        )}
                        {renderFeeDataGroupByStatus(
                          t1('optional_fees'),
                          optionalFees,
                        )}
                      </ul>
                    );
                  })()}
                </td>
                <td width={this.width.fees}>
                  <ul>
                    {item.fees &&
                      item.fees.map(
                        (fee) =>
                          fee && (
                            <li>
                              <div
                                className="truncated-text"
                                style={{ maxWidth: 300 }}
                              >
                                - {t1('name')}: {fee.name}
                              </div>
                              {get(fee, 'target_item.iid') && (
                                <div>
                                  - {t1('target_item')}:{' '}
                                  {`${t(get(fee, 'target_item.ntype'))} - ${t(
                                    get(fee, 'target_item.name'),
                                  )}`}
                                </div>
                              )}
                              <div>
                                - {t1('amount')}:{' '}
                                {formatMoneyWithCurrency(
                                  get(fee, 'fee_template.currency'),
                                  fee.amount,
                                )}
                              </div>
                              <div>
                                - {t1('start_date')}:{' '}
                                {fee.start_date &&
                                  timestampToDateString(fee.start_date)}
                              </div>
                              <div>
                                - {t1('deadline')}:{' '}
                                {fee.end_date &&
                                  timestampToDateString(fee.end_date)}
                              </div>
                              <div>
                                - {t1('status')}: {fee.status && t1(fee.status)}
                              </div>
                              <br />
                            </li>
                          ),
                      )}
                  </ul>
                </td>
                {item.startOfUser && (
                  <td
                    width={this.width.actions}
                    rowSpan={item.userRowSpan}
                    className="text-center"
                  >
                    {this.getButtonActions(item.iid)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Results);
