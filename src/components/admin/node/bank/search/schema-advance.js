import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';
import { t1 } from 'translate';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    q: {
      type: Search,
      schema: searchFormSchema,
      recapSchema: searchRecapFormSchema,
      labelText: t1('name_or_id_or_iid'),
      floatingLabelText: t1('name_or_id_or_iid'),
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
      fields: ['q'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
