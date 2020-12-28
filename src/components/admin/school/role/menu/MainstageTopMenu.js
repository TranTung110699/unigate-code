import React from 'react';
import { getUrl } from 'routes/links/common';
import { t2 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const role = () => [
  {
    id: 'list_blog',
    href: getUrl('roles'),
    label: t2('role'),
  },
  {
    component: <ButtonNew />,
    href: getUrl('roles'),
    id: 'new_role',
    type: 'modal',
    label: t2('new_role'),
    floatRight: true,
    icon: 'plus',
  },
];

export default role;
