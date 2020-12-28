import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

const ReportUserLearnMenus = () => [
  {
    icon: 'home',
    id: 'user_learn',
    href: getUrl('report/user-learns'),
    label: t1('students_by_course'),
  },
];

export default ReportUserLearnMenus;
