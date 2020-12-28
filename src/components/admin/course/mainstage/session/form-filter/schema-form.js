import React from 'react';
import { t1 } from 'translate';
import LayoutFreestyle from './LayoutFreestyle';

const schema = () => {
  return {
    q: {
      type: 'text',
      floatingLabelText: t1('name_or_id_or_iid_of_user'),
      fullWidth: true,
      label: t1('search_by_name_or_iid'),
      hintText: t1('please_type_search_text'),
    },
  };
};

const ui = () => [
  {
    id: 'id',
    fields: ['q'],
  },
];

export default (optionsProperties) => ({
  schema,
  ui,
  layout: {
    component: LayoutFreestyle,
    optionsProperties,
    freestyle: 1,
  },
});
