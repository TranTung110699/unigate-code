import React from 'react';
import { renderRoutes } from 'react-router-config';
import DashboardRoute from 'routes/dashboard';
import DashboardLayoutHelper from 'components/front-end/dashboard/show-by-tab/Layout';

const routes = (dashboardUrl) => [
  {
    path: dashboardUrl,
    component: DashboardLayoutHelper,
    routes: DashboardRoute(dashboardUrl),
  },
];

const Dashboard = (props) => {
  const {
    route: { path },
  } = props;
  return renderRoutes(routes(path));
};

export default Dashboard;
