import { t1 } from 'translate';
import routes from 'routes';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';

export const allMenuItems = (node = {}) => [
  {
    icon: {
      position: 'left',
      type: 'dashboard',
    },
    id: 'dashboard',
    title: t1('dashboard'),
    url: routes.url('node_edit', Object.assign(node, { step: 'dashboard' })),
  },
  {
    icon: {
      position: 'left',
      type: 'info-circle',
    },
    id: 'information',
    title: t1('information'),
    url: routes.url('node_edit', Object.assign(node, { step: 'information' })),
  },
  {
    icon: {
      position: 'left',
      type: 'bank',
    },
    id: 'bank',
    title: t1('bank'),
    url: routes.url('node_edit', Object.assign(node, { step: 'bank' })),
  },
];

export const menuItems = (node) => {
  const menuIdsAvailable = ['dashboard', 'information', 'bank'];
  return allMenuItems(node);
};
