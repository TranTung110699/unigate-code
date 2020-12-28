import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const template = () => [
  /*  {
    id: 'list_template',
    href: getUrl('templates'),
    label: t1('templates'),
    icon: 'paper',
  },
*/
  {
    component: <ButtonNew />,
    href: getUrl('templates'),
    id: 'new_template',
    type: 'modal',
    label: t1('new_template'),
    floatRight: true,
    icon: 'plus',
  },
];

export default template;
