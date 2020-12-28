import React from 'react';
import get from 'lodash.get';
import SearchForm from './SearchForm';

const LearningStatusOfGVCC = ({ trainingPlan }) => (
  <SearchForm
    formid="learning_status_of_GVCC"
    hiddenFields={{ training_plan_iid: get(trainingPlan, 'iid') }}
  />
);

export default LearningStatusOfGVCC;
