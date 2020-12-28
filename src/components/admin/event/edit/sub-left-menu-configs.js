import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';

const allMenuItems = (node) => [
  {
    id: 'information',
    title: t1('information'),
    open: true,
    subMenu: [
      {
        id: 'information',
        url: getSubMenuLink('event', node, 'information'),
        title: t1('information'),
        icon: {
          position: 'left',
          type: 'info-circle',
        },
      },
      {
        id: 'blogs',
        url: getSubMenuLink('event', node, 'blogs'),
        title: t1('blogs'),
        icon: {
          position: 'left',
          type: 'file',
        },
      },
    ],
  },
];

export const menuItems = (node) => {
  const menuIdsAvailable = ['information', 'blogs'];

  return filterMenusAvailableForSubLeftMenuV2(
    allMenuItems(node),
    menuIdsAvailable,
  );
};
