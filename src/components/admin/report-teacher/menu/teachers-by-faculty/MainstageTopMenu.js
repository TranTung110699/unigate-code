import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'teachers-by-faculty',
    href: getUrl('report/teachers-by-faculty'),
    label: t1('teachers_by_faculty'),
    icon: 'users',
  },
];

export default menus;
