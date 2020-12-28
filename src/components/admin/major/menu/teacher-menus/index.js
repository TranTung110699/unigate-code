import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../../new/ButtonNew';

const major = [
  {
    button: <ButtonNew />,
    href: getUrl('major'),
    id: 'new_major',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default major;
