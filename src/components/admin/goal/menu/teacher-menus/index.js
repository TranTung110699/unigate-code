import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../../new/ButtonNew';

const menu = () => [
  {
    button: <ButtonNew />,
    href: getUrl('goal'),
    id: 'new_goal',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default menu;
