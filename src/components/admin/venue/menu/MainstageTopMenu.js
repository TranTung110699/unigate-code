import { t2 } from 'translate';
import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../new/ButtonNew';

const venue = () => [
  {
    component: <ButtonNew />,
    href: getUrl('venue/new'),
    id: 'new_venue',
    label: t2('new_venue'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default venue;
