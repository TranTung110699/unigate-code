import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'system_logs',
  title: t3('system_logs'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'log',
      url: getUrl('logs'),
      title: t1('logs'),
      icon: {
        position: 'left',
        type: 'setting',
      },
    },
    {
      id: 'jobs',
      url: getUrl('jobs'),
      title: t1('jobs'),
      icon: {
        position: 'left',
        type: 'setting',
      },
    },
  ],
});
