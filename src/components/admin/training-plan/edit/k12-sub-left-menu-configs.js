import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import routes from 'routes';

export const menuItems = (node) => [
  {
    url: routes.url('node_edit', {
      ntype: 'training_plan',
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
    url: routes.url('node_edit', {
      ntype: 'training_plan',
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
    url: routes.url('node_edit', {
      ntype: 'training_plan',
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
    url: routes.url('node_edit', {
      ntype: 'training_plan',
      iid: lodashGet(node, 'iid'),
      step: 'members',
    }),
    title: t1('training_plan_members'),
    icon: {
      position: 'left',
      type: 'team',
    },
  },
  {
    id: 'edit_curriculum',
    divider: true,
  },
  // {
  //   url: routes.url(
  //     'node_edit',
  //     Object.assign({
  //       ntype: 'training_plan',
  //       iid: lodashGet(node, 'iid'),
  //       step: 'credit-overall-progress',
  //     }),
  //   ),
  //   title: t1('training_plan_credit_overall_progress'),
  //   icon: {
  //     position: 'left',
  //     type: 'star',
  //   },
  // },
];
