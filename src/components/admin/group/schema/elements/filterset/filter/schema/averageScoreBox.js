import React from 'react';
import { t1 } from 'translate';
import { averageScoreCompareCondition, text } from '../query/text';
import { commonFormLayouts } from 'schema-form/constants';

const schema = () => ({
  average_score_compare_condition: averageScoreCompareCondition(),
  average_score: text(t1('average_score')),
});

const ui = () => {
  return [
    {
      id: 'col1',
      fields: ['average_score_compare_condition'],
    },
    {
      id: 'col2',
      fields: ['average_score'],
    },
  ];
};

const averageScoreSchema = { schema, ui, layout: commonFormLayouts.TWO_COLS };

export default {
  type: 'section',
  schema: averageScoreSchema,
};
