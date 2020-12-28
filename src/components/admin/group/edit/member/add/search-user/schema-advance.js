import React from 'react';
import Search from 'schema-form/elements/advance-search';
import { searchFormSchema, searchRecapFormSchema } from './schema';
import { t1 } from 'translate';

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  return {
    text: {
      type: Search,
      schema: searchFormSchema(props),
      recapSchema: searchRecapFormSchema(props),
      labelText: t1('user_name,_email,_id_or_code...'),
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
      fields: ['text'],
    },
  ];
};

export default {
  schema,
  ui,
  isAdvanceSearch: true,
};
