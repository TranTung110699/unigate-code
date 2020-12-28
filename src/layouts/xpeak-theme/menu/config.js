import React from 'react';
import { t1 } from 'translate';
import SvgIcon, {
  settingIcon,
  upgradeIcon,
  logoutIcon,
} from '../../../common/icons/svg';

export default ({ user, handleSignIn, handleSignUp }) => {
  const menus = [
    {
      id: 'information',
      label: 'Giới thiệu',
      href: '/learn/course-list',
      style: { display: 'none' },
    },
    {
      id: 'home',
      label: 'Trang chủ',
      href: '/',
    },
    {
      id: 'news',
      label: 'Tin tức',
      href: '/blog',
    },
    {
      id: 'course',
      label: 'Khóa học',
      href: '/learn/course-list/55229',
    },
    {
      id: 'philosophy',
      label: 'Triết lý',
      href: '/philosophies',
    },
    {
      id: 'learn-with_teachers',
      label: 'Học với giáo viên',
      href: '/teachers',
    },
    user &&
      user.iid && {
        id: 'pay',
        label: 'Nạp tiền',
        href: '/pay',
      },
    {
      id: 'about',
      label: 'Liên hệ',
      href: '/',
      style: { display: 'none' },
    },
  ].filter(Boolean);

  if (user && user.iid) {
    menus.push({
      id: 'user-info',
    });
  } else {
    menus.push({
      label: t1('login'),
      handleClick: handleSignIn,
    });
    menus.push({
      label: t1('sign_up_free'),
      handleClick: handleSignUp,
      className: 'signup',
    });
  }

  return menus;
};

export const profileConfig = ({
  accountLabel,
  hasSystemRole,
  hasStaffRole,
  logoutAction,
}) =>
  [
    {
      label: accountLabel,
      path: settingIcon,
      icon: 'is-icon-setting-gear-1',
    },
    hasSystemRole && {
      label: t1('system'),
      icon: 'is-icon-rocket',
      linkTo: '/system',
    },
    hasStaffRole && {
      linkTo: '/admin',
      label: t1('admin'),
      path: upgradeIcon,
      icon: 'is-icon-rocket',
    },
    {
      label: t1('logout'),
      action: logoutAction,
      className: 'clearfix',
      children: (
        <span className="pull-right">
          <SvgIcon
            path={logoutIcon}
            className="is-icon-log-out-1"
            viewBox="0 0 512 512"
          />
        </span>
      ),
    },
  ].filter(Boolean);
