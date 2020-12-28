import React from 'react';
import { t1 } from 'translate';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './advance';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    key: {
      type: Search,
      schema: searchFormSchema(props),
      recapSchema: searchRecapFormSchema(props),
      labelText: t1('name'),
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
      fields: ['key'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
