import React from 'react';
import { getUrl } from 'routes/links/common';
import { searchFormId } from '../../common';
import ButtonNew from '../../new/ButtonNew';

const menu = () => [
  {
    button: <ButtonNew searchFormId={searchFormId} />,
    href: getUrl('survey'),
    id: 'survey',
    type: 'modal',
    floatRight: true,
    icon: 'plus',
  },
];

export default menu;
