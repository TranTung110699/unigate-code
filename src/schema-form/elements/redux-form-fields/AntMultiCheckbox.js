import React from 'react';
import Field from 'redux-form/es/Field';
import AntMultiCheckboxElement from 'schema-form/elements/ant-multi-checkbox';

const AntMultiCheckbox = (props) => (
  <Field component={AntMultiCheckboxElement} {...props} />
);

export default AntMultiCheckbox;
