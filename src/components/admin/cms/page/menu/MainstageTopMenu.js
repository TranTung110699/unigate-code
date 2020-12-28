import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const page = () => [
  {
    id: 'list_page',
    href: getUrl('page'),
    label: t1('page_list'),
  },
  {
    component: <ButtonNew />,
    href: getUrl('page'),
    id: 'new_page',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default page;
