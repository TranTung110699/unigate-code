import React from 'react';
import { t1 } from 'translate';
import LayoutFreestyle from './LayoutFreestyle';
import DatePicker from 'schema-form/elements/date-picker';

const schema = () => {
  const date = new Date();
  const endTimestamp = date.getTime() / 1000;
  date.setMonth(date.getMonth() - 1);
  const startTimestamp = date.getTime() / 1000;

  return {
    start_date: {
      type: DatePicker,
      fullWidth: true,
      container: 'inline',
      defaultValue: startTimestamp,
      floatingLabelText: t1('start_date'),
    },
    end_date: {
      type: DatePicker,
      defaultValue: endTimestamp,
      fullWidth: true,
      container: 'inline',
      floatingLabelText: t1('end_date'),
    },
  };
};

const ui = () => [
  {
    id: 'id',
    fields: ['start_date', 'end_date'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
  },
};
