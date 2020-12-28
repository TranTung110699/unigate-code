import Field from 'redux-form/es/Field';
import AntdCheckBox from 'schema-form/elements/ant-checkbox';
import React from 'react';

const AntCheckbox = (props) => <Field component={AntdCheckBox} {...props} />;

export default AntCheckbox;
