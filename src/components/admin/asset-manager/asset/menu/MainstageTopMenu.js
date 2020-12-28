import { t2 } from 'translate';
import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../new/ButtonNew';

const asset = () => [
  {
    component: <ButtonNew />,
    href: getUrl('asset/new'),
    id: 'new_asset',
    label: t2('new_asset'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default asset;
