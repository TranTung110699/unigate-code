import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import { layouts, schoolTypes } from 'configs/constants';
import getCourseMenus, {
  filterMenuByAvailableMenu,
} from 'components/front-end/dashboard/show-by-tab/left-menu/configs-v2';
import getAccountMenuItems from './account';
import getStudentMenuItems from './student';
import getTeacherMenuItems from './teacher';
import getParentMenuItems from './parent';

import getMenuReport from './report';

const commonItems = ({ node, step, mode }) => {
  return [
    {
      action: 'view',
      id: 'view',
      url: getUrl('node_edit', { ...node, ntype: mode, step: 'view' }),
      title: t1(`${mode}_overview`),
      icon: {
        position: 'left',
        type: 'eye',
      },
    },
    {
      action: 'info',
      id: 'info',
      url: getUrl('node_edit', { ...node, ntype: mode, step: 'info' }),
      title: t1(`${mode}_info`),
      icon: {
        position: 'left',
        type: 'edit',
      },
    },
  ];
};

export const menuItems = ({
  node,
  roleUser: mode,
  conf,
  themeConfig,
  domainInfo,
}) => {
  const schoolType = themeConfig.type;
  const layout = themeConfig.layout;

  let menuItemsByRole;

  const params = {
    node,
    mode,
    layout,
    conf,
    domainInfo,
    schoolType,
  };

  if (mode === 'teacher') menuItemsByRole = getTeacherMenuItems(params);
  else if (mode === 'student') {
    menuItemsByRole = getStudentMenuItems(params);
  } else if (mode === 'user') {
    menuItemsByRole = getAccountMenuItems(params);
  } else if (mode === 'user') {
    menuItemsByRole = getParentMenuItems(params);
  }

  let items = commonItems({ node, mode });

  if (Array.isArray(menuItemsByRole) && menuItemsByRole.length)
    items = items.concat(menuItemsByRole);
  else if (
    menuItemsByRole &&
    menuItemsByRole.subMenu &&
    Array.isArray(menuItemsByRole.subMenu) &&
    menuItemsByRole.subMenu.length
  )
    items = items.concat([menuItemsByRole]);

  return items;
};
