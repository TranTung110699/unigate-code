import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../../new/ButtonNew';

const department = () => [
  {
    button: <ButtonNew />,
    href: getUrl('training-plans'),
    id: 'new_training_plan',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default department;
