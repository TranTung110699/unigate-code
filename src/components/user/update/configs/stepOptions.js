import BasicInfo from '../main/basic-info';
import TeacherInfo from '../main/teacher-info';
import ChangePassword from '../main/change-password';
import SetPassword from '../main/set-password';
import Avatar from '../main/avatar';
import { t1 } from 'translate';

const options = (user) => [
  {
    id: 'basic-info',
    label: t1('basic_information'),
    available: true,
    url: '/user/update/basic-info',
    icon: 'info',
    component: BasicInfo,
  },
  {
    id: 'teacher-info',
    label: t1('teacher_information'),
    available: true,
    url: '/user/update/teacher-info',
    icon: 'teacher',
    component: TeacherInfo,
  },
  {
    id: 'avatar',
    label: t1('avatar'),
    available: true,
    url: '/user/update/avatar',
    icon: 'ava',
    component: Avatar,
  },
  {
    id: 'password',
    label: t1(user && user.hasPass ? 'change_password' : 'set_password'),
    available: true,
    url: '/user/update/password',
    icon: 'pw',
    component: user && user.hasPass ? ChangePassword : SetPassword,
  },
];

export default options;

export const getOption = (step, user) =>
  !step
    ? options(user).find((option) => option.available)
    : options(user).find((option) => option.id === step && option.available);
