import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';

const schema = () => {
  return {
    name: {
      type: Search,
      schema: searchFormSchema,
      recapSchema: searchRecapFormSchema,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['name'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
