import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';

export const menuItems = (node) => [
  {
    url: getSubMenuLink('fee-category', node, 'dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    url: getSubMenuLink('fee-category', node, 'info'),
    title: t1('information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
  {
    url: getSubMenuLink('fee-category', node, 'children'),
    title: t1('sub_category'),
    icon: {
      position: 'left',
      type: 'tags',
    },
  },
];
