import React from 'react';

import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

import ButtonNew from '../new/ButtonNew';

const messageTemplates = () => [
  {
    component: <ButtonNew />,
    href: getUrl('message-templates'),
    id: 'new_message_template',
    type: 'modal',
    label: t1('new_message_template'),
    floatRight: true,
    icon: 'plus',
  },
];

export default messageTemplates;
