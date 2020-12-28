import React from 'react';
import SurveyReportQuestion from './Question';

const ReportAsChart = ({
  questions,
  surveyIid,
  trainingPlan,
  paramsToFilter,
}) => {
  if (!Array.isArray(questions) || !questions.length) {
    return null;
  }

  return questions.map((question, index) => {
    return (
      <SurveyReportQuestion
        index={index}
        item={question}
        surveyIid={surveyIid}
        key={`srq-${index}_${question.id}`}
        trainingPlan={trainingPlan}
        paramsToFilter={paramsToFilter}
      />
    );
  });
};

export default ReportAsChart;
