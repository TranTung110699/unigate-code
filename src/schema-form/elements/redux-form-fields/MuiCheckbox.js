import React from 'react';
import Field from 'redux-form/es/Field';
import MUCheckBox from 'schema-form/elements/checkbox';

const Checkbox = (props) => <Field component={MUCheckBox} {...props} />;

export default Checkbox;
