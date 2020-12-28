import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import ButtonNew from '../new/ButtonBenefitNew';

export default () => [
  {
    button: <ButtonNew label={t1('new_benefit')} />,
    href: getUrl('benefit'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];
