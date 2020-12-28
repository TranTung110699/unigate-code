import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const transaction = () => [
  {
    href: getUrl('transaction/report'),
    id: 'report_transaction',
    label: t1('report'),
    icon: 'report',
  },
];

export default transaction;
