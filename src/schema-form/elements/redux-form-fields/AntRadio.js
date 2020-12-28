import React from 'react';
import Field from 'redux-form/es/Field';
import AntdRadio from 'schema-form/elements/ant-radio';

const AntRadio = (props) => <Field component={AntdRadio} {...props} />;

export default AntRadio;
