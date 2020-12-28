import { t2 } from 'translate';
import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../new/ButtonNew';

const assetCategory = () => [
  {
    component: <ButtonNew />,
    href: getUrl('asset-category/new'),
    id: 'new_asset_category',
    label: t2('new_asset_category'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default assetCategory;
