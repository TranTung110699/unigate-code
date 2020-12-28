import React from 'react';
import ButtonNew from '../new/ButtonNew';

const menu = (orgId) => [
  /*
    {
      href: getUrl('group'),
      id: 'group-list',
      label: t2(`manage_${(node && node.type) || 'manage_user_groups'}`),
    },
*/
  {
    component: (
      <ButtonNew type="user_group" formid="category-user_group" orgId={orgId} />
    ),
  },
];

export default menu;
