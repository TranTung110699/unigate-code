import React from 'react';
import { t1 } from 'translate';
import LayoutFreestyle from './LayoutFreestyle';
import DatePicker from 'schema-form/elements/date-picker';

const currentTimestamp = new Date().getTime() / 1000;

const schema = () => {
  return {
    text: {
      type: 'text',
      floatingLabelText: t1('name_or_id_or_iid_of_user'),
      fullWidth: true,
      label: t1('search_by_name_or_iid'),
      hintText: t1('please_type_search_text'),
    },
    start_date: {
      type: DatePicker,
      fullWidth: true,
      container: 'inline',
      defaultValue: currentTimestamp,
      floatingLabelText: t1('start_date'),
    },
    end_date: {
      type: DatePicker,
      defaultValue: currentTimestamp,
      fullWidth: true,
      container: 'inline',
      floatingLabelText: t1('end_date'),
    },
  };
};

const ui = () => [
  {
    id: 'id',
    fields: ['text', 'start_date', 'end_date'],
  },
];

export default (wrapperProps) => ({
  schema,
  ui,
  layout: {
    component: (props) => <LayoutFreestyle {...wrapperProps} {...props} />,
    freestyle: 1,
  },
});
