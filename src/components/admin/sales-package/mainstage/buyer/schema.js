import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { t1 } from 'translate';

const schema = () => {
  return {
    key: {
      type: Search,
      labelText: t1('search_by_name_or_phone'),
    },
  };
};
const ui = () => {
  return [
    {
      id: 'id',
      fields: ['key'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
