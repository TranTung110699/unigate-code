import React from 'react';
import Field from 'redux-form/es/Field';
import InputDefault from 'schema-form/elements/input';

const Input = (props) => <Field component={InputDefault} {...props} />;

export default Input;
