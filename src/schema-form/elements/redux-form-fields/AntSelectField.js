import React from 'react';
import Field from 'redux-form/es/Field';
import AntdSelectField from 'schema-form/elements/select/AntdSelectField.js';

const AntSelectField = (props) => (
  <Field component={AntdSelectField} {...props} />
);

export default AntSelectField;
