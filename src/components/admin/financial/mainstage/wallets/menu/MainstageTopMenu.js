import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import BtnNewType from '../type/new/ButtonTypeNew';

const walletsMenu = () => [
  {
    id: 'wallet-types-menu',
    href: getUrl('financial/wallets/type'),
    label: t1('wallet_types'),
  },
  {
    component: <BtnNewType />,
    href: getUrl('new_type'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default walletsMenu;
