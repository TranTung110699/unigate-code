import React from 'react';
import Survey from 'components/learn/items/survey';

const TakeSurvey = ({ surveyIid }) => {
  if (!surveyIid) {
    return null;
  }

  return <Survey surveyIid={surveyIid} displayMaxHeight={Infinity} />;
};

export default TakeSurvey;
