import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const semester = () => [
  {
    component: <ButtonNew />,
    href: getUrl('semesters'),
    id: 'new_semester',
    type: 'modal',
    label: t1('new_incoming_class'),
    floatRight: true,
    icon: 'recharge',
  },
];

export default semester;
