import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNewEnrolmentPlan from 'components/admin/enrolment-plan/new/ButtonNew';
import { getSearchFormId } from 'components/admin/training-plan/mainstage/enrolment-plans/common';
import { createSelector } from 'reselect';

const menus = createSelector(
  (state, props) => props && props.node,
  (node) => [
    {
      button: (
        <ButtonNewEnrolmentPlan
          searchFormId={getSearchFormId(node)}
          trainingPlan={node}
        />
      ),
      href: getUrl('training-plans'),
      id: 'new_training_plan',
      type: 'modal',
      floatRight: true,
      icon: 'plus',
    },
  ],
);

export default menus;
