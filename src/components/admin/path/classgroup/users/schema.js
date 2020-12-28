import React from 'react';
import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import { feeStatusFilterOptions } from 'configs/constants';

const schema = (formid, values) => ({
  q: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: `${t1('name')}/ ${t1('email')}`,
    hintText: t1('input_query'),
  },
  financial_status: {
    type: 'radio',
    fullWidth: true,
    floatingLabelText: t1('financial_status'),
    hintText: t1('financial_status'),
    label: t1('financial_status'),
    options: feeStatusFilterOptions(),
    inline: true,
  },
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['q', 'financial_status'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
