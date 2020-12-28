import React from 'react';
import { t1 } from 'translate';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';
import lodashGet from 'lodash.get';

const schema = (formid, values) => ({
  level: {
    type: 'select',
    options: lodashGet(values, 'levelOptions'),
    inline: true,
    floatingLabelText: t1('organization_level'),
    floatingLabelFixed: false,
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['level'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
