import React from 'react';
import lodashGet from 'lodash.get';
import routes from 'routes';
import { t1 } from 'translate';

export const menuItems = (node) => [
  {
    icon: {
      position: 'left',
      type: 'dashboard',
    },
    id: 'dashboard',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'semester',
        iid: lodashGet(node, 'iid'),
        step: 'dashboard',
      }),
    ),
    title: t1('dashboard'),
  },
  {
    icon: {
      position: 'left',
      type: 'dashboard',
    },
    id: 'basic',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'semester',
        iid: lodashGet(node, 'iid'),
        step: 'edit',
      }),
    ),
    title: t1('edit_information'),
  },
];
