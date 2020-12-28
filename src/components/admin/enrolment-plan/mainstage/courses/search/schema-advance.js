import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    text: {
      type: Search,
      schema: searchFormSchema(),
      recapSchema: searchRecapFormSchema(),
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['text'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
