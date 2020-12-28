import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../new/ButtonNew';

const menu = () => [
  {
    button: <ButtonNew searchFormId="top_equivalent_position_search" />,
    href: getUrl('top_equivalent_position'),
    id: 'new_equivalent_position',
    type: 'modal',
    floatRight: true,
    icon: 'attach',
  },
];

export default menu;
