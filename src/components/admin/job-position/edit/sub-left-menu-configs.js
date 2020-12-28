import get from 'lodash.get';
import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';
import { filterMenusByEnabledMenusFromSchoolConfiguration } from 'utils/Util';

export const allMenuItems = (node) => [
  {
    id: 'dashboard',
    url: getSubMenuLink('job-position', node, 'dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: 'info',
    url: getSubMenuLink('job-position', node, 'info'),
    title: t1('information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
  {
    id: 'skills',
    url: getSubMenuLink('job-position', node, 'skills'),
    title: t1('skills'),
    icon: {
      position: 'left',
      type: 'shopping',
    },
  },
  // {
  //   id: 'children',
  //   url: getSubMenuLink('job-position', node, 'children'),
  //   title: t1('children'),
  //   icon: {
  //     position: 'left',
  //     type: 'shopping',
  //   },
  // },
];

const filterMenusByConfiguration = (node, conf, defaultMenus) => {
  const enabledMenus = get(conf, 'available_job_position_menus') || [];

  return filterMenusByEnabledMenusFromSchoolConfiguration(
    node,
    defaultMenus,
    enabledMenus,
  );
};

const getMenuIdsAvailable = (node, conf) => {
  const defaultMenus = ['dashboard', 'info', 'skills'];

  return filterMenusByConfiguration(node, conf, defaultMenus);
};

export const menuItems = ({ node, conf }) => {
  const menuIdsAvailable = getMenuIdsAvailable(node, conf);

  return filterMenusAvailableForSubLeftMenuV2(
    allMenuItems(node),
    menuIdsAvailable,
  );
};
