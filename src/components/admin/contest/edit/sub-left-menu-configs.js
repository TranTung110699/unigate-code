import get from 'lodash.get';

import routes from 'routes';
import { t1 } from 'translate';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';
import { filterMenusByEnabledMenusFromSchoolConfiguration } from 'utils/Util';
import { isContestSharedFromAncestorOrganizations } from 'components/admin/contest/common';

export const allMenuItems = (node = {}) => {
  const isSharedFromAncestorOrganizations = isContestSharedFromAncestorOrganizations(
    node,
  );

  return [
    {
      icon: {
        position: 'left',
        type: 'dashboard',
      },
      id: 'dashboard',
      title: t1('dashboard'),
      url: routes.url('node_edit', {
        ...node,
        step: 'dashboard',
      }),
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      icon: {
        position: 'left',
        type: 'info-circle',
      },
      id: 'information',
      title: t1('information'),
      url: routes.url('node_edit', {
        ...node,
        step: 'information',
      }),
      hidden: isSharedFromAncestorOrganizations,
    },

    {
      icon: {
        position: 'left',
        type: 'team',
      },
      id: 'contestants',
      title: `${t1('contestants')} (${get(node, 'counter.contestants') || 0})`,
      url: routes.url('node_edit', {
        ...node,
        step: 'contestants',
      }),
      hidden: isSharedFromAncestorOrganizations,
    },
    // title: t1('contest_activities'),
    // open: true,
    // subMenu: [
    {
      icon: {
        position: 'left',
        type: 'block',
      },
      id: 'exam-rounds',
      title: `${t1('exam_store_and_papers')} (${
        node && node.number_exam_rounds ? node.number_exam_rounds : 0
      })`,
      url: routes.url('node_edit', {
        ...node,
        step: 'exam-rounds',
      }),
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      icon: {
        position: 'left',
        type: 'calendar',
      },
      id: 'exam-shifts',
      title: `${t1('exam_shifts')} (${
        node && node.number_exam_shifts ? node.number_exam_shifts : 0
      })`,
      url: routes.url('node_edit', {
        ...node,
        step: 'exam-shifts',
      }),
      hidden: isSharedFromAncestorOrganizations,
    },
    // {
    //   icon: {
    //     position: 'left',
    //     type: 'schedule',
    //   },
    //   id: 'arrange-exam-shift',
    //   title: t1('arrange_exam_shift'),
    //   url: routes.url('node_edit', {
    //     ...node,
    //     step: 'arrange-exam-shift',
    //   }),
    // },
    // {
    //   icon: {
    //     position: 'left',
    //     type: 'user-add',
    //   },
    //   id: 'invite',
    //   title: t1('invite'),
    //   url: routes.url('node_edit', {
    //     ...node,
    //     step: 'invite',
    //   }),
    // },
    //   ],
    // },
    // title: t1('academic'),
    // open: true,
    // subMenu: [
    // {
    //   icon: {
    //     position: 'left',
    //     type: 'bar-chart',
    //   },
    //   id: 'exam-stores',
    //   title: t1('exam_stores'),
    //   url: editExamStoreOfContest(node),
    // },
    {
      icon: {
        position: 'left',
        type: 'team',
      },
      url: routes.url('node_edit', {
        ...node,
        step: 'reports',
      }),
      id: 'reports',
      title: `${t1('reports')}`,
      hidden: isSharedFromAncestorOrganizations,
    },
    {
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
      id: 'exam-result',
      title: t1('exam_results'),
      url: routes.url('node_edit', {
        ...node,
        step: 'exam-result',
      }),
    },
    // ],
    // },
  ];
};

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
    'dashboard',
    'information',
    'contestants',
    'collaborators',
    'invite',
    'exam-shifts',
    'exam-result',
    'report-spent-time',
    'report-total-contestants-by-point-spectrum',
    'reports',
    'arrange-exam-shift',
    'roles',
    'staff',
    'exam-rounds',
    // 'exam-stores',
  ];

  defaultMenus.push('exam-rounds');

  return filterMenusByConfiguration(node, conf, defaultMenus);
};

export const menuItems = (node, conf) => {
  const menuIdsAvailable = getMenuIdsAvailable(node, conf);

  return filterMenusAvailableForSubLeftMenuV2(
    allMenuItems(node),
    menuIdsAvailable,
  );
};
