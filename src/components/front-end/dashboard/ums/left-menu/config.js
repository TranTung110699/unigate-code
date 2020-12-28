import React from 'react';
import { getFrontendUrl } from 'routes/links/common';
import { t1 } from 'translate';
import { Redirect } from 'react-router-dom';
import getUser from 'common/auth';
import Perm from 'common/utils/Perm';

import IconSkill from 'material-ui/svg-icons/image/flash-on';
import IconCourse from 'material-ui/svg-icons/maps/local-laundry-service';
import IconConf from 'material-ui/svg-icons/action/settings';
import IconUser from 'material-ui/svg-icons/social/person';
import IconAssignment from 'material-ui/svg-icons/action/assignment';
import IconEvent from 'material-ui/svg-icons/action/event';
import IconHome from 'material-ui/svg-icons/action/home';
import IconInfo from 'material-ui/svg-icons/action/info-outline';
import IconAvatar from 'material-ui/svg-icons/device/wallpaper';
import IconProfile from 'material-ui/svg-icons/action/account-circle';
import IconPassword from 'material-ui/svg-icons/communication/vpn-key';
import ChangePassword from 'components/user/profile/ChangePassword';
import AttendanceManage from 'components/admin/course/mainstage/attendance/Layout';
import Attendance from 'components/front-end/dashboard/ums/attendance';
import UpdateUser from 'components/user/update/Layout';
import { remove } from 'common/utils/Array';
import UserRequest from 'components/admin/req/search';
import TeacherSchedule from 'components/timetable/views/index';
import Schedule from 'components/timetable_v2/viewers/ScheduleOverview';
import News from 'components/front-end/blog/Layout';
import RegisterCourse from '../course-registration';
import Examinations from '../examinations';
import Home from '../home';
import Fee from '../fee';
import Assignments from '../../assignments';
import CurrentCourses from '../current-courses';
import Event from '../event';
import Transcripts from '../transcript/';

export default function(rootUrl, availableMenus = []) {
  const news = {
    id: 'news',
    href: getFrontendUrl(rootUrl, { menu: 'news' }),
    icon: <IconHome />,
    label: t1('news'),
  };

  const home = {
    id: 'home',
    href: getFrontendUrl(rootUrl, { menu: 'home' }),
    icon: <IconHome />,
    label: t1('dashboard'),
  };

  const registerCourses = {
    id: 'register-courses',
    href: getFrontendUrl(rootUrl, { menu: 'register-courses' }),
    icon: <IconConf />,
    label: t1('register_courses'),
  };

  const request = {
    id: 'request',
    href: getFrontendUrl('request'),
    icon: <IconUser />,
    label: t1('request'),
  };

  const attendance = {
    id: 'attendance',
    href: getFrontendUrl(rootUrl, { menu: 'attendance' }),
    icon: <IconConf />,
    label: t1('attendance'),
  };

  const examinations = {
    id: 'examinations',
    href: getFrontendUrl(rootUrl, { menu: 'timetable/examinations' }),
    icon: <IconCourse />,
    label: t1('examinations'),
  };

  const currentCourses = {
    id: 'current-courses',
    href: getFrontendUrl(rootUrl, { menu: 'current-courses' }),
    icon: <IconCourse />,
    label: t1('current_courses'),
  };

  const online = {
    id: 'online',
    href: getFrontendUrl(rootUrl, { menu: 'online' }),
    icon: <IconUser />,
    label: t1('learn_online'),
  };

  const assignments = {
    id: 'assignments',
    href: getFrontendUrl(rootUrl, { menu: 'assignments' }),
    icon: <IconAssignment />,
    label: t1('assignments'),
  };

  const events = {
    id: 'events',
    href: getFrontendUrl(rootUrl, { menu: 'events' }),
    icon: <IconEvent />,
    label: t1('events'),
  };

  const schedule = {
    id: 'schedule',
    href: getFrontendUrl(rootUrl, { menu: 'schedule' }),
    icon: <IconEvent />,
    label: t1('schedule'),
  };

  const fee = {
    id: 'fee',
    href: getFrontendUrl(rootUrl, { menu: 'fee' }),
    icon: <IconSkill />,
    label: t1('fee'),
  };

  const transcripts = {
    id: 'transcripts',
    href: getFrontendUrl(rootUrl, { menu: 'transcripts' }),
    icon: <IconSkill />,
    label: t1('transcripts'),
  };

  const requestV2 = {
    id: 'request_v2',
    href: getFrontendUrl('request_v2'),
    icon: <IconSkill />,
    label: t1('request_v2'),
  };

  const timetable = {
    id: 'timetable',
    href: getFrontendUrl('timetable'),
    icon: <IconSkill />,
    label: t1('timetable'),
  };

  const profile = {
    id: 'profile',
    icon: <IconProfile />,
    label: t1('profile'),
    children: [
      {
        id: 'update-info',
        href: getFrontendUrl(rootUrl, { menu: 'update-info' }),
        icon: <IconInfo />,
        label: t1('basic_info'),
      },
      {
        id: 'update-avatar',
        href: getFrontendUrl(rootUrl, { menu: 'update-avatar' }),
        icon: <IconAvatar />,
        label: t1('avatar'),
      },
      {
        id: 'change-password',
        href: getFrontendUrl(rootUrl, { menu: 'change-password' }),
        icon: <IconPassword />,
        label: t1('change_password'),
      },
      {
        id: 'setting',
        href: getFrontendUrl(rootUrl, { menu: 'setting' }),
        icon: <IconConf />,
        label: t1('setting'),
      },
    ],
  };

  const teachMenus = [
    news,
    timetable,
    requestV2,
    attendance,
    schedule,
    events,
    profile,
  ];

  const learnMenus = [
    news,
    home,
    timetable,
    registerCourses,
    request,
    requestV2,
    attendance,
    examinations,
    currentCourses,
    online,
    assignments,
    events,
    fee,
    transcripts,
    schedule,
    profile,
  ];

  let menus = rootUrl === 'teach' ? teachMenus : learnMenus;
  if (!availableMenus) {
    return menus;
  }
  menus.forEach((menu) => {
    if (!menu || !availableMenus) return;
    if (!menu.children) {
      if (availableMenus && !availableMenus.includes(menu.id))
        menus = remove(menus, menu);
    } else {
      menu.children.forEach((child) => {
        if (availableMenus && !availableMenus.includes(child.id))
          menu.children = remove(menu.children, child);
      });
      if (menu.children.length === 0) {
        menus = remove(menus, menu);
      }
    }
  });
  return menus;
}

export function getComponent(type, params) {
  switch (type) {
    case 'news':
      return <News {...params} blogRouterId={params.dashboard} />;
    case 'home':
      return <Home />;
    case 'register-courses':
      return <RegisterCourse />;
    case 'request': {
      const userInfo = getUser();
      return (
        <UserRequest
          hiddenFields={{
            requester_iid: userInfo && userInfo.info && userInfo.info.iid,
          }}
        />
      );
    }
    case 'examinations':
      return <Examinations />;
    case 'current-courses':
      return <CurrentCourses />;
    case 'fee':
      return <Fee />;
    case 'online':
      return <RegisterCourse />;
    case 'assignments':
      return <Assignments />;
    case 'events':
      return <Event />;
    case 'timetable':
      if (params && params.sub_type === 'attendance') {
        return <AttendanceManage {...params} />;
      }
      return <TeacherSchedule this_user_only={1} {...params} />;
    case 'update-info':
      return <UpdateUser updateType="info" />;
    case 'update-avatar':
      return <UpdateUser updateType="avatar" />;
    case 'setting':
      return <UpdateUser updateType="setting" />;
    case 'attendance':
      return <Attendance />;
    case 'transcripts': {
      return <Transcripts />;
    }
    case 'change-password': {
      const user = getUser();
      return <ChangePassword user={user} />;
    }
    case 'news': {
      const user = getUser();
      return <ChangePassword user={user} />;
    }
    case 'schedule': {
      const userInfo = getUser();
      return (
        <Schedule
          userIid={userInfo && userInfo.info && userInfo.info.iid}
          autoSearchWhenValuesChange
          hideSubmitButton
        />
      );
    }
    default:
      return (
        <Redirect
          to={Perm.hasPerm('teacher') ? '/teach/timetable' : '/learn/home'}
        />
      );
  }
}
