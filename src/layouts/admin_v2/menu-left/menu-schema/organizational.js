import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'organizations_and_job_positions',
  title: t3('organization'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'departments',
      url: getUrl('organization'),
      title: t1('departments'),
      icon: {
        position: 'left',
        type: 'cluster',
      },
    },
    {
      id: 'job_position',
      url: getUrl('job-position'),
      title: t1('job_positions'),
      icon: {
        position: 'left',
        type: 'shopping',
      },
    },
    {
      id: 'top-equivalent-position',
      url: getUrl('top-equivalent-position'),
      title: t1('top_equivalent_positions'),
      icon: {
        position: 'left',
        type: 'shopping',
      },
    },
  ],
});
