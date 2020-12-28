import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from 'components/admin/translate/new/ButtonNew';

/**
 * Created by DVN on 8/22/2017.
 */
const translation = () => [
  {
    component: <ButtonNew />,
    href: getUrl('translate', { rootUrl: '/system' }),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default translation;
