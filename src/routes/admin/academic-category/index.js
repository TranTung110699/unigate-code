import AcademicCategoryLayout from 'components/admin/academic-category/Layout';

export default {
  componentId: 'AcademicCategorySearch',
  path: '/admin/academic-category:slash(|/):action(|new)',
  component: AcademicCategoryLayout,
  exact: true,
};
