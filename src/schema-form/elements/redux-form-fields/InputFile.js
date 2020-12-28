import React from 'react';
import Field from 'redux-form/es/Field';
import MyInputFile from 'schema-form/elements/input-file';

const InputFile = (props) => <Field component={MyInputFile} {...props} />;

export default InputFile;
