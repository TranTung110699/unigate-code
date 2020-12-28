import React from 'react';
import ButtonNewEnrolmentPlan from '../new/enrolment-plan';
import { createSelector } from 'reselect';
import { getUrl } from 'routes/links/common';

const menus = createSelector(
  (state, props) => props && props.node,
  (node) => [
    {
      button: <ButtonNewEnrolmentPlan node={node} />,
      href: getUrl('sales_package'),
      id: 'add_enrolment_plan',
      type: 'modal',
      floatRight: true,
      icon: 'plus',
    },
  ],
);

export default menus;
