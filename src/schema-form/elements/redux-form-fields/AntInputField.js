import React from 'react';
import Field from 'redux-form/es/Field';
import AntInput from 'schema-form/elements/ant-input';

const AntInputField = (props) => <Field component={AntInput} {...props} />;

export default AntInputField;
