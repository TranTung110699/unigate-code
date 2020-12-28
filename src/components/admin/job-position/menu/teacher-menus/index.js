import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from '../../new/ButtonNew';

const menu = () => [
  {
    button: <ButtonNew />,
    href: getUrl('job-position'),
    id: 'new_job_position',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default menu;
