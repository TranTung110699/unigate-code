import React from 'react';
import { t1 } from 'translate';
import SurveyWidget from './widget/survey-report';

export const getWidgets = (node) => {
  return [
    ...(node.type !== 'syllabus_exam'
      ? [
          {
            id: 'survey_report',
            label: t1('survey_report'),
            component: (props) => <SurveyWidget {...props} node={node} />,
            minWidth: 11,
            minHeight: 4,
          },
        ]
      : []),
  ];
};
