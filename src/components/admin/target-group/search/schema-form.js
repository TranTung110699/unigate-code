import React from 'react';
import { t1 } from 'translate';
import { constants } from 'configs/constants';
// import SearchFormLayout from './SearchFormLayout';
// import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    // defaultValue: 'name',
    floatingLabelFixed: false,
    errorText: '',
    fullWidth: true,
  },
  status: {
    type: 'multiCheckbox',
    options: constants.StatusOptions(),
    defaultValue: ['approved', 'queued'],
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
});

const ui = (step, values) => {
  // return [
  //   {
  //     id: 'name',
  //     fields: ['name'],
  //   },
  //   {
  //     id: 'status',
  //     fields: ['status'],
  //   }
  // ];
  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields: ['name', 'status'],
    },
  ];
};

export default { schema, ui }; //, layout: { component: SearchFormLayoutFreestyle, freestyle: 1 } };
// export default { schema, ui, layout: SearchFormLayout };
// , freestyle: SearchFormDetailLayout };
