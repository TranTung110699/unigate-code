import React from 'react';
import getLodash from 'lodash.get';
import { formatMoney } from 'common';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import PaymentGuide from './payment-guide';

const getColumns = () => [
  {
    title: t1('name'),
    key: 'id',
    render: (text, fee) =>
      getLodash(fee, 'fee_template.name') || getLodash(fee, 'name'),
  },
  {
    title: t1('amount'),
    width: '13%',
    render: (text, fee) =>
      `${formatMoney(getLodash(fee, 'amount'))} ${getLodash(
        fee,
        'fee_template.currency',
      )}`,
  },
  {
    title: t1('benefit_amount'),
    width: '13%',
    render: (text, fee) => {
      const benefitAmount = getLodash(fee, 'benefit_amount');
      if (!benefitAmount) {
        return null;
      }
      return `${formatMoney(benefitAmount)} ${getLodash(
        fee,
        'fee_template.currency',
      )}`;
    },
  },
  {
    title: t1('paid_amount'),
    width: '13%',
    render: (text, fee) => {
      const paidAmount = getLodash(fee, 'paid_amount');
      if (!paidAmount) {
        return null;
      }
      return `${formatMoney(paidAmount)} ${getLodash(
        fee,
        'fee_template.currency',
      )}`;
    },
  },
  {
    title: t1('unpaid_amount'),
    width: '13%',
    render: (text, fee) => {
      const unpaidAmount =
        getLodash(fee, 'amount', 0) -
        getLodash(fee, 'paid_amount', 0) -
        getLodash(fee, 'benefit_amount', 0);
      if (unpaidAmount > 0) {
        return `${formatMoney(unpaidAmount)} ${getLodash(
          fee,
          'fee_template.currency',
        )}`;
      }
      return null;
    },
  },
  {
    title: t1('note'),
    width: '20%',
    render: (text, fee) => {
      const benefitAmount = getLodash(fee, 'benefit_amount');
      const appliedBenefits = getLodash(fee, 'applied_benefits');
      const elStatus = (
        <p>{`${t1('status')}: ${t1(getLodash(fee, 'status'))}`}</p>
      );
      if (
        !benefitAmount ||
        !Array.isArray(appliedBenefits) ||
        !appliedBenefits.length
      ) {
        return elStatus;
      }
      return [
        <p>{elStatus}</p>,
        <p>{t1('applied_benefits')}:</p>,
        appliedBenefits.map((benefit) => {
          const name = getLodash(benefit, 'name');
          if (!name) {
            return null;
          }
          return <li className="m-l-5">- {name}</li>;
        }),
      ];
    },
  },
];

const feeResult = ({ items }) => {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return (
    <div className="pending-fees-wrapper">
      <AntdTable
        columns={getColumns()}
        dataSource={items}
        bordered
        pagination={false}
        size="middle"
      />
      <PaymentGuide />
    </div>
  );
};

export default feeResult;
