import React from 'react';
import Field from 'redux-form/es/Field';
import MultiCheckboxElement from 'schema-form/elements/multi-checkbox';

const MultiCheckbox = (props) => (
  <Field component={MultiCheckboxElement} {...props} />
);

export default MultiCheckbox;
