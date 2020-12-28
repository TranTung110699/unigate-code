/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';
import { t1 } from 'translate';

const schema = () => {
  return {
    name: {
      type: Search,
      schema: searchFormSchema,
      recapSchema: searchRecapFormSchema,
      labelText: t1('enter_iid,_name_or_code'),
    },
    is_root_rubric: {
      type: 'checkbox',
      label: t1('is_root_rubric'),
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['name', 'is_root_rubric'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
