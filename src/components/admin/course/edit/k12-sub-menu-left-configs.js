import get from 'lodash.get';
import { t1 } from 'translate';
import routes from 'routes';
import { isExamShift, isOfflineExam } from 'common/learn';
import { filterMenusAvailableForSubLeftMenuV2 } from 'common/utils/Array';
import { courseLearningTypes, schoolTypes, layouts } from 'configs/constants';
import { getSubMenuLink, getSyllabusIid } from 'routes/links';
import { isItemUserOldEnrolmentSessionToInvite } from 'components/admin/node/utils';
import { filterMenusByEnabledMenusFromSchoolConfiguration } from 'utils/Util';
import { CourseActions } from 'configs/constants/permission';

export const allMenuItems = (node = {}, themeConfig = {}) => [
  {
    id: 'dashboard',
    url: getSubMenuLink('course', node, 'dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: 'session_and_timetable',
    title: t1('course_setup'),
    open: true,
    subMenu: [
      {
        id: 'invite',
        url: getSubMenuLink('course', node, 'invite'),
        title: `${t1('active_enrolment')} (${node.number_of_students}${
          node.max_student ? '/' + node.max_student : ''
        })`,
        icon: {
          position: 'left',
          type: 'user-add',
        },
      },
      {
        id: 'invite-plan',
        url: getSubMenuLink('course', node, 'invite-plan'),
        title: t1('planned_enrolments'),
        hidden: !isItemUserOldEnrolmentSessionToInvite(node, themeConfig),
        icon: {
          position: 'left',
          type: 'schedule',
        },
      },
      {
        id: 'session-manager',
        url: getSubMenuLink('course', node, 'session-manager'),
        title: `${t1('sessions')} (${get(node, 'counter.sessions') || 0})`,
        hidden: node && node.learning_type !== courseLearningTypes.ILT,
        icon: {
          position: 'left',
          type: 'setting',
        },
      },
      // {
      //   id: 'timetable',
      //   url: getSubMenuLink('course', node, 'timetable'),
      //   title: t1('timetable'),
      //   icon: {
      //     position: 'left',
      //     type: 'table',
      //   },
      // },
      {
        id: 'timetable_v2',
        url: getSubMenuLink('course', node, 'timetable'),
        title: t1('timetable'),
        hidden: node && node.learning_type !== courseLearningTypes.ILT,
        icon: {
          position: 'left',
          type: 'table',
        },
      },
      {
        id: 'schedule',
        url: getSubMenuLink('course', node, 'schedule'),
        title: t1('schedule'),
        hidden: node && node.learning_type !== courseLearningTypes.ILT,
        icon: {
          position: 'left',
          type: 'schedule',
        },
      },
    ],
  },
  {
    id: 'user_and_group',
    title: t1('user_and_group'),
    open: true,
    subMenu: [
      /*
        {
          id: 'groups',
          url: getSubMenuLink('course', node, 'groups'),
          title: t1('groups'),
          icon: {
            position: 'left',
            type: 'gold',
          },
        },
        */
    ],
  },
  {
    id: 'score_and_marking',
    title: t1('course_progression'),
    open: true,
    subMenu: [
      {
        id: 'communication',
        url: getSubMenuLink('course', node, 'communication'),
        title: t1('communication'),
        icon: {
          position: 'left',
          type: 'api',
        },
      },
      {
        id: 'assignments',
        url: getSubMenuLink('course', node, 'assignments'),
        title: t1('assignments'),
        hidden: node && node.exam_type === 'OFFLINE_EXAM',
        icon: {
          position: 'left',
          type: 'book',
        },
      },
      {
        id: 'session-attendance',
        url: getSubMenuLink('course', node, 'session-attendance'),
        title: `${t1('attendance')}`,
        hidden:
          node &&
          (node.learning_type !== courseLearningTypes.ILT ||
            node.exam_type === 'OFFLINE_EXAM'),
        icon: {
          position: 'left',
          type: 'layout',
        },
      },
      /*      {
        id: 'marking',
        url: getSubMenuLink('course', node, 'marking'),
        title: `${t1('scores')} & ${t1('markings')}`,
        schoolTypes: [schoolTypes.ENTERPRISE],
        icon: {
          position: 'left',
          type: 'edit',
        },
      */
      {
        id: 'score',
        url: getSubMenuLink('course', node, 'score'),
        title: t1('rubric_score'),
        hidden: node && node.learning_type !== courseLearningTypes.ILT,
        icon: {
          position: 'left',
          type: 'table',
        },
        disabled: node.status !== 'approved',
      },
      {
        id: 'users',
        url: getSubMenuLink('course', node, 'users'),
        title: t1('online_exercise_score'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        id: 'feedback',
        url: getSubMenuLink('course', node, 'feedback'),
        title: t1('feedback'),
        icon: {
          position: 'left',
          type: 'exclamation-circle',
        },
        disabled: node.status !== 'approved',
      },
      {
        id: 'survey',
        url: getSubMenuLink('course', node, 'survey'),
        title: t1('survey'),
        icon: {
          position: 'left',
          type: 'pie-chart',
        },
      },

      // {
      //   id: 'certificate',
      //   url: getSubMenuLink('course', node, 'certificate'),
      //   title: t1('certificate'),
      //   hidden: node && node.exam_type === 'OFFLINE_EXAM',
      //   icon: {
      //     position: 'left',
      //     type: 'idcard',
      //   },
      //   disabled: node.status !== 'approved',
      // },
    ],
  },
  {
    id: 'update',
    title: t1('update'),
    open: true,
    subMenu: [
      {
        id: 'update',
        url: getSubMenuLink('course', node, 'update'),
        title: t1('information'),
        icon: {
          position: 'left',
          type: 'edit',
        },
      },
      {
        id: 'roles',
        url: getSubMenuLink('course', node, 'roles'),
        title: t1('roles'),
        icon: {
          position: 'left',
          type: 'user',
        },
      },
      {
        id: 'avatar',
        url: getSubMenuLink('course', node, 'avatar'),
        title: t1('avatar'),
        icon: {
          position: 'left',
          type: 'picture',
        },
      },
      {
        id: 'staff',
        url: getSubMenuLink('course', node, 'staff'),
        title: t1('staff'),
        icon: {
          position: 'left',
          type: 'team',
        },
      },
      {
        id: 'syllabus',
        url: isExamShift(node)
          ? routes.url('node_edit', {
              ...node,
              step: `syllabus/${getSyllabusIid(node.syllabus)}`,
            })
          : routes.url('node_edit', {
              ntype: 'syllabus',
              iid: node.syllabus,
            }),
        title: isExamShift(node)
          ? t1('syllabus_exam_of_exam_shift')
          : t1('syllabus'),
        icon: {
          position: 'left',
          type: 'read',
        },
      },
    ],
  },
  {
    id: 'pricing',
    url: getSubMenuLink('course', node, 'pricing'),
    title: t1('pricing'),
    permissions: [],
    hidden:
      node &&
      node.learning_type !== courseLearningTypes.ILT &&
      themeConfig.layout !== layouts.XPEAK,
    schoolTypes: [schoolTypes.ENTERPRISE],
    icon: {
      position: 'left',
      type: 'dollar',
    },
  },
  {
    id: 'paper',
    url: getSubMenuLink('course', node, 'paper'),
    title: t1('paper'),
    icon: {
      position: 'left',
      type: 'file',
    },
  },
  /*
    {
      id: 'preview',
      url: isExamShift(node)
        ? Links.trialExam(node)
        : Links.overViewCourse(node, true),
      options: {
        target: '_blank',
      },
      title: isExamShift(node) ? t1('trial_exam') : t1('preview'),
      icon: {
        position: 'left',
        type: 'eye',
      },
    },
    */
];

const filterMenusByConfiguration = (node, conf, defaultMenus) => {
  const enabledMenus = get(conf, 'list_of_course_menus') || [];
  enabledMenus.push('timetable_v2');

  return filterMenusByEnabledMenusFromSchoolConfiguration(
    node,
    defaultMenus,
    enabledMenus,
  );
};

const getMenuIdsAvailable = (node, schoolType, conf) => {
  let keysAvailable = [];

  if (isExamShift(node)) {
    keysAvailable = ['communication', 'preview', 'update', 'syllabus', 'paper'];
  } else if (isOfflineExam(node)) {
    keysAvailable = [
      'dashboard',
      'users',
      'invite',
      'invite-plan',
      'marking',
      'session-manager',
      'session-attendance',
      'score',
      'attendance',
      'communication',
      'update',
      'staff',
      'timetable',
      'timetable_v2',
      'schedule',
    ];
  } else {
    keysAvailable = [
      'dashboard',
      ...(schoolType === schoolTypes.SIS ||
      (schoolType === schoolTypes.ENTERPRISE &&
        node.learning_type === courseLearningTypes.ONLINE)
        ? ['users']
        : []),
      'groups',
      'role',
      'roles',
      'certificate',
      'preview',
      'update',
      'avatar',
      'staff',
      ...(schoolType !== schoolTypes.SIS ? ['pricing'] : []),
      'communication',
      'invite',
      'invite-plan',
      'syllabus',
      'feedback',
      'survey',
    ];

    if (node && node.learning_type === courseLearningTypes.ILT) {
      keysAvailable.push(
        'users',
        'score',
        'session-attendance',
        'session-manager',
        'attendance',
        'timetable',
        'timetable_v2',
        'schedule',
        'invite',
        'assignments',
        'marking',
      );
    }
  }

  return filterMenusByConfiguration(node, conf, keysAvailable);
};

const checkPermisionMenuItem = (item, node, hasPermission, permissions) => {
  if (!item) {
    return false;
  }

  switch (item.id) {
    case 'session-manager': {
      const actions = [
        CourseActions.COURSE_ACTION_VIEW_SESSION,
        CourseActions.COURSE_ACTION_UPDATE_SESSION,
      ];
      return hasPermission(actions, node && node.iid, permissions);
    }
    case 'session-attendance': {
      const actions = [
        CourseActions.COURSE_ACTION_VIEW_ATTENDANCE,
        CourseActions.COURSE_ACTION_UPDATE_ATTENDANCE,
        CourseActions.COURSE_ACTION_UPDATE_SUPER_ATTENDANCE,
        CourseActions.COURSE_ACTION_EXPORT_STUDENTS_ATTENDANCE,
        CourseActions.COURSE_ACTION_UPDATE_STUDENT_ATTENDANCE_NUMBER,
      ];
      return hasPermission(actions, node && node.iid, permissions);
    }
    default: {
      return true;
    }
  }
};

export const menuItems = (
  node,
  schoolType,
  themeConfig,
  conf,
  hasPermission,
  permissions,
) => {
  const menuIdsAvailable = getMenuIdsAvailable(node, schoolType, conf);
  const menus = filterMenusAvailableForSubLeftMenuV2(
    allMenuItems(node, themeConfig),
    menuIdsAvailable,
    (item) => checkPermisionMenuItem(item, node, hasPermission, permissions),
  );

  return menus;
};
