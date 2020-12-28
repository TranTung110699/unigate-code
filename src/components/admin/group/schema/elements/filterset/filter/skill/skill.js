import React from 'react';
import { t1 } from 'translate/index';
import { constants } from 'configs/constants';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import { commonFormLayouts } from 'schema-form/constants';

const schema = (formid, values) => ({
  iid: {
    type: 'select',
    floatingLabelText: t1('skill'),
    floatingLabelFixed: true,
    fullWidth: true,
    options: 'async',
    paramsasync: {
      valueKey: 'iid',
      __url__: getFormSchemaConfigs('skill', formid),
    },
  },
  op: {
    type: 'select',
    fullWidth: true,
    floatingLabelText: t1('being'),
    floatingLabelFixed: true,
    options: constants.BeingOptions(),
  },
  level: {
    type: 'select',
    options: 'async',
    floatingLabelText: t1('levels'),
    floatingLabelFixed: true,
    fullWidth: true,
    // options: levels,
  },
});

const ui = (step, values) => {
  return [
    {
      id: 'col1',
      fields: ['iid'],
    },
    {
      id: 'col2',
      fields: ['op'],
    },
    {
      id: 'col3',
      fields: ['level'],
    },
  ];
};

const skillSchema = { schema, ui, layout: commonFormLayouts.THREE_COLS };

export default {
  type: 'section',
  schema: skillSchema,
};
// export default { schema, ui };
// , freestyle: SearchFormDetailLayout };
