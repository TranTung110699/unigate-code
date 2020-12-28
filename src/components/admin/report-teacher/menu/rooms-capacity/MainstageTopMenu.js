import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'rooms-capacity',
    href: getUrl('report/rooms-capacity'),
    label: t1('rooms_capacity'),
    icon: 'home',
  },
];

export default menus;
