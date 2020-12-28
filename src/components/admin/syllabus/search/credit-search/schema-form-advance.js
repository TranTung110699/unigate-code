/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from '../schema-form';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    name: {
      type: Search,
      schema: searchFormSchema(props),
      recapSchema: searchRecapFormSchema(props),
    },
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
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
