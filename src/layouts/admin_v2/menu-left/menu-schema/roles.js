import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'roles_and_permissions',
  title: t3('roles_and_permissions'),
  icon: {
    position: 'left',
    type: 'api',
  },
  subMenu: [
    {
      id: 'abstract-role',
      url: getUrl('abstract-role'),
      title: t1('abstract_role'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'school-role',
      url: getUrl('school-roles'),
      title: t1('school_role'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'abac-role-action',
      url: getUrl('abac-role-action'),
      title: t1('abac_role_action'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'abac-role-module',
      url: getUrl('abac-role-module'),
      title: t1('abac_role_module'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
  ],
});
