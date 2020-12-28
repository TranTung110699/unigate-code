import { t1 } from 'translate';

// inside roles & staff menu , we have 2 separate tabs: 1 for roles and 1 for staff
// action : staff|roles
export const navItems = (action, editBaseUrl) => [
  {
    active: action === 'staff',
    link: `${editBaseUrl}/staff`,
    label: t1('staff'),
  },
  {
    active: action === 'roles',
    link: `${editBaseUrl}/roles`,
    label: t1('roles'),
  },
];
