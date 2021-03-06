import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';
import { t1 } from 'translate';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    name: {
      type: Search,
      schema: searchFormSchema,
      recapSchema: searchRecapFormSchema,
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
      fields: ['name'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
