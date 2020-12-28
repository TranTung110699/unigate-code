import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const tp = (node) => [
  {
    component: <ButtonNew semester={node.iid} />,
    id: 'new_semester_training_plan',
    type: 'modal',
    label: t1('new_semester_training_plan'),
    floatRight: true,
    icon: 'recharge',
  },
];

export default tp;
