import React from 'react';
import TakeSurvey from './take-survey';
import lodashGet from 'lodash.get';

const TemisTdtx = ({ match }) => {
  const surveyIid = lodashGet(match, 'params.survey_iid');

  return <TakeSurvey surveyIid={surveyIid} />;
};

export default TemisTdtx;
