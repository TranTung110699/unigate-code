import get from 'lodash.get';

import routes from 'routes';
import { t1 } from 'translate';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';
import { filterMenusByEnabledMenusFromSchoolConfiguration } from 'utils/Util';
import { reportUrl } from '../routes';

export const allMenuItems = (node = {}) => [
  /*
  {
    icon: {
      position: 'left',
      type: 'team',
    },
    url: reportUrl(node, 'report-spent-time'),
    id: 'report-spent-time',
    title: `${t1('report_spent_time')}`,
    description: t1('description_report_spent_time'),
  },
  */
  {
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
    id: 'report-total-contestants-by-point-spectrum',
    title: t1('report_total_contestants_by_point_spectrum'),
    url: reportUrl(node, 'report-total-contestants-by-point-spectrum'),
    description: t1('description_report_total_contestants_by_point_spectrum'),
  },
];

const filterMenusByConfiguration = (node, conf, defaultMenus) => {
  const enabledMenus = get(conf, 'available_contest_menus') || [];

  return filterMenusByEnabledMenusFromSchoolConfiguration(
    node,
    defaultMenus,
    enabledMenus,
  );
};

const getMenuIdsAvailable = (node, conf) => {
  const defaultMenus = [
    'report-spent-time',
    'report-total-contestants-by-point-spectrum',
  ];

  return filterMenusByConfiguration(node, conf, defaultMenus);
};

export const menuItems = (node, conf) => {
  const menuIdsAvailable = getMenuIdsAvailable(node, conf);

  return filterMenusAvailableForSubLeftMenuV2(
    allMenuItems(node),
    menuIdsAvailable,
  );
};
