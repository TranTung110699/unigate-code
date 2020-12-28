import React from 'react';
import { getUrl } from 'routes/links/common';
import { t1, t2 } from 'translate';
import ButtonNew from '../new/ButtonNew';

const program = () => [
  {
    component: (
      <ButtonNew type="program" step="program" label={t2('new_program')} />
    ),
    href: getUrl('program'),
    id: 'new_program',
    type: 'modal',
    label: t1('new_program'),
    floatRight: true,
    icon: 'plus',
  },
];

export default program;
