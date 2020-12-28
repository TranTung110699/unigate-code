import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

export const menuItems = [
  {
    id: 'multi-degree',
    url: getUrl('plan/multi-degree'),
    title: t1('multi_degree'),
    icon: {
      position: 'left',
      type: 'book',
    },
  },
  {
    id: 'major-program',
    url: getUrl('plan/major-program'),
    title: t1("major's_program"),
    icon: {
      position: 'left',
      type: 'book',
    },
  },
  {
    id: 'overview',
    url: getUrl('plan/overview'),
    title: t1('overview'),
    icon: {
      position: 'left',
      type: 'appstore',
    },
  },
  {
    id: 'create',
    url: getUrl('plan/create'),
    title: t1('edit_or_create'),
    icon: {
      position: 'left',
      type: 'edit',
    },
  },
  {
    id: 'help',
    url: getUrl('plan/help'),
    title: t1('help'),
    icon: {
      position: 'left',
      type: 'question-circle',
    },
  },
];
