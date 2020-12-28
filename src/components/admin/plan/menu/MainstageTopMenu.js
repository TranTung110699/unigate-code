import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1, t2 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const plan = () => [
  {
    id: 'plan',
    href: getUrl('plan'),
    label: t2('plans'),
    icon: 'home',
  },
  {
    component: <ButtonNew />,
    href: getUrl('plan'),
    id: 'new_course',
    type: 'modal',
    label: t1('new_incoming_class'),
    floatRight: true,
    icon: 'recharge',
  },
];

export default plan;
