import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import routes from 'routes';

const SALES_PACKAGE = 'sales-package';

export const menuItems = (node) => [
  {
    id: 'dashboard',
    url: routes.url('node_edit', {
      ntype: SALES_PACKAGE,
      iid: lodashGet(node, 'iid'),
      step: 'dashboard',
    }),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: 'information',
    url: routes.url('node_edit', {
      ntype: SALES_PACKAGE,
      iid: lodashGet(node, 'iid'),
      step: 'info',
    }),
    title: t1('information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
  {
    id: 'enrolment_plans',
    url: routes.url('node_edit', {
      ntype: SALES_PACKAGE,
      iid: lodashGet(node, 'iid'),
      step: 'enrolment-plans',
    }),
    title: t1('enrolment_plans'),
    icon: {
      position: 'left',
      type: 'schedule',
    },
  },
  {
    id: 'buyer',
    url: routes.url('node_edit', {
      ntype: SALES_PACKAGE,
      iid: lodashGet(node, 'iid'),
      step: 'buyer',
    }),
    title: t1('buyer'),
  },
];
