import get from 'lodash.get';
import { timeUnitOptions, timeUnits } from 'configs/constants/time';

import { t1, t2 } from 'translate';
import { commonFormLayouts } from 'schema-form/constants';

const schema = (formid, values) => ({
  unit: {
    type: 'select',
    floatingLabelText: t1('unit'),
    options: timeUnitOptions(),
    defaultValue: timeUnits.YEAR,
  },
  min: {
    type: 'number',
    floatingLabelText: t1('from'),
    // floatingLabelFixed: true,
    min: 0,
    max: get(values, 'experience.max', 100),
  },
  max: {
    type: 'number',
    floatingLabelText: t1('to'),
    // floatingLabelFixed: true,
    min: get(values, 'experience.min', 0),
    max: 100,
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
  {
    id: 'col3',
    fields: ['unit'],
  },
];

const yearRange = {
  schema,
  ui,
  layout: commonFormLayouts.THREE_COLS,
};

const experience = () => ({
  type: 'section',
  schema: yearRange,
  floatingLabelText: t2('experience_year(s)'),
});

export default experience;
