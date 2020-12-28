import React from 'react';
import { t1 } from 'translate';
import { feeStatuses, feeStatusOptions } from 'configs/constants';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = () => ({
  status: {
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('status'),
    options: feeStatusOptions().filter(({ value }) =>
      [feeStatuses.NEW, feeStatuses.POSTPONE_DEADLINE].includes(value),
    ),
  },
  fee_collecting_phase: {
    type: 'select',
    floatingLabelText: t1('fee_collecting_phase'),
    options: 'async',
    multiple: true,
    paramsasync: {
      __url__: '/fcp/api/get-fee-collection-phase-options',
    },
    fullWidth: true,
  },
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['status', 'fee_collecting_phase'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
