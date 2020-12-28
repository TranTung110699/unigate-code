import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'teaching-hours',
    href: getUrl('report/teaching-hours'),
    label: t1('teaching_hours'),
    icon: 'home',
  },
];

export default menus;
