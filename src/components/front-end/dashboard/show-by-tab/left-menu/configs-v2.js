import { t1 } from 'translate';
import { getDashboardUrl, getUrl } from 'routes/links/common';
import userLinks from 'routes/links/user';

export const filterMenuByAvailableMenu = (itemMenus, availableMenus) => {
  if (!availableMenus || !Array.isArray(itemMenus)) return itemMenus;

  const result = [];
  itemMenus.forEach((menu) => {
    if (!menu) return;

    if (!menu.subMenu) {
      if (availableMenus.includes(menu.id)) {
        result.push(menu);
      }
    } else if (Array.isArray(menu.subMenu) && menu.subMenu.length) {
      const children = filterMenuByAvailableMenu(menu.subMenu, availableMenus);
      if (children.length) {
        result.push({ ...menu, children });
      }
    }
  });
  return result;
};

export const learningMenuItems = (availableMenus, node, mode, step) => {
  const learningItems = {
    id: 'course',
    title: t1('course'),
    navLabel: t1('courses'),
    type: 'label',
    menuLevel: 'menu-lv1',
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
    subMenu: [
      {
        id: 'timetable',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'timetable',
            })
          : getDashboardUrl('timetable'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
        title: t1('timetable'),
        hidden: node,
      },
      {
        id: 'progress-reports',
        action: 'progress-reports',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'progress-reports',
            })
          : getDashboardUrl('progress-reports'),
        title: t1('progress_reports'),
        navLabel: t1('progress_reports'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'overview-courses',
        action: 'overview-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'overview-courses',
            })
          : getDashboardUrl('overview-courses'),
        title: t1('overview'),
        navLabel: t1('overview_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'in-progress-courses',
        action: 'in-progress-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'in-progress-courses',
            })
          : getDashboardUrl('in-progress-courses'),
        title: t1('learning'),
        navLabel: t1('learning_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'compulsory-courses',
        action: 'compulsory-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'compulsory-courses',
            })
          : getDashboardUrl('compulsory-courses'),
        title: t1('compulsory_courses'),
        navLabel: t1('compulsory_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'assigned-courses',
        action: 'assigned-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'assigned-courses',
            })
          : getDashboardUrl('assigned-courses'),
        title: t1('waiting_courses'),
        navLabel: t1('waiting_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'completed-courses',
        action: 'completed-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'completed-courses',
            })
          : getDashboardUrl('completed-courses'),
        title: t1('completed'),
        navLabel: t1('completed_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'failed-courses',
        action: 'failed-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'failed-courses',
            })
          : getDashboardUrl('failed-courses'),
        title: t1('failed_courses'),
        navLabel: t1('failed_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'rejected-courses',
        action: 'rejected-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'rejected-courses',
            })
          : getDashboardUrl('rejected-courses'),
        title: t1('rejected'),
        navLabel: t1('rejected_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'public-courses',
        action: 'public-courses',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'public-courses',
            })
          : getDashboardUrl('public-courses'),
        title: t1('public'),
        navLabel: t1('public_courses'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        action: 'unlock-path',
        id: 'unlock-path',
        url: getUrl('node_edit', {
          ...node,
          ntype: mode,
          step: 'unlock-path',
        }),
        title: t1('unlock_path'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
        hidden: !node,
      },
    ],
  };

  return learningItems;

  // return filterMenuByAvailableMenu(availableMenus, [learningItems]);
};

export const contestMenuItems = (availableMenus, node, mode, step) => {
  const contestItems = {
    id: 'online-testing',
    menuLevel: 'menu-lv1',
    action: 'online-testing',
    title: t1('online_testing'),
    navLabel: t1('online_testing'),
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
    subMenu: [
      {
        id: 'upcoming-contests',
        action: 'upcoming-contests',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'upcoming-contests',
            })
          : getDashboardUrl('upcoming-contests'),
        title: t1('upcoming_contests'),
        navLabel: t1('upcoming_contests'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
      {
        id: 'taken-contests',
        action: 'taken-contests',
        url: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'taken-contests',
            })
          : getDashboardUrl('taken-contests'),
        title: t1('taken_contests'),
        navLabel: t1('taken_contests'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
      },
    ],
  };

  return contestItems;
  // return filterMenuByAvailableMenu(availableMenus, [contestItems]);
};

export const profileMenuItems = (availableMenus, node, mode, step) => {
  // Profile menu
  const profileItems = {
    id: 'profile',
    title: t1('profile'),
    navLabel: t1('profile'),
    menuLevel: 'menu-lv1',
    type: 'label',
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
    subMenu: [
      {
        id: 'update-info',
        url: userLinks.update_profile_info,
        title: t1('basic_info'),
        navLabel: t1('basic_info'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
        hidden: node,
      },
      {
        id: 'update-avatar',
        url: userLinks.update_profile_avatar,
        title: t1('avatar'),
        navLabel: t1('avatar'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
        hidden: node,
      },
      {
        id: 'change-password',
        url: userLinks.update_password,
        title: t1('change_password'),
        navLabel: t1('change_password'),
        icon: {
          position: 'left',
          type: 'arrow-right',
        },
        hidden: node,
      },
    ],
  };

  return profileItems;
  // return filterMenuByAvailableMenu(availableMenus, [profileItems]);
};

const getCourseMenus = (availableMenus, node, mode, step) => {
  let menus = [];

  const courseObj = learningMenuItems(availableMenus, node, mode, step);

  // Online Testing menu
  const onlineTestingObj = contestMenuItems(availableMenus, node, mode, step);

  const profileObj = profileMenuItems(availableMenus, node, mode, step);

  // Goal menu
  const goalObj = {
    id: 'goals',
    menuLevel: 'menu-lv1',
    action: 'user-goal',
    url: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'user-goal' })
      : '/dashboard/goals',
    title: t1('goals'),
    navLabel: t1('goals'),
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
  };

  // Skill menu
  const skillObj = {
    id: 'my-skills',
    menuLevel: 'menu-lv1',
    action: 'my-skills',
    url: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'my-skills' })
      : getDashboardUrl('my-skills'),
    title: t1('my_skills'),
    navLabel: t1('my_skills'),
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
  };

  // Path menu
  const pathObj = {
    id: 'my-paths',
    menuLevel: 'menu-lv1',
    action: 'my-paths',
    url: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'my-paths' })
      : getDashboardUrl('my-paths'),
    title: t1('learning_path'),
    navLabel: t1('learning_path'),
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
  };

  // Notification menu
  const notificationsObj = {
    id: 'notifications',
    menuLevel: 'menu-lv1',
    action: 'notifications',
    url: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'notifications' })
      : getDashboardUrl('notifications'),
    title: t1('notifications'),
    navLabel: t1('notifications'),
    icon: {
      position: 'left',
      type: 'arrow-right',
    },
  };

  if (step !== 'dashboard') {
    if ((!availableMenus || availableMenus.length === 0) && !node) return null;
  }

  if (node) {
    menus = [courseObj, onlineTestingObj, profileObj];
  } else if (step !== 'profile') {
    menus = [courseObj, onlineTestingObj, notificationsObj];
  } else {
    menus.push(profileObj);
  }

  return filterMenuByAvailableMenu(menus, availableMenus);
};

export default getCourseMenus;
