import React from 'react';
import { getUrl } from 'routes/links/common';
import { t2 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const room = () => [
  {
    id: 'list_room',
    href: getUrl('rooms'),
    label: t2('rooms'),
    icon: 'home',
    type: 'dynamic',
    action: 'rooms',
  },
  {
    component: <ButtonNew />,
    href: getUrl('rooms'),
    id: 'new_room',
    type: 'modal',
    label: t2('new_room'),
    floatRight: true,
    icon: 'plus',
  },
];

export default room;
