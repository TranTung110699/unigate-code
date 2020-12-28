import React from 'react';
import { invoiceTypes } from 'configs/constants';
import ButtonNew from 'components/admin/financial/mainstage/invoices/new/ButtonNew';

const deposit = () => [
  {
    component: <ButtonNew type={invoiceTypes.DEPOSIT} />,
    id: 'new_deposit',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default deposit;
