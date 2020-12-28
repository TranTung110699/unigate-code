import React from 'react';
import Field from 'redux-form/es/Field';
import Text from 'schema-form/elements/text';

const TextField = (props) => <Field component={Text} {...props} />;

export default TextField;
