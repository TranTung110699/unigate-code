import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const transaction = [
  {
    href: getUrl('transaction'),
    id: 'timetable_admin',
    label: t1('search'),
    icon: 'search',
  },
  {
    href: getUrl('transaction/report'),
    id: 'report_transaction',
    label: t1('report'),
    icon: 'report',
  },
];

export default transaction;
