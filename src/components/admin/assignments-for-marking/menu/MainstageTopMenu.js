import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const menus = () => [
  {
    id: 'assignments-for-marking',
    href: getUrl('assignments-for-marking'),
    label: t1('assignments_for_marking'),
    exact: true,
  },
];

export default menus;
