import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'academic_settings',
  title: t3('academic_settings'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'academic-category',
      url: getUrl('academic-category'),
      title: t1('course_categories'),
      icon: {
        position: 'left',
        type: 'tags',
      },
      // hash: true,
    },
    {
      id: 'rubric',
      url: getUrl('rubric'),
      title: t1('rubrics'),
      icon: {
        position: 'left',
        type: 'bars',
      },
    },
    {
      id: 'degree',
      url: getUrl('degree'),
      title: t1('degree'),
      icon: {
        position: 'left',
        type: 'file-protect',
      },
    },
    {
      id: 'survey',
      url: getUrl('survey'),
      title: t1('survey'),
      icon: {
        position: 'left',
        type: 'pie-chart',
      },
    },
    {
      id: 'major',
      url: getUrl('major'),
      title: t1('majors'),
      icon: {
        position: 'left',
        type: 'radar-chart',
      },
    },
  ],
});
