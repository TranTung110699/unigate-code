import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const budgetary = () => [
  {
    component: <ButtonNew step="get" />,
    href: getUrl('budgetary'),
    id: 'new_cost',
    type: 'modal',
    label: t1('new_cost'),
    floatRight: true,
    icon: 'recharge',
    step: 'get',
  },
  {
    component: <ButtonNew step="import" />,
    href: getUrl('budgetary'),
    id: 'import',
    type: 'modal',
    label: t1('import'),
    floatRight: true,
    icon: 'recharge',
    step: 'import',
  },
];

export default budgetary;
