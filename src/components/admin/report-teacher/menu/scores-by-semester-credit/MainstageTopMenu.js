import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'scores-by-semester-credit',
    href: getUrl('report/scores-by-semester-credit'),
    label: t1('scores_by_semester'),
    icon: 'home',
  },
];

export default menus;
