import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'school_message_and_templates',
  title: t3('message_templates'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'message-templates',
      url: getUrl('message-templates'),
      title: t1('message_templates'),
      icon: {
        position: 'left',
        type: 'table',
      },
    },
    {
      id: 'school-message-templates',
      url: getUrl('school-message-templates'),
      title: t1('organize_message_templates'),
      icon: {
        position: 'left',
        type: 'setting',
      },
    },
    {
      title: t1('translations'),
      url: getUrl('conf', {
        menu: 'school',
        type: 'translate',
      }),
      id: 'translate',
      icon: {
        position: 'left',
        type: 'global',
      },
      description: t1('translations'),
    },
  ],
});
