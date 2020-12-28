import React from 'react';
import { t1 } from 'translate';
import { required } from 'common/validators';
import { feeStatuses } from 'configs/constants';

const schema = ({ formid, values }, { fees = [] }) => {
  const status = values && values.status;
  const optionsIds =
    Array.isArray(fees) &&
    fees
      .filter((fee) => {
        if (status === 'cancelled') {
          return [feeStatuses.POSTPONE_DEADLINE, feeStatuses.NEW].includes(
            fee && fee.status,
          );
        }
        return true;
      })
      .map((fee) => {
        const label = (
          <div>
            {fee && fee.name}
            {fee && fee.status && `(${t1('status')}: ${t1(fee.status)})`}
          </div>
        );
        return {
          name: fee && fee.name,
          value: fee && fee.id,
          label,
          primaryText: label,
        };
      });

  return {
    id: {
      type: 'multiCheckbox',
      options: optionsIds,
      fullWidth: true,
      defaultValue:
        Array.isArray(optionsIds) && optionsIds.map((fee) => fee && fee.value),
      floatingLabelText: t1('choose_fee_to_cancellation'),
      floatingLabelFixed: false,
      validate: [required(t1('fees_is_required'))],
    },
  };
};

const ui = ({ hiddenFields = {}, title = '' }) => {
  const fields = ['id'];
  return [
    {
      id: 'default',
      title,
      fields: fields.filter(
        (field) => !Object.keys(hiddenFields).includes(field),
      ),
    },
  ];
};

const getSchema = ({ hiddenFields = {}, fees = [], title = '' }) => ({
  schema: (formid, values) =>
    schema({ formid, values }, { fees, hiddenFields }),
  ui: () => ui({ hiddenFields, title }),
});
export default getSchema;
