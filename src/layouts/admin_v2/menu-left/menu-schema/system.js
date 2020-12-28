import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const systemMenu = [
  {
    id: 'conf',
    url: getUrl('conf', {
      menu: 'language-and-appearance',
      rootUrl: '/system',
    }),
    icon: {
      position: 'left',
      type: 'setting',
    },
    title: t1('configurations'),
  },
  {
    id: 'translationSystem',
    url: getUrl('translate', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'global',
    },
    trigger: 1,
    title: t1('translation'),
  },
  {
    id: 'school',
    url: getUrl('school/search-school', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'cluster',
    },
    trigger: 1,
    title: t1('school'),
  },
  {
    id: 'redis',
    url: getUrl('redis', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'thunderbolt',
    },
    trigger: 1,
    title: t1('redis'),
  },
  {
    id: 'user',
    url: getUrl('user', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'user',
    },
    trigger: 1,
    title: t1('user'),
  },
  {
    id: 'hrms-data',
    url: getUrl('hrms-data', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'database',
    },
    trigger: 1,
    title: t1('hrms_data'),
  },
  {
    id: 'sync_data',
    url: getUrl('sync', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'sync',
    },
    trigger: 1,
    title: t1('sync-mongo-and-redis'),
  },
  {
    id: 'util',
    url: getUrl('util', { rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'ellipsis',
    },
    trigger: 1,
    title: t1('utilities'),
  },
];

export default systemMenu;
