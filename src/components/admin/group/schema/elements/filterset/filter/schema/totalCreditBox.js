import React from 'react';
import { t1 } from 'translate';
import { text, totalCreditCompareCondition } from '../query/text';
import { commonFormLayouts } from 'schema-form/constants';

const schema = () => ({
  total_credit_compare_condition: totalCreditCompareCondition(),
  total_credit: text(t1('total_credit')),
});

const ui = () => {
  return [
    {
      id: 'col1',
      fields: ['total_credit_compare_condition'],
    },
    {
      id: 'col2',
      fields: ['total_credit'],
    },
  ];
};

const totalCreditSchema = { schema, ui, layout: commonFormLayouts.TWO_COLS };

export default {
  type: 'section',
  schema: totalCreditSchema,
};
