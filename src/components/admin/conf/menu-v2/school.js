import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const info = {
  id: 'information',
  title: t1('information'),
  open: true,
  subMenu: [
    {
      id: 'conf-dashboard',
      icon: {
        position: 'left',
        type: 'info-circle',
      },
      url: getUrl('conf', { menu: 'dashboard' }),
      title: t1('config_search'),
    },

    {
      id: 'school-info',
      icon: {
        position: 'left',
        type: 'info-circle',
      },
      url: getUrl('conf', { menu: 'school', type: 'info' }),
      title: t1('school_info'),
    },
    {
      id: 'school-domain-seo',
      icon: {
        position: 'left',
        type: 'rise',
      },
      url: getUrl('conf', { menu: 'school', type: 'domain-seo' }),
      title: t1('Domain_&_SEO'),
    },
    {
      id: 'school-theme',
      icon: {
        position: 'left',
        type: 'dashboard',
      },
      url: getUrl('conf', { menu: 'school', type: 'theme' }),
      title: t1('theme_&_logo'),
    },
    {
      id: 'homepage-slider',
      icon: {
        position: 'left',
        type: 'sliders',
      },
      url: getUrl('conf', { menu: 'school', type: 'homepage-slider' }),
      title: t1('homepage_slider'),
    },
  ],
};

const openCourses = {
  id: 'school-open-courses',
  title: t1('open_courses'),
  open: true,
  subMenu: [
    {
      id: 'school_featured_courses',
      icon: {
        position: 'left',
        type: 'line-chart',
      },
      url: getUrl('conf', { menu: 'school', type: 'featured-courses' }),
      title: t1('featured_courses'),
    },
    {
      id: 'school_exam_paths',
      icon: {
        position: 'left',
        type: 'rise',
      },
      url: getUrl('conf', { menu: 'school', type: 'exam-paths' }),
      title: t1('exam_paths'),
    },
    {
      id: 'school_open_paths',
      icon: {
        position: 'left',
        type: 'rise',
      },
      url: getUrl('conf', { menu: 'school', type: 'open-paths' }),
      title: t1('open_paths'),
    },
  ],
};

export const training = {
  id: 'school-learn',
  title: t1('training'),
  open: true,
  subMenu: [
    {
      title: t1('learning_&_training'),
      url: getUrl('conf', { menu: 'learn' }),
      id: 'learn',
      icon: {
        position: 'left',
        type: 'solution',
      },
      description: t1('learning'),
      sections: [
        {
          title: t1('learning_configurations'),
          url: 'learn',
          id: 'learn',
        },
      ],
    },
    {
      title: t1('available_menus'),
      url: getUrl('conf', { menu: 'menu-node' }),
      id: 'menu-node',
      icon: {
        position: 'left',
        type: 'bars',
      },
      description: t1('available_menu_items'),
      sections: [
        {
          title: t1('available_menu_items_configuration'),
          url: 'menu-node',
          id: 'menu-node',
        },
      ],
    },
    {
      title: t1('course_invitations'),
      url: getUrl('conf', { menu: 'invitations' }),
      id: 'invitations',
      icon: {
        position: 'left',
        type: 'user-add',
      },
      description: t1('invitations'),
      sections: [
        {
          title: t1('invitations'),
          url: 'invitations',
          id: 'invitations',
        },
      ],
    },
    {
      title: t1('course_reminder_settings'),
      url: getUrl('conf', {
        menu: 'school',
        type: 'course_deadline_reminder_settings',
      }),
      id: 'remind-finish-course-settings',
      icon: {
        position: 'left',
        type: 'schedule',
      },
    },
    {
      title: t1('smart_filters'),
      url: getUrl('conf', { menu: 'smart-filters' }),
      id: 'smart-filters',
      icon: {
        position: 'left',
        type: 'filter',
      },
      description: t1('smart_filters'),
      sections: [
        {
          title: t1('smart_filters'),
          url: 'smart-filters',
          id: 'smart-filters',
        },
      ],
    },
    {
      title: t1('virtual_class'),
      url: getUrl('conf', { menu: 'virtual-class' }),
      id: 'virtual-class',
      icon: {
        position: 'left',
        type: 'team',
      },
      description: t1('virtual_class'),
      sections: [
        {
          title: t1('virtual_class'),
          url: 'virtual-class',
          id: 'virtual-class',
        },
      ],
    },
  ],
};

export const academic = {
  id: 'school-content',
  title: t1('content_&_materials'),
  open: true,
  subMenu: [
    {
      title: t1('content_&_materials'),
      url: getUrl('conf', { menu: 'content' }),
      id: 'content',
      icon: {
        position: 'left',
        type: 'file-text',
      },
      description: t1('content'),
      sections: [
        {
          title: t1('enabled_content_types'),
          url: 'content',
          id: 'content',
        },
      ],
    },
    {
      title: t1('legacy_+_xpeak'),
      url: getUrl('conf', { menu: 'content-legacy' }),
      id: 'content-legacy',
      icon: {
        position: 'left',
        type: 'file-text',
      },
      description: t1('content'),
      sections: [
        {
          title: t1('content_settings(for xpeak and other versions'),
          url: 'content-legacy',
          id: 'content-legacy',
        },
      ],
    },
  ],
};

export const mail = {
  id: 'mail',
  title: t1('communications_&_email'),
  open: true,
  subMenu: [
    {
      title: t1('delivery_methods_&_settings'),
      url: getUrl('conf', { menu: 'communication-methods' }),
      id: 'communication-methods',
      icon: {
        position: 'left',
        type: 'api',
      },
      description: t1('enabled-communication-methods'),
      sections: [
        {
          title: t1('communication_methods'),
          url: 'communication-methods',
          id: 'communication-methods',
        },
      ],
    },
    {
      title: t1('mail_configurations'),
      url: getUrl('conf', { menu: 'mail' }),
      id: 'mail',
      icon: {
        position: 'left',
        type: 'mail',
      },
      description: t1('email_config'),
      sections: [
        {
          title: t1('mail'),
          url: 'mail',
          id: 'mail',
          active: 1,
        },
      ],
    },
    {
      title: t1('sms_configurations'),
      url: getUrl('conf', { menu: 'sms' }),
      id: 'sms',
      icon: {
        position: 'left',
        type: 'mail',
      },
      description: t1('email_config'),
      sections: [
        {
          title: t1('sms'),
          url: 'sms',
          id: 'sms',
          active: 1,
        },
      ],
    },
  ],
};

export const school = {
  id: 'school-setting',
  title: t1('other_settings'),
  open: true,
  subMenu: [
    {
      title: t1('k12'),
      id: 'k12',
      url: getUrl('conf', { menu: 'k12' }),
      icon: {
        position: 'left',
        type: 'setting',
      },
      description: t1('k12'),
      sections: [
        {
          title: t1('k12'),
          url: 'k12',
          id: 'k12',
          active: 1,
        },
      ],
    },
    {
      title: t1('app_settings'),
      id: 'app',
      url: getUrl('conf', { menu: 'app' }),
      icon: {
        position: 'left',
        type: 'setting',
      },
      description: t1('app'),
      sections: [
        {
          title: t1('app'),
          url: 'app',
          id: 'app',
          active: 1,
        },
      ],
    },
    {
      title: t1('language_&_appearance'),
      url: getUrl('conf', { menu: 'language-and-appearance' }),
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
      title: t1('user_accounts'),
      url: getUrl('conf', { menu: 'user-account' }),
      id: 'user-account',
      icon: {
        position: 'left',
        type: 'user',
      },
      description: t1('setup-register'),
      sections: [
        {
          title: t1('register'),
          url: 'user-account',
          id: 'user-account',
          active: 1,
        },
      ],
    },
    {
      title: t1('report'),
      id: 'report',
      url: getUrl('conf', { menu: 'report' }),
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
      description: t1('report'),
      sections: [
        {
          title: t1('menu_report'),
          url: 'report',
          id: 'report',
        },
      ],
    },
    {
      title: t1('online_testing'),
      id: 'online-testing',
      url: getUrl('conf', { menu: 'online-testing' }),
      icon: {
        position: 'left',
        type: 'project',
      },
      description: t1('online-testing'),
      sections: [
        {
          title: t1('exam_config'),
          url: 'online-testing',
          id: 'online-testing',
        },
      ],
    },
    {
      title: t1('organizational_structure'),
      id: 'organizational_structure',
      url: getUrl('conf', { menu: 'organizational_structure' }),
      icon: {
        position: 'left',
        type: 'cluster',
      },
      description: t1('organizational_structure'),
      sections: [
        {
          title: t1('organizational_structure'),
          url: 'organizational_structure',
          id: 'organizational_structure',
        },
      ],
    },
    {
      id: 'payment-affiliate',
      title: t1('payment_&_affiliate'),
      url: getUrl('conf', { menu: 'payment-affiliate' }),
      icon: {
        position: 'left',
        type: 'dollar',
      },
      description: t1('payment_&_affiliate'),
      sections: [
        {
          title: t1('payment'),
          url: 'payment',
          id: 'payment',
        },
        {
          title: t1('aff'),
          url: 'aff',
          id: 'aff',
        },
      ],
    },
  ],
};

export const social = {
  id: 'school-social',
  title: t1('3rd_party_system_integration'),
  open: true,
  subMenu: [
    {
      id: 'social',
      title: t1('3rd_party_system_integration'),
      url: getUrl('conf', { menu: 'social' }),
      icon: {
        position: 'left',
        type: 'share-alt',
      },
      description: t1(
        '3rd_party_system_integration_like_google,_facebook,_vimeo',
      ),
      sections: [
        {
          title: t1('sso_integration'),
          url: 'sso',
          id: 'sso',
          active: 1,
        },
      ],
    },
    {
      title: t1('vimeo_developer_api_tokens'),
      url: getUrl('conf', { menu: 'vimeo' }),
      id: 'vimeo',
      icon: {
        position: 'left',
        type: 'customer-service',
      },
      description: t1('vimeo'),
      sections: [
        {
          title: t1('vimeo'),
          url: 'vimeo',
          id: 'vimeo',
        },
      ],
    },
    {
      title: t1('chat_&_support'),
      url: getUrl('conf', { menu: 'communication' }),
      id: 'communication',
      icon: {
        position: 'left',
        type: 'customer-service',
      },
      description: t1('chat_&_support'),
      sections: [
        {
          title: t1('chat_&_support'),
          url: 'chat',
          id: 'chat',
        },
      ],
    },
  ],
};

export const payment = {
  id: 'school-pay',
  title: t1('payment'),
  open: true,
  subMenu: [
    {
      id: 'payment-affiliate',
      title: t1('payment_&_affiliate'),
      url: getUrl('conf', { menu: 'payment-affiliate' }),
      icon: {
        position: 'left',
        type: 'dollar',
      },
      description: t1('payment_&_affiliate'),
      sections: [
        {
          title: t1('payment'),
          url: 'payment',
          id: 'payment',
        },
        {
          title: t1('aff'),
          url: 'aff',
          id: 'aff',
        },
      ],
    },
  ],
};

export const sys = {
  id: 'school-system',
  title: t1('system'),
  open: true,
  subMenu: [
    {
      title: t1('network_and_infrastructure'),
      url: getUrl('conf', { menu: 'network-and-infrastructure' }),
      id: 'network-and-infrastructure',
      icon: {
        position: 'left',
        type: 'api',
      },
      description: t1('network_and_infrastructure'),
      sections: [
        {
          title: t1('network-and-infrastructure'),
          url: 'network-and-infrastructure',
          id: 'network-and-infrastructure',
        },
      ],
    },
    {
      title: 'S2S API',
      url: getUrl('conf', { menu: 'api' }),
      id: 'api',
      icon: {
        position: 'left',
        type: 'api',
      },
      description: t1('api_configs'),
      sections: [
        {
          title: t1('api_settings'),
          url: 'api',
          id: 'api',
        },
      ],
    },
    {
      title: t1('file_manager'),
      url: getUrl('conf', { menu: 'file_manager' }),
      id: 'file_manager',
      icon: {
        position: 'left',
        type: 'folder-open',
      },
      description: t1('file_manager'),
      sections: [
        {
          title: t1('file_manager'),
          url: 'file_manager',
          id: 'file_manager',
        },
      ],
    },
    // {
    //   title: t1('translations'),
    //   url: getUrl('conf', {
    //     menu: 'school',
    //     type: 'translate',
    //   }),
    //   id: 'translate',
    //   icon: {
    //     position: 'left',
    //     type: 'global',
    //   },
    //   description: t1('translations'),
    //   sections: [
    //     {
    //       title: t1('translate'),
    //       url: 'translate',
    //       id: 'translate',
    //     },
    //   ],
    // },
    {
      title: t1('database'),
      url: getUrl('conf', { menu: 'db' }),
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
    {
      title: t1('others'),
      url: getUrl('conf', { menu: 'others' }),
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
      title: t1('dev'),
      id: 'dev',
      url: getUrl('conf', { menu: 'dev' }),
      icon: {
        position: 'left',
        type: 'code',
      },
      description: t1('dev'),
      sections: [
        {
          title: t1('dev'),
          url: 'dev',
          id: 'dev',
          active: 1,
        },
      ],
    },
    {
      title: t1('job'),
      id: 'job',
      url: getUrl('conf', { menu: 'job' }),
      icon: {
        position: 'left',
        type: 'setting',
      },
      description: t1('job'),
      sections: [
        {
          title: t1('job'),
          url: 'job',
          id: 'job',
          active: 1,
        },
      ],
    },
    {
      title: t1('plugins'),
      id: 'system',
      url: getUrl('conf', { menu: 'system' }),
      icon: {
        position: 'left',
        type: 'api',
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
  ],
};

// for the old conf menu
export default () => [
  ...info.subMenu,
  openCourses,
  training,
  academic,
  mail,
  school,
  social,
  sys,
];

export const schoolMetadata = info.subMenu.concat(openCourses);

export const confCategories = [training, academic, mail, school];
