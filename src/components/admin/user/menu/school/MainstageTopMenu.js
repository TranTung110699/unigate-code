import React from 'react';
import { t2 } from 'translate';
import { getUrl } from 'routes/links/common';
import DynamicMenu from '../DynamicMenu';
import ButtonNew from '../../new/ButtonNew';

export const buttonNew = [
  {
    component: <ButtonNew />,
    href: getUrl('users'),
    id: 'new_user',
    type: 'modal',
    label: t2('new_user'),
    floatRight: true,
    icon: 'plus',
  },
];

const user = () => DynamicMenu(buttonNew);

export default user;
