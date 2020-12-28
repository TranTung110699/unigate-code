import React from 'react';
import isEqual from 'lodash.isequal';
import get from 'lodash.get';
import { amount_in_numbers_to_words, formatMoney } from 'common';
import fetchData from 'components/common/fetchData';
import AcademyInfo from 'components/admin/financial/mainstage/invoices/AcademyInfo';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import { invoiceTypes } from 'configs/constants';
import { t1 } from 'translate';

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

const LayoutFreestyle = (props) => {
  const { layoutOptionsProperties, submitButton, calculateFees } = props;

  const fieldNames = get(props, 'groups.default.fieldNames');
  if (!fieldNames) {
    return null;
  }

  const typeCreate = get(props, 'formValues.type');

  return (
    <div>
      <Paper style={stylePaper}>
        <Title title={t1('basic_information')} />
        <div className="clearfix">
          <div className="col-md-12">
            <AcademyInfo
              userIid={
                layoutOptionsProperties &&
                layoutOptionsProperties.user &&
                layoutOptionsProperties.user.iid
              }
            />
            {get(fieldNames, 'campus') && (
              <div className="m-t-10">
                <div>Thu Ngân / Cashier: 123123123</div>
                {get(fieldNames, 'campus')}
              </div>
            )}
          </div>
        </div>
      </Paper>
      <Paper style={stylePaper}>
        <Title title={t1('fees')} />
        <div className="clearfix">{fieldNames.fees}</div>
      </Paper>
      <Paper style={stylePaper}>
        <Title title={t1('others_benefit')} />
        <div className="clearfix">
          <div>{fieldNames['others_benefit']}</div>
        </div>
      </Paper>

      {typeCreate !== invoiceTypes.AUTOMATICALLY_PAYMENT_BY_WALLET && (
        <Paper style={stylePaper}>
          <Title title={t1('payment_information')} />
          <div className="clearfix">
            <div>{fieldNames.type}</div>
            <div>{fieldNames.wallet_type_iid}</div>
            <div>{fieldNames.payer__name}</div>
            <div>{fieldNames.payer__phone}</div>
            <div>{fieldNames.note}</div>
          </div>
        </Paper>
      )}
      <div>
        {calculateFees && calculateFees.totalAmountGroupByCurrency && (
          <h3 className="m-t-30">
            {t1('total_amount_to_pay:')} &nbsp;
            {Object.keys(calculateFees.totalAmountGroupByCurrency).map(
              (currency) =>
                `${formatMoney(
                  calculateFees.totalAmountGroupByCurrency[currency],
                )} ${currency} (${t1(
                  amount_in_numbers_to_words(
                    calculateFees.totalAmountGroupByCurrency[currency],
                  ),
                )} ${currency})`,
            )}
          </h3>
        )}
      </div>
      <div className="text-center">{submitButton}</div>
    </div>
  );
};

export default fetchData((props) => ({
  baseUrl: '/fee/api/calculate-fees-with-applied-benefits',
  fetchCondition: (() => {
    const fees = get(props, 'formValues.fees');
    return Array.isArray(fees) && fees.length;
  })(),
  refetchCondition: (prevProps) => {
    const currentFees = get(props, 'formValues.fees');
    const prevFees = get(prevProps, 'formValues.fees');
    if (!isEqual(currentFees, prevFees)) {
      return true;
    }

    const currentOthersBenefit = get(
      props,
      'formValues.others_benefit.benefits',
      [],
    )
      .map(({ amount, currency }) => amount && currency && { amount, currency })
      .filter(Boolean);
    const prevOthersBenefit = get(
      prevProps,
      'formValues.others_benefit.benefits',
      [],
    )
      .map(({ amount, currency }) => amount && currency && { amount, currency })
      .filter(Boolean);
    if (!isEqual(currentOthersBenefit, prevOthersBenefit)) {
      return true;
    }

    return false;
  },
  params: props && props.formValues,
  method: 'post',
  propKey: 'calculateFees',
}))(LayoutFreestyle);
