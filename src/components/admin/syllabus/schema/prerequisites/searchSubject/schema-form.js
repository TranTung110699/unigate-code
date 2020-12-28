/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
import { t1 } from 'translate';
import SyllabusSearchFormDetailFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
});

const ui = () => {
  const fields = ['name'];

  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: SyllabusSearchFormDetailFreestyle,
    freestyle: 1,
  },
};
