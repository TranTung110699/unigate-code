import { t2 } from 'translate';
import React from 'react';
import { getUrl } from 'routes/links/common';
import CommonButton from '../button/CommonButton';

const stationery = () => [
  {
    component: <CommonButton formid="check_inventory" step="check" />,
    href: getUrl('asset/check-inventory'),
    id: 'check-inventory',
    label: t2('check_inventory'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default stationery;
