import React from 'react';
import { FormSection } from 'redux-form';
import { connect } from 'react-redux';
import PenaltyInputField from './PenaltyInput';

export const Penalty = (props) => (
  <FormSection name={props.name}>
    <PenaltyInputField {...props} />
  </FormSection>
);

export default connect()(Penalty);
