import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DisplayTable from './DisplayTable';

const Form = ({ resultTableFieldName, ...rest }) => {
  return (
    <Field
      name={resultTableFieldName || 'results'}
      component={DisplayTable}
      {...rest}
    />
  );
};

export default reduxForm({})(Form);
