import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const contest = () => [
  {
    component: <ButtonNew />,
    href: getUrl('contest'),
    id: 'new_contest',
    type: 'modal',
    label: t1('new_contest'),
    floatRight: true,
    icon: 'plus',
  },
];

export default contest;
