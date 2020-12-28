import { t1 } from 'translate';
import { getSubMenuLink } from 'routes/links';

export const menuItems = (node) => [
  {
    id: 'academic_category_dashboard',
    url: getSubMenuLink('academic-category', node, 'dashboard'),
    title: t1('dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: 'academic_category_roles',
    url: getSubMenuLink('academic-category', node, 'roles'),
    title: t1('roles'),
    icon: {
      position: 'left',
      type: 'user',
    },
  },
  {
    id: 'academic_category_info',
    url: getSubMenuLink('academic-category', node, 'info'),
    title: t1('information'),
    icon: {
      position: 'left',
      type: 'info-circle',
    },
  },
  {
    id: 'academic_category_staff',
    url: getSubMenuLink('academic-category', node, 'staff'),
    title: t1('staff'),
    icon: {
      position: 'left',
      type: 'team',
    },
  },
  {
    id: 'academic_category_children',
    url: getSubMenuLink('academic-category', node, 'children'),
    title: t1('sub_category'),
    icon: {
      position: 'left',
      type: 'tags',
    },
  },
];
