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
        ntype: 'bus',
        iid: lodashGet(node, 'iid'),
        step: 'dashboard',
      }),
    ),
    title: t1('dashboard'),
  },
  {
    icon: {
      position: 'left',
      type: 'info-circle',
    },
    id: 'info',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'group',
        iid: lodashGet(node, 'group'),
        step: 'attendance',
      }),
    ),
    title: t1('attendance'),
  },
  {
    icon: {
      position: 'left',
      type: 'info-circle',
    },
    id: 'students',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'group',
        iid: lodashGet(node, 'group'),
        step: 'members',
      }),
    ),
    title: t1('current_members'),
  },
];
