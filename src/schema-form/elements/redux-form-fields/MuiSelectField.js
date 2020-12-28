import React from 'react';
import Field from 'redux-form/es/Field';
import MUSelectField from 'schema-form/elements/select/MUSelectField';

const SelectField = (props) => <Field component={MUSelectField} {...props} />;

export default SelectField;
