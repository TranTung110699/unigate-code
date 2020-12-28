import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'scores-by-major',
    href: getUrl('report/scores-by-major'),
    label: t1('score_by_major'),
    icon: 'home',
  },
];

export default menus;
