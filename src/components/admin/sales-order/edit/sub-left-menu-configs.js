import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import routes from 'routes';

export const menuItems = (node) => [
  {
    id: 'dashboard',
    url: routes.url('node_edit', {
      ntype: 'sales-order',
      iid: lodashGet(node, 'iid'),
      step: 'dashboard',
    }),
    title: t1('dashboard'),
  },
  {
    id: 'status',
    url: routes.url('node_edit', {
      ntype: 'sales-order',
      iid: lodashGet(node, 'iid'),
      step: 'status',
    }),
    title: `${t1('status')} ${
      node.order_status
        ? `(${t1(lodashGet(node, 'order_status', '').toLowerCase())})`
        : ''
    }`,
  },
];
