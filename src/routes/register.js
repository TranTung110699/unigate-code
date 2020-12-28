import { LayoutRegistered } from 'layouts/LayoutHelper';
import Loadable from 'components/common/async-loader/Loadable';
import RootLayout from 'layouts';

import {
  adminRootUrl,
  buyPackage,
  buyPackageUrl,
  dashboardUrl,
  learnRootUrl,
  profileUrl,
  scheduleRoomUrl,
  systemRootUrl,
} from './root-url';

// frontend
import frontendRoutes from './student/frontend';
import studentDashboardRoutes from './student/student-dashboard';
import learnRoutes from './student/learn';
import schoolSaasRoutes from './school-saas';
import contestRoutes from './student/contest';
import blogRoutes from './student/blog';
import accountRoutes from './student/account';
import testRoutes from './student/test';
import xpeakRoutes from './student/xpeak';
import temisRoutes from './student/temis';
import sessionsRoutes from './student/sessions';

const RoomSchedule = Loadable({
  loader: () => import('components/timetable_v2/viewers/rooms'),
});

const Admin = Loadable({
  loader: () =>
    import(/* webpackChunkName: "admin" */ 'routes/route-groups/admin'),
});

const System = Loadable({
  loader: () =>
    import(/* webpackChunkName: "system" */ 'routes/route-groups/system'),
});

const Dashboard = Loadable({
  loader: () =>
    import(/* webpackChunkName: "dashboard" */ 'routes/route-groups/dashboard'),
});

const Profile = Loadable({
  loader: () =>
    import(/* webpackChunkName: "profile" */ 'routes/route-groups/profile'),
});

const NoMatch = Loadable({
  loader: () =>
    import(/* webpackChunkName: "profile" */ 'components/common/404/index'),
});

const BuyPackage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "BuyPackage" */ 'routes/route-groups/buy-package'),
});

const routes = [
  {
    component: RootLayout,
    routes: [
      {
        path: scheduleRoomUrl,
        component: RoomSchedule,
        layout: LayoutRegistered.embedded,
      },
      {
        path: dashboardUrl,
        component: Dashboard,
      },
      {
        path: profileUrl,
        component: Profile,
      },
      /************dashboard stuff*****************/
      ...frontendRoutes(learnRootUrl),
      ...studentDashboardRoutes(),
      ...learnRoutes(learnRootUrl),
      ...contestRoutes(),
      ...accountRoutes(),
      ...testRoutes(learnRootUrl),
      ...blogRoutes(),
      ...schoolSaasRoutes(),
      ...xpeakRoutes(),
      ...temisRoutes(),
      ...sessionsRoutes(),
      /************student frontend*****************/
      {
        path: adminRootUrl,
        component: Admin,
        layout: LayoutRegistered.admin,
      },
      {
        path: systemRootUrl,
        component: System,
        layout: LayoutRegistered.admin,
      },
      {
        path: buyPackageUrl,
        component: BuyPackage,
      },
      {
        component: NoMatch,
      },
    ],
  },
];

export default routes;
