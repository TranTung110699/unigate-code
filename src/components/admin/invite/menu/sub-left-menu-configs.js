import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

export const menuItems = () => [
  {
    url: getUrl('invite/dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    url: getUrl('invite/invited'),
    title: t1('active_enrolments'),
    icon: {
      position: 'left',
      type: 'usergroup-add',
    },
  },
  // {
  //   url: getUrl('invite/plan'),
  //   title: t1('planned_enrolments'),
  //   icon: {
  //     position: 'left',
  //     type: 'usergroup-add',
  //   },
  // },
];
