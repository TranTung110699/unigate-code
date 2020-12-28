import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'teachers-by-credit',
    href: getUrl('report/teachers-by-credit'),
    label: t1('teachers_by_credit'),
    icon: 'user-circle',
  },
];

export default menus;
