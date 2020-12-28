import { getUrl } from 'routes/links/common';
import { t1 } from 'translate';

const supportPayment = () => [
  {
    id: 'support_payment',
    href: getUrl('support-payments'),
    label: t1('support_payment'),
    icon: 'paper',
    floatRight: true,
  },
  {
    id: 'unlock_path_by_uiids',
    href: getUrl('unlock-path-by-uiids'),
    label: t1('unlock_path_by_uiids'),
    icon: 'paper',
    floatRight: true,
  },
  {
    id: 'support_migrate_user_locked',
    href: getUrl('support-migrate-user-unlocked'),
    label: t1('unlock_course-path'),
    icon: 'paper',
    floatRight: true,
  },
];

export default supportPayment;
