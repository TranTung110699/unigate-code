import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../../new/ButtonNew';

const feeCategory = () => [
  {
    button: <ButtonNew />,
    href: getUrl('fee-categories'),
    id: 'new_fee_category',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default feeCategory;
