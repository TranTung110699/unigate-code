import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';

const getFormValuesFromProps = (props) => {
  const { formValues, xpath } = props;
  const fee = (formValues && get(formValues, xpath)) || {};
  const userIid = formValues && formValues.student_iid;
  return {
    fee,
    userIid,
  };
};

const LayoutFreestyle = (props) => {
  const { creditTransferts, groups } = props;
  const fieldNames =
    (groups && groups.default && groups.default.fieldNames) || {};
  const { fee } = getFormValuesFromProps(props);

  if (!fee) {
    return null;
  }

  const feeTemplate = fee.fee_template || {};

  return (
    <div className="col-md-12">
      <div className="col-md-4">
        {t1('information')}
        <ul>
          <li>
            {t1('name')} : {feeTemplate.name}
          </li>
          <li>
            {t1('type')} : {t1(feeTemplate.template_type)}
          </li>
          <li>
            {t1('amount')} : {fee.amount} {feeTemplate.currency}
          </li>
        </ul>
      </div>
      <div className="col-md-4">{fieldNames.applied_benefit_iids}</div>
      <div className="col-md-4">{fieldNames.credit_transfert}</div>
    </div>
  );
};

export default LayoutFreestyle;
