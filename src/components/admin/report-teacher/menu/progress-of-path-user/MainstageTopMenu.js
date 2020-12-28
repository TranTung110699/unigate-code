import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'progress-of-path-user',
    href: getUrl('report/progress-of-path-user'),
    label: t1('progress_of_path_user'),
    icon: 'home',
  },
];

export default menus;
