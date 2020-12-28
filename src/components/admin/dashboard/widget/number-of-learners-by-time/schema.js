import React from 'react';
import LayoutFreestyle from './LayoutFreestyle';
import { required } from 'common/validators';
import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';

const schema = (formid, values) => {
  const endTodayTimestamp = new Date().setHours(23, 59, 59, 999) / 1000;

  return {
    from_date: {
      type: DatePicker,
      getStartDate: true,
      fullWidth: true,
      floatingLabelText: t1('from_date'),
      maxDate: Math.min(values.to_date || Infinity, endTodayTimestamp),
      validate: [required()],
    },
    to_date: {
      type: DatePicker,
      getEndDate: true,
      fullWidth: true,
      floatingLabelText: t1('to_date'),
      validate: [required()],
      minDate: values.from_date,
      maxDate: endTodayTimestamp,
    },
  };
};

const ui = () => [
  {
    id: 'default',
    fields: ['from_date', 'to_date'],
  },
];

const layout = {
  component: LayoutFreestyle,
  freestyle: 1,
};

export default {
  schema,
  ui,
  layout,
};
