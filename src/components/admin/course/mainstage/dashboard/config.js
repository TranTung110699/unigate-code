import React from 'react';
import { t1 } from 'translate';
import EnrolmentPlanWidget from './widget/enrolment-plan';
import SurveyWidget from './widget/survey-report';
import StationeryWidget from './widget/stationery-report';
import lodashGet from 'lodash.get';
import { isNotEmptyArray } from 'common/utils/Array';

export const getWidgets = ({ node, enableAsset }) => {
  const widgets = [
    /*
    {
      id: 'useful_link',
      label: t1('useful_links'),
      component: (props) => <UsefulLinksWidget {...props} />,
      minWidth: 4,
      minHeight: 4,
    },
*/
    ...(isNotEmptyArray(lodashGet(node, 'enrolment_plans'))
      ? [
          {
            id: 'enrolment_plan_info',
            label: t1('enrolment_plan_info'),
            component: (props) => (
              <EnrolmentPlanWidget {...props} node={node} />
            ),
            minWidth: 2,
            minHeight: 2,
          },
        ]
      : []),
    {
      id: 'survey_statistics',
      label: t1('survey_report'),
      component: (props) => <SurveyWidget {...props} />,
      minWidth: 8,
      minHeight: 4,
    },
    ...(enableAsset
      ? [
          {
            id: 'stationery_report',
            label: t1('stationery_report'),
            component: (props) => <StationeryWidget {...props} />,
            minWidth: 6,
            minHeight: 4,
          },
        ]
      : []),
  ];
  return widgets;
};
