import { t1 } from 'translate';
import React from 'react';
import { constants } from '../../../../configs/constants';

const schema = () => ({
  package_iid: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('package_iid'),
    hintText: t1('enter_package_iid'),
  },
  package_name: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('package_name'),
    hintText: t1('enter_package_name'),
  },
  seri: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('seri'),
    hintText: t1('enter_seri'),
  },
  pin: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('pin'),
    hintText: t1('enter_pin'),
  },
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
      fields: ['package_iid', 'package_name', 'seri', 'pin', 'status'],
    },
  ];
};

const FormFreeStyle = ({ groups, submitButton }) => (
  <div className="p-20">
    <div className="row">
      <div className="col-md-3">{groups.default.fieldNames.package_iid}</div>
      <div className="col-md-3">{groups.default.fieldNames.package_name}</div>
      <div className="col-md-3">{groups.default.fieldNames.seri}</div>
      <div className="col-md-3">{groups.default.fieldNames.pin}</div>
    </div>
    <div className="row">
      <div className="col-md-12">{groups.default.fieldNames.status}</div>
    </div>
    <div className="text-center">{submitButton}</div>
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
