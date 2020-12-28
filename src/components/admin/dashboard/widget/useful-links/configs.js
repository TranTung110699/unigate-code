import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';
import Perm from 'common/utils/Perm';
import { getRoleName } from 'utils/Util';

const headmaster = (menuRoles, isRoot) => {
  const menus = [];
  const role =
    menuRoles && menuRoles.find((item) => getRoleName(item) === 'headmaster');
  const enableMenus = role && role.menu_roles;
  if ((enableMenus && enableMenus.user) || isRoot) {
    menus.push({
      id: 'users',
      href: '/admin/school/users',
      icon: 'user',
      label: t1('users'),
    });
  }
  if ((enableMenus && enableMenus.parent) || isRoot) {
    menus.push({
      id: 'parents',
      href: '/admin/school/parents',
      icon: 'user',
      label: t1('parents'),
    });
  }
  if ((enableMenus && enableMenus.teacher) || isRoot) {
    menus.push({
      id: 'staff',
      href: '/admin/school/teachers',
      icon: 'persons',
      label: t1('staff'),
    });
  }
  if ((enableMenus && enableMenus.account) || isRoot) {
    menus.push({
      id: 'accounts',
      href: '/admin/school/accounts',
      icon: 'user',
      label: t1('accounts'),
    });
  }
  if ((enableMenus && enableMenus.organizations) || isRoot) {
    menus.push({
      id: 'faculty',
      href: getUrl('organization'),
      icon: 'home',
      label: t1('faculty'),
    });
  }
  if ((enableMenus && enableMenus.report) || isRoot) {
    menus.push({
      id: 'report',
      href: '/admin/report/user-learns',
      icon: 'border',
      label: t1('report'),
    });
  }
  return menus;
};

const teacher = (menuRoles, isRoot) => {
  const role =
    menuRoles && menuRoles.find((item) => getRoleName(item) === 'teacher');
  const enableMenus = role && role.menu_roles;
  const menus = [];
  if ((enableMenus && enableMenus.syllabus) || isRoot) {
    menus.push({
      id: 'credit',
      href: getUrl('credit'),
      icon: 'class',
      label: t1('credit_syllabuses'),
    });
  }
  if ((enableMenus && enableMenus.course) || isRoot) {
    menus.push({
      id: 'course',
      href: getUrl('course'),
      icon: 'local_laundry_service',
      label: t1('course'),
    });
  }
  /*
  if ((enableMenus && enableMenus.assigned_courses) || isRoot) {
    menus.push({
      id: 'assigned_course',
      href: getUrl('assigned-course'),
      icon: 'local_laundry_service',
      label: t1('assigned_courses'),
    });
  }
*/
  if ((enableMenus && enableMenus.report) || isRoot) {
    menus.push({
      id: 'report',
      href: '/admin/report/user-learns',
      icon: 'border',
      label: t1('report'),
    });
  }
  if ((enableMenus && enableMenus.bank) || isRoot) {
    menus.push({
      id: 'bank',
      href: '/admin/bank/question',
      icon: 'bank',
      label: t1('bank'),
    });
  }
  menus.push({
    id: 'assignments_for_marking',
    icon: 'border',
    href: getUrl('assignments-for-marking'),
    label: t1('assignments'),
  });
  menus.push({
    id: 'login_as_user',
    icon: 'face',
    label: t1('login_as_user'),
  });
  return menus;
};

function addItems(total, items) {
  const menus = total || [];
  if (!items) return menus;

  items.forEach((item) => {
    for (let i = 0; i < menus.length; i += 1) {
      const menu = menus[i];
      if ((item && item.id) === (menu && menu.id)) {
        return;
      }
    }
    menus.push(item);
  });
  return menus;
}

export default function(role, menuRoles) {
  const isRoot = Perm.hasPerm('root');
  switch (role) {
    case 'headmaster':
      return headmaster(menuRoles, isRoot);
    case 'teacher':
      return teacher(menuRoles, isRoot);
    case 'all': {
      let menus = [];
      if (Perm.hasPerm('headmaster'))
        menus = addItems(menus, headmaster(menuRoles, isRoot));
      if (Perm.hasPerm('teacher')) {
        menus = addItems(menus, teacher(menuRoles, isRoot));
      }
      return menus;
    }
    default:
      return null;
  }
}
