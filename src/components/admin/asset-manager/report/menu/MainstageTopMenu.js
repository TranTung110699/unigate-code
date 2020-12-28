import { t2 } from 'translate';
import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonExport from '../button/ButtonExport';

const exportMenu = () => [
  {
    component: <ButtonExport />,
    href: getUrl('asset/report-future-projection'),
    id: 'export',
    label: t2('export'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default exportMenu;
