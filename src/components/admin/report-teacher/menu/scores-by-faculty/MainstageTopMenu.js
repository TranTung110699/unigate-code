import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'scores-by-faculty',
    href: getUrl('report/scores-by-faculty'),
    label: t1('score_by_faculty'),
    icon: 'home',
  },
];

export default menus;
