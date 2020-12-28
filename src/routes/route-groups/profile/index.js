import React from 'react';
import { renderRoutes } from 'react-router-config';
import ProfileRoute from 'routes/profile';
import DashboardLayoutHelper from 'components/front-end/dashboard/show-by-tab/Layout';

const routes = (profileUrl) => [
  {
    path: profileUrl,
    component: DashboardLayoutHelper,
    routes: ProfileRoute(profileUrl),
  },
];

const Profile = (props) => {
  const {
    route: { path },
  } = props;
  return renderRoutes(routes(path));
};

export default Profile;
