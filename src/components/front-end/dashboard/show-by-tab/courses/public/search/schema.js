/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Search from 'schema-form/elements/advance-search';
import {
  searchFormSchema,
  searchRecapFormSchema,
} from './advance-search-schema';
import SearchFormLayoutFreeStyle from './SearchFormLayoutFreestyle';

const schema = () => {
  return {
    q: {
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
      fields: ['q'],
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    freestyle: 1,
    component: SearchFormLayoutFreeStyle,
  },
};
