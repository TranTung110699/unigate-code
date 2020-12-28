import React from 'react';
import ButtonNew from '../../mainstage/survey-result/credit-syllabus-survey-result/new/ButtonNew';
import { createSelector } from 'reselect';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

const menu = createSelector(
  (state, props) => props && props.node,
  (node) => {
    return [
      {
        button: <ButtonNew node={node} />,
        id: 'enrolment_plan_new_credit_syllabus_survey_result',
        type: 'modal',
        floatRight: true,
        icon: 'plus',
      },
    ];
  },
);

export default menu;
