import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const ico = () => [
  {
    component: <ButtonNew />,
    href: getUrl('icos'),
    id: 'new_course',
    type: 'modal',
    label: t1('new_incoming_class'),
    floatRight: true,
    icon: 'recharge',
  },
];

export default ico;
