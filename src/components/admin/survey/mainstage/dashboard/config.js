import React from 'react';
import { t1 } from 'translate';
import SurveyStatistics from './widget/survey-statistics';

const configs = () => [
  {
    id: 'survey_statistics',
    label: t1('survey_report'),
    component: (props) => <SurveyStatistics {...props} />,
    minWidth: 12,
    minHeight: 12,
  },
];

export const getWidgets = () => {
  const widgets = configs();
  return widgets;
};
