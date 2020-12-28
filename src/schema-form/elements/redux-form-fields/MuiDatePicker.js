import React from 'react';
import Field from 'redux-form/es/Field';
import MUDatePicker from 'schema-form/elements/mui-date-picker';

const DatePicker = (props) => <Field component={MUDatePicker} {...props} />;

export default DatePicker;
