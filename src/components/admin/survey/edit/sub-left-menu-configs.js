import React from 'react';
import lodashGet from 'lodash.get';
import routes from 'routes';
import { t1 } from 'translate';
import ApproveToggle from '../common/approve-toggle';

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
        ntype: 'survey',
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
        ntype: 'survey',
        iid: lodashGet(node, 'iid'),
        step: 'info',
      }),
    ),
    title: t1('information'),
  },
  ...(!lodashGet(node, 'is_global_survey')
    ? [
        {
          icon: {
            position: 'left',
            type: 'ordered-list',
          },
          id: 'applied_items',
          url: routes.url(
            'node_edit',
            Object.assign({
              ntype: 'survey',
              iid: lodashGet(node, 'iid'),
              step: 'applied-items',
            }),
          ),
          title: t1('applied_items'),
        },
      ]
    : []),
  {
    icon: {
      position: 'left',
      type: 'question-circle',
    },
    id: 'questions',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'survey',
        iid: lodashGet(node, 'iid'),
        step: 'children',
      }),
    ),
    title: `${t1('questions')} (${
      Array.isArray(lodashGet(node, 'children'))
        ? lodashGet(node, 'children').length
        : '0'
    })`,
  },
  {
    icon: {
      position: 'left',
      type: 'eye',
    },
    id: 'preview',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'survey',
        iid: lodashGet(node, 'iid'),
        step: 'preview',
      }),
    ),
    title: t1('preview'),
  },
];
