import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'venues_and_rooms',
  title: t3('misc'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'venue',
      url: getUrl('venue'),
      title: t1('venues'),
      icon: {
        position: 'left',
        type: 'switcher',
      },
    },
    {
      id: 'provinces_districts',
      url: getUrl('search_provinces_or_districts'),
      title: t1('provinces_and_districts'),
      icon: {
        position: 'left',
        type: 'home',
      },
    },
    {
      id: 'school_in_vietnam',
      url: getUrl('search_schools'),
      title: t1('schools_in_vietnam'),
      icon: {
        position: 'left',
        type: 'home',
      },
    },
    {
      id: 'asset',
      url: getUrl('asset/items'),
      title: t1('assets'),
      icon: {
        position: 'left',
        type: 'database',
      },
    },
    {
      id: 'school-bus',
      url: getUrl('bus'),
      title: t1('bus'),
      icon: {
        position: 'left',
        type: 'setting',
      },
    },
    {
      id: 'blog_categories',
      url: getUrl('blog-category'),
      title: t1('blog_categories'),
      icon: {
        position: 'left',
        type: 'tags',
      },
    },
    {
      id: 'faq',
      url: getUrl('faq'),
      title: t1('frequently_asked_questions'),
      icon: {
        position: 'left',
        type: 'question-circle',
      },
    },
  ],
});
