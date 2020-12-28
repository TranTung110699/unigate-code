import { getUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';

export default () => ({
  id: 'import',
  title: t3('import'),
  icon: {
    position: 'left',
    type: 'form',
  },
  subMenu: [
    {
      id: 'import_rubrics',
      url: getUrl('import-rubrics'),
      title: t1('import_rubrics'),
      icon: {
        position: 'left',
        type: 'table',
      },
    },
    {
      id: 'bank',
      url: getUrl('bank', { type: 'question' }),
      title: t1('import_questions'),
      icon: {
        position: 'left',
        type: 'bank',
      },
    },
  ],
});
