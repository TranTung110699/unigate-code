import React from 'react';
import { t1 } from 'translate';
import { normalizeDateTime } from 'common/normalizers';
import { commonFormLayouts } from 'schema-form/constants';
import DatePicker from 'schema-form/elements/date-picker';

const schema = (formid, values) => ({
  contract__start_time: {
    type: DatePicker,
    hintText: t1('from_date'),
    floatingLabelText: t1('from_date'),
    normalize: normalizeDateTime,
    container: 'inline',
    errorText: '',
  },
  contract__end_time: {
    type: DatePicker,
    hintText: t1('to_date'),
    container: 'inline',
    floatingLabelText: t1('to_date'),
    normalize: normalizeDateTime,
    errorText: '',
  },
  contract__code: {
    type: 'text',
    floatingLabelText: t1('contract_code'),
    hintText: t1('contract_code'),
    defaultValue: '',
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'col1',
      fields: ['contract__start_time'],
    },
    {
      id: 'col2',
      fields: ['contract__end_time'],
    },
    {
      id: 'col3',
      fields: ['contract__code'],
    },
  ];
};

const contractSchema = { schema, ui, layout: commonFormLayouts.THREE_COLS };

export default {
  type: 'section',
  schema: contractSchema,
};
