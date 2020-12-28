import AcademicCategoryEditDashboard from 'components/admin/academic-category/mainstage/dashboard';

import AcademicCategoryEditInfo from 'components/admin/academic-category/mainstage/info';

import AcademicCategoryEditRoles from 'components/admin/academic-category/mainstage/roles/Layout';

import AcademicCategoryEditChildren from 'components/admin/academic-category/mainstage/children/Layout';

import AcademicCategoryEditStaff from 'components/admin/academic-category/mainstage/staff/Layout';

export default [
  {
    componentId: 'AcademicCategoryEditDashboard',
    path: '/admin/academic-category/:iid/dashboard',
    component: AcademicCategoryEditDashboard,
    exact: true,
  },
  {
    componentId: 'AcademicCategoryEditDashboardDefault',
    path: '/admin/academic-category/:iid',
    component: AcademicCategoryEditDashboard,
    exact: true,
  },
  {
    componentId: 'AcademicCategoryEditInfo',
    path: '/admin/academic-category/:iid/info',
    component: AcademicCategoryEditInfo,
    exact: true,
  },
  {
    componentId: 'AcademicCategoryEditRoles',
    path: '/admin/academic-category/:iid/roles',
    component: AcademicCategoryEditRoles,
    exact: true,
  },
  {
    componentId: 'AcademicCategoryEditChildren',
    path: '/admin/academic-category/:iid/children',
    component: AcademicCategoryEditChildren,
    exact: true,
  },
  {
    componentId: 'AcademicCategoryEditStaff',
    path: '/admin/academic-category/:iid/staff',
    component: AcademicCategoryEditStaff,
    exact: true,
  },
];
