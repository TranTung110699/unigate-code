import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';

export const menuItems = (node) => [
  {
    url: getSubMenuLink('fcp', node, 'applied-fees'),
    title: t1('applied_fees '),
    icon: {
      position: 'left',
      type: 'dollar',
    },
  },
  {
    url: getSubMenuLink('fcp', node, 'update'),
    title: t1('information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
];
