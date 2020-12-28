import React from 'react';
import { t1 } from 'translate';
import { dateGreaterThan, required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import DatePicker from 'schema-form/elements/date-picker';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values) => {
  return {
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      defaultValue: '',
      errorText: '',
      classWrapper: 'col-md-6',
      fullWidth: true,
      validate: [required(t1('name_cannot_be_empty'))],
    },
    code: {
      type: 'text',
      hintText: t1('enter_code'),
      classWrapper: 'col-md-6',
      floatingLabelText: t1('fee_collection_phase_code'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1('code_cannot_be_empty'))],
      normalize: slugifier,
    },
    start_date: {
      type: DatePicker,
      floatingLabelText: t1('start_date'),
      fullWidth: true,
      classWrapper: 'col-md-6',
      validate: [required(t1('start_date_must_not_be_empty'))],
    },
    end_date: {
      type: DatePicker,
      floatingLabelText: t1('end_date'),
      fullWidth: true,
      classWrapper: 'col-md-6',
      validate: [
        dateGreaterThan(
          values.start_date,
          t1('end_time_must_be_after_start_time'),
        ),
      ],
    },
    description: {
      type: RTE,
      classWrapper: 'col-md-12',
      hintText: t1('description'),
      floatingLabelText: t1('description'),
      defaultValue: '',
      errorText: '',
      multiLine: true,
      rows: 4,
      fullWidth: true,
    },
  };
};

const ui = (step) => {
  const fields = ['name', 'code', 'start_date', 'end_date', 'description'];
  return [
    {
      id: 'default',
      title: t1(`${step}_fee_collecting_phase`),
      fields,
    },
  ];
};

export default { schema, ui };
