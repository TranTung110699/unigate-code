import React from 'react';
import { FormSection } from 'redux-form';
import { connect } from 'react-redux';
import ExpiryInputField from './ExpiryInput';

export const Expiry = (props) => (
  <FormSection name={props.name}>
    <ExpiryInputField {...props} />
  </FormSection>
);

export default connect()(Expiry);
