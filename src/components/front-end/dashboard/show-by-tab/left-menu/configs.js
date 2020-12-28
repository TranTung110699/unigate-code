import React from 'react';
import { t1 } from 'translate';
import { getDashboardUrl, getUrl } from 'routes/links/common';
import userLinks from 'routes/links/user';
import Icon from 'components/common/Icon';
import { editProfile } from 'components/temis/routes';
import lodashGet from 'lodash.get';

const style = {
  icon: { top: 4 },
};
const iconStyle = {
  majors: { top: 4 },
  preview: { top: 4 },
  unlockPath: { top: 3 },
};
const filterMenuByAvailableMenu = (itemMenus, availableMenus) => {
  if (!availableMenus || !Array.isArray(itemMenus)) return itemMenus;

  const result = [];
  itemMenus.forEach((menu) => {
    if (!menu) return;

    if (!menu.children) {
      if (availableMenus.includes(menu.id)) {
        result.push(menu);
      }
    } else if (Array.isArray(menu.children) && menu.children.length) {
      const children = filterMenuByAvailableMenu(menu.children, availableMenus);
      if (children.length) {
        result.push({ ...menu, children });
      }
    }
  });
  return result;
};

export default function(
  availableMenus,
  node,
  mode,
  step,
  user = {},
  iconStyle = {},
) {
  let menus = [];
  const courseObj = {
    id: 'course',
    label: t1('course'),
    navLabel: t1('courses'),
    type: 'label',
    menuLevel: 'menu-lv1',
    icon: <Icon icon="course" style={style.icon} />,
    children: [
      // moved to top menu configs
      // {
      //   icon: <Icon icon="dashboard" style={style.icon} />,
      //   id: 'progress-reports',
      //   action: 'progress-reports',
      //   href: node
      //     ? getUrl('node_edit', {
      //         ...node,
      //         ntype: mode,
      //         step: 'progress-reports',
      //       })
      //     : getDashboardUrl('progress-reports'),
      //   label: t1('progress_reports'),
      //   navLabel: t1('progress_reports'),
      // },
      {
        icon: <Icon icon="dashboard" style={style.icon} />,
        id: 'overview-courses',
        action: 'overview-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'overview-courses',
            })
          : getDashboardUrl('overview-courses'),
        label: t1('overview'),
        navLabel: t1('overview_courses'),
      },
      node
        ? null
        : {
            icon: <Icon icon="book" style={style.icon} />,
            id: 'register-courses',
            href: getDashboardUrl('register-courses'),
            label: t1('register_courses'),
          },
      node
        ? null
        : {
            icon: <Icon icon="book" style={style.icon} />,
            id: 'transcripts',
            href: getDashboardUrl('transcripts'),
            label: t1('transcripts'),
          },
      {
        icon: <Icon icon="in_progess" style={style.icon} />,
        id: 'in-progress-courses',
        action: 'in-progress-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'in-progress-courses',
            })
          : getDashboardUrl('in-progress-courses'),
        label: t1('learning'),
        navLabel: t1('learning_courses'),
      },
      {
        icon: <Icon icon="view" style={style.icon} />,
        id: 'compulsory-courses',
        action: 'compulsory-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'compulsory-courses',
            })
          : getDashboardUrl('compulsory-courses'),
        label: t1('compulsory_courses'),
        navLabel: t1('compulsory_courses'),
      },
      {
        icon: <Icon icon="time" style={style.icon} />,
        id: 'assigned-courses',
        action: 'assigned-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'assigned-courses',
            })
          : getDashboardUrl('assigned-courses'),
        label: t1('waiting_courses'),
        navLabel: t1('waiting_courses'),
      },
      {
        icon: <Icon icon="cup" style={style.icon} />,
        id: 'completed-courses',
        action: 'completed-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'completed-courses',
            })
          : getDashboardUrl('completed-courses'),
        label: t1('completed'),
        navLabel: t1('completed_courses'),
      },
      {
        icon: <Icon icon="na" style={style.icon} />,
        id: 'failed-courses',
        action: 'failed-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'failed-courses',
            })
          : getDashboardUrl('failed-courses'),
        label: t1('failed_courses'),
        navLabel: t1('failed_courses'),
      },
      {
        icon: <Icon icon="na" style={style.icon} />,
        id: 'rejected-courses',
        action: 'rejected-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'rejected-courses',
            })
          : getDashboardUrl('rejected-courses'),
        label: t1('rejected'),
        navLabel: t1('rejected_courses'),
      },
      {
        icon: <Icon icon="world" style={style.icon} />,
        id: 'public-courses',
        action: 'public-courses',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'public-courses',
            })
          : getDashboardUrl('public-courses'),
        label: t1('public'),
        navLabel: t1('public_courses'),
      },
      node
        ? {
            icon: <Icon icon="unlock" style={iconStyle.unlockPath} />,
            action: 'unlock-path',
            id: 'unlock-path',
            href: getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'unlock-path',
            }),
            label: t1('unlock_path'),
          }
        : null,
      node
        ? null
        : {
            id: 'home',
            href: node
              ? getUrl('node_edit', {
                  ...node,
                  ntype: mode,
                  step: 'overview-timetable',
                })
              : getDashboardUrl('overview-timetable'),
            icon: <Icon icon="direction" style={style.icon} />,
            label: t1('overview_timetable'),
          },
      node
        ? null
        : {
            id: 'timetable',
            href: node
              ? getUrl('node_edit', {
                  ...node,
                  ntype: mode,
                  step: 'timetable',
                })
              : getDashboardUrl('timetable'),
            icon: <Icon icon="timetable" style={style.icon} />,
            label: t1('timetable'),
          },
      node
        ? null
        : {
            id: 'assignments',
            href: node
              ? getUrl('node_edit', {
                  ...node,
                  ntype: mode,
                  step: 'assignments',
                })
              : getDashboardUrl('assignments'),
            icon: <Icon icon="assign_in_organization" style={style.icon} />,
            label: t1('assignments'),
          },
    ],
  };
  const goalObj = {
    icon: <Icon icon="my-location" style={style.icon} />,
    id: 'goals',
    menuLevel: 'menu-lv1',
    action: 'user-goal',
    href: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'user-goal' })
      : '/dashboard/goals',
    label: t1('goals'),
    navLabel: t1('goals'),
  };
  // const overviewDashboard = {
  //   icon: <Icon icon="my-location" style={style.icon} />,
  //   id: 'overview-dashboard',
  //   menuLevel: 'menu-lv1',
  //   action: 'overview-dashboard',
  //   href: node
  //     ? getUrl('node_edit', {
  //         ...node,
  //         ntype: mode,
  //         step: 'overview-dashboard',
  //       })
  //     : '/dashboard/overview-dashboard',
  //   label: t1('overview_dashboard'),
  //   navLabel: t1('overview_dashboard'),
  // };
  const skillObj = {
    icon: <Icon icon="light-bulb" style={style.icon} />,
    id: 'my-skills',
    menuLevel: 'menu-lv1',
    action: 'my-skills',
    href: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'my-skills' })
      : getDashboardUrl('my-skills'),
    label: t1('my_skills'),
    navLabel: t1('my_skills'),
  };
  const pathObj = {
    icon: <Icon icon="bookmark-alt" style={style.icon} />,
    id: 'my-paths',
    menuLevel: 'menu-lv1',
    action: 'my-paths',
    href: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'my-paths' })
      : getDashboardUrl('my-paths'),
    label: t1('learning_path'),
    navLabel: t1('learning_path'),
  };
  const enrolmentPlanObj = {
    icon: <Icon icon="bookmark-alt" style={style.icon} />,
    id: 'my-enrolment-plans',
    menuLevel: 'menu-lv1',
    action: 'my-enrolment-plans',
    href: node
      ? getUrl('node_edit', {
          ...node,
          ntype: mode,
          step: 'my-enrolment-plans',
        })
      : getDashboardUrl('my-enrolment-plans'),
    label: t1('my_enrolment_plans'),
    navLabel: t1('my_enrolment_plans'),
  };
  const onlineTestingObj = {
    icon: <Icon icon="bookmark-alt" style={style.icon} />,
    id: 'online-testing',
    menuLevel: 'menu-lv1',
    action: 'online-testing',
    // href: '/exam-info',
    label: t1('online_testing'),
    navLabel: t1('online_testing'),
    children: [
      {
        icon: <Icon icon="upcoming_contest" style={style.icon} />,
        id: 'upcoming-contests',
        action: 'upcoming-contests',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'upcoming-contests',
            })
          : getDashboardUrl('upcoming-contests'),
        label: t1('upcoming_contests'),
        navLabel: t1('upcoming_contests'),
      },
      {
        icon: <Icon icon="crown" style={style.icon} />,
        id: 'taken-contests',
        action: 'taken-contests',
        href: node
          ? getUrl('node_edit', {
              ...node,
              ntype: mode,
              step: 'taken-contests',
            })
          : getDashboardUrl('taken-contests'),
        label: t1('taken_contests'),
        navLabel: t1('taken_contests'),
      },
    ],
  };

  const busRouter = {
    id: 'bus-router',
    menuLevel: 'menu-lv1',
    action: 'bus-router',
    label: t1('bus_router'),
    navLabel: t1('bus_router'),
    children: [
      {
        icon: <Icon icon="location" style={style.icon} />,
        id: 'locations',
        href: getDashboardUrl('locations'),
        label: t1('locations'),
        navLabel: t1('locations'),
      },
    ],
  };

  const profileObj = {
    id: 'profile',
    label: t1('profile'),
    navLabel: t1('profile'),
    menuLevel: 'menu-lv1',
    type: 'label',
    icon: (
      <Icon type="profile" antIcon style={{ ...style.icon, ...iconStyle }} />
    ),
    children: [
      !node
        ? {
            icon: (
              <Icon
                icon="user"
                style={{ ...style.icon, ...iconStyle }}
                antIcon
              />
            ),
            id: 'update-info',
            href:
              window.isETEP && user
                ? editProfile(lodashGet(user, 'id'))
                : userLinks.update_profile_info,
            label: t1('basic_info'),
            navLabel: t1('basic_info'),
          }
        : '',
      !node
        ? {
            icon: (
              <Icon
                icon="picture"
                style={{ ...style.icon, ...iconStyle }}
                antIcon
              />
            ),
            id: 'update-avatar',
            href: userLinks.update_profile_avatar,
            label: t1('avatar'),
            navLabel: t1('avatar'),
          }
        : '',
      {
        icon: (
          <Icon icon="lock" style={{ ...style.icon, ...iconStyle }} antIcon />
        ),
        id: 'change-password',
        href: userLinks.update_password,
        label: t1('change_password'),
        navLabel: t1('change_password'),
      },
      {
        icon: (
          <Icon
            icon="shopping"
            style={{ ...style.icon, ...iconStyle }}
            antIcon
          />
        ),
        id: 'my-order',
        href: userLinks.myOrder,
        label: t1('my_order'),
        navLabel: t1('my_order'),
      },
    ],
  };
  const notificationsObj = {
    icon: <Icon icon="notifications" style={style.icon} />,
    id: 'notifications',
    menuLevel: 'menu-lv1',
    action: 'notifications',
    href: node
      ? getUrl('node_edit', { ...node, ntype: mode, step: 'notifications' })
      : getDashboardUrl('notifications'),
    label: t1('notifications'),
    navLabel: t1('notifications'),
  };

  if (step !== 'dashboard') {
    if ((!availableMenus || availableMenus.length === 0) && !node) return null;
  }

  if (node) {
    menus = [
      courseObj,
      goalObj,
      skillObj,
      pathObj,
      enrolmentPlanObj,
      onlineTestingObj,
      profileObj,
    ];
  }
  // else if (step === 'contest') {
  //   menus = [onlineTestingObj];
  // }
  else if (step !== 'profile') {
    menus = [
      // overviewDashboard,
      courseObj,
      goalObj,
      skillObj,
      pathObj,
      enrolmentPlanObj,
      onlineTestingObj,
      notificationsObj,
      busRouter,
    ];
  } else {
    menus.push(profileObj);
  }

  return filterMenuByAvailableMenu(menus, availableMenus);
}
