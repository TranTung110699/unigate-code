import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../new/ButtonNew';

export default () => [
  {
    component: <ButtonNew />,
    href: getUrl('event'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];
