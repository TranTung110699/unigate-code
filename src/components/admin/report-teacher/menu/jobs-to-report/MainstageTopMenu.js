import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const menus = () => [
  {
    id: 'jobs-to-report',
    href: getUrl('report/jobs-to-report'),
    label: t1('jobs_to_report'),
    icon: 'cogs',
  },
];

export default menus;
