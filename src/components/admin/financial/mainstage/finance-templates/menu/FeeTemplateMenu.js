import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../new/ButtonFinanceTemplateNew';

export default () => [
  {
    button: <ButtonNew />,
    href: getUrl('finance_template'),
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];
