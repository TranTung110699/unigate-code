import React from 'react';
import Search from 'schema-form/elements/advance-search';

const schema = () => {
  return {
    text: {
      type: Search,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['text'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
