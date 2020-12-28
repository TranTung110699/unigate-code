import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const SchoolMenu = () => [
  {
    id: 'school',
    href: getUrl('school/search-school', { rootUrl: '/system' }),
    label: t1('school'),
    icon: 'home',
  },
];

export default SchoolMenu;
