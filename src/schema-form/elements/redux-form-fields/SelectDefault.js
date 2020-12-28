import React from 'react';
import Field from 'redux-form/es/Field';
import SelectDefault from 'schema-form/elements/select';

const Select = (props) => <Field component={SelectDefault} {...props} />;

export default Select;
