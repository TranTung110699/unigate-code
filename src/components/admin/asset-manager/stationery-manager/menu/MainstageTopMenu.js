import { t2 } from 'translate';
import React from 'react';
import { getUrl } from 'routes/links/common';
import CommonButton from '../button/CommonButton';

const stationery = () => [
  {
    component: <CommonButton formid="import_stationery" step="import" />,
    href: getUrl('asset/import-stationery'),
    id: 'import-stationery',
    label: t2('import_stationery'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default stationery;
