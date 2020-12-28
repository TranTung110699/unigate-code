import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'hrms_data',
  title: t3('hrms_data'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'hrms-user-search',
      url: getUrl('school/hrms-data/users'),
      title: t1('users'),
      icon: {
        position: 'left',
        type: 'user',
      },
    },
    {
      id: 'hrms-organization-search',
      url: getUrl('school/hrms-data/organizations'),
      title: t1('organizations'),
      icon: {
        position: 'left',
        type: 'cluster',
      },
    },
    {
      id: 'hrms-phongban-search',
      url: getUrl('school/hrms-data/phongbans'),
      title: t1('phongban'),
      icon: {
        position: 'left',
        type: 'cluster',
      },
    },
    {
      id: 'hrms-top-equivalent-position-search',
      url: getUrl('school/hrms-data/top-equivalent-positions'),
      title: t1('top_equivalent_positions'),
      icon: {
        position: 'left',
        type: 'shopping',
      },
    },
    {
      id: 'hrms-equivalent-position-search',
      url: getUrl('school/hrms-data/equivalent-positions'),
      title: t1('equivalent_positions'),
      icon: {
        position: 'left',
        type: 'shopping',
      },
    },
    {
      id: 'hrms-position-search',
      url: getUrl('school/hrms-data/positions'),
      title: t1('positions'),
      icon: {
        position: 'left',
        type: 'shopping',
      },
    },
  ],
});
