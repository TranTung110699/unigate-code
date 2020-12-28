import React from 'react';
import Field from 'redux-form/es/Field';
import MURadio from 'schema-form/elements/radio/index.js';

const Radio = (props) => <Field component={MURadio} {...props} />;

export default Radio;
