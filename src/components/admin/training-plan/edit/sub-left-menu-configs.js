import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import routes from 'routes';

export const menuItems = (node) => [
  {
    id: 'dashboard',
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
    id: 'information',
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
    id: 'enrolment_plans',
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
    id: 'training_plan_members',
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
  // {
  //   url: routes.url('node_edit', {
  //     ntype: 'training_plan',
  //     iid: lodashGet(node, 'iid'),
  //     step: 'users-by-organization',
  //   }),
  //   title: t1('training_plan_members_by_organization'),
  //   icon: {
  //     position: 'left',
  //     type: 'cluster',
  //   },
  // },
  {
    id: 'report',
    url: routes.url(
      'node_edit',
      Object.assign({
        ntype: 'training_plan',
        iid: lodashGet(node, 'iid'),
        step: 'report',
      }),
    ),
    title: t1('report'),
    icon: {
      position: 'left',
      type: 'star',
    },
  },
];
