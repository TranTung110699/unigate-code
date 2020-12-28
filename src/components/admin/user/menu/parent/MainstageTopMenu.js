import React from 'react';
import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import ParentButtonNew from '../../new/ParentButtonNew';

const unique = () => [
  {
    component: <ParentButtonNew />,
    href: getUrl('school/parents'),
    id: 'add_parent',
    type: 'modal',
    label: t1('add_parent'),
    floatRight: true,
    icon: 'plus',
  },
];

export default unique;
