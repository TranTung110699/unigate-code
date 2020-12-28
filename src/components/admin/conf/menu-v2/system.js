import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const systemMenuConfig = [
  {
    title: t1('language_& _appearance'),
    url: getUrl('conf', {
      menu: 'language-and-appearance',
      rootUrl: '/system',
    }),
    id: 'language-and-appearance',
    icon: {
      position: 'left',
      type: 'global',
    },
    description: t1('language,_theme_and_other_UI_config'),
    sections: [
      {
        title: t1('theme'),
        url: 'theme',
        id: 'theme',
        active: 1,
      },
    ],
  },
  {
    id: 'payment-affiliate',
    title: `${t1('payment')} & ${t1('affiliate')}`,
    url: getUrl('conf', { menu: 'payment-affiliate', rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'dollar',
    },
    description: `${t1('payment')} & ${t1('affiliate')}`,
    sections: [
      {
        title: t1('payment'),
        url: 'payment',
        id: 'payment',
      },
      {
        title: t1('affiliate'),
        url: 'aff',
        id: 'aff',
      },
    ],
  },
  {
    title: t1('plugins'),
    id: 'system',
    url: getUrl('conf', { menu: 'system', rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'setting',
    },
    description: t1('system'),
    sections: [
      {
        title: t1('plugins'),
        url: 'system',
        id: 'system',
        active: 1,
      },
    ],
  },
  {
    title: t1('others'),
    url: getUrl('conf', { menu: 'others', rootUrl: '/system' }),
    id: 'others',
    icon: {
      position: 'left',
      type: 'ellipsis',
    },
    description: t1('other_configs'),
    sections: [
      {
        title: t1('page'),
        url: 'page',
        id: 'page',
        active: 1,
      },
      {
        title: t1('misc'),
        url: 'misc',
        id: 'misc',
        active: 1,
      },
    ],
  },
  {
    title: t1('job_queue'),
    id: 'queue',
    url: getUrl('conf', { menu: 'queue', rootUrl: '/system' }),
    icon: {
      position: 'left',
      type: 'ordered-list',
    },
    description: t1('job'),
    sections: [
      {
        title: t1('queue'),
        url: 'queue',
        id: 'queue',
        active: 1,
      },
    ],
  },
  {
    title: t1('database'),
    url: getUrl('conf', { menu: 'db', rootUrl: '/system' }),
    id: 'db',
    icon: {
      position: 'left',
      type: 'hdd',
    },
    description: t1('db_configs'),
    sections: [
      {
        title: t1('db_settings'),
        url: 'db',
        id: 'db',
      },
    ],
  },
];

export default systemMenuConfig;
