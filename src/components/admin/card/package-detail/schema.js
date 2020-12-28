import { t1 } from '../../../../translate';
import React from 'react';
import { constants } from '../../../../configs/constants';

const schema = () => ({
  status: {
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('status'),
    options: constants.StatusSearchCard(),
    defaultValue: [],
  },
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['status'],
    },
  ];
};

export default {
  schema,
  ui,
};
