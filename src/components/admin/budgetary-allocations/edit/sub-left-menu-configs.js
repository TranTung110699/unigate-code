import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';

export const menuItems = (node) => [
  {
    id: 'dashboard',
    title: t1('dashboard'),
    url: getSubMenuLink('budgetary-allocations', node, 'dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: 'info',
    label: t1('information'),
    url: getSubMenuLink('budgetary-allocations', node, 'dashboard'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
];
