import { t1 } from '../../../../translate';
import React from 'react';

const schema = () => ({
  iid: {
    type: 'text',
    floatingLabelText: t1('iid'),
    fullWidth: true,
    hintText: t1('enter_iid'),
  },
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    fullWidth: true,
    hintText: t1('enter_name'),
  },
});

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['iid', 'name'],
    },
  ];
};

const FormFreeStyle = ({ groups, submitButton }) => (
  <div className="p-20">
    <div className="row">
      <div className="col-md-6">{groups.default.fieldNames.iid}</div>
      <div className="col-md-6">{groups.default.fieldNames.name}</div>
    </div>
    <div className="row">
      <div className="text-center">{submitButton}</div>
    </div>
  </div>
);

export default {
  schema,
  ui,
  layout: {
    component: FormFreeStyle,
    freestyle: 1,
  },
};
