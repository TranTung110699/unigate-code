import get from 'lodash.get';

import { t1 } from 'translate';
import { commonFormLayouts } from 'schema-form/constants';

// ==== ageRange schema form STARTs ======
const schema = (formid, values) => ({
  min: {
    type: 'number',
    floatingLabelText: t1('from_age'),
    floatingLabelFixed: true,
    min: 3,
    max: get(values, 'age.max', 70),
  },
  max: {
    type: 'number',
    floatingLabelText: t1('to_age'),
    floatingLabelFixed: true,
    min: get(values, 'age.min', 3),
    max: 70,
  },
});

const ui = () => [
  {
    id: 'col1',
    fields: ['min'],
  },
  {
    id: 'col2',
    fields: ['max'],
  },
];

const ageRange = {
  schema,
  ui,
  layout: commonFormLayouts.TWO_COLS,
};
// ==== ageRange schema form ENDs ======

const age = () => ({
  type: 'section',
  schema: ageRange,
  floatingLabelText: t1('age'),
  // options: constants.sexOptions,
});

export default age;
