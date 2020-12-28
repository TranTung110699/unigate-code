import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const report = () => [
  {
    id: 'report_excels',
    href: getUrl('report_excels'),
    label: t1('report_excel'),
  },
  {
    id: 'report_charts',
    href: getUrl('report_charts'),
    label: t1('report_chart'),
  },
];

export default report;
