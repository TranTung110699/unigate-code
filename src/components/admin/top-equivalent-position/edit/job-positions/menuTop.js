import React from 'react';
import { getUrl } from 'routes/links/common';
import ButtonNew from './new/ButtonNew';

const menu = (node) => [
  {
    button: (
      <ButtonNew searchFormId="top_equivalent_position_search" node={node} />
    ),
    href: getUrl('top_equivalent_position'),
    id: 'set_equivalent_position_for_job_position',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default menu;
