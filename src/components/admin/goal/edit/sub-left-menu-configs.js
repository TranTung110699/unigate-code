import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';

export const menuItems = (node) => [
  {
    url: getSubMenuLink('goal', node, 'dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    url: getSubMenuLink('goal', node, 'info'),
    title: t1('information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
  {
    url: getSubMenuLink('goal', node, 'children'),
    title: t1('children'),
    icon: {
      position: 'left',
      type: 'trophy',
    },
  },
  {
    url: getSubMenuLink('goal', node, 'rubric'),
    title: t1('rubric'),
    icon: {
      position: 'left',
      type: 'table',
    },
  },
];
