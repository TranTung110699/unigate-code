import React from 'react';
// import { getProfileUrl } from 'routes/links/common';
import userLinks from 'routes/links/user';
import UpdateUser from 'components/user/update/Layout';

const ProfileDashboard = () => <UpdateUser updateType="dashboard" />;
const UpdateInfo = () => <UpdateUser updateType="info" />;
const UpdateAvatar = () => <UpdateUser updateType="avatar" />;
const ChangePass = () => <UpdateUser updateType="change-password" />;
const MyOrder = () => <UpdateUser updateType="my-order" />;

export default (rootUrl) => [
  {
    path: userLinks.dashboard,
    component: ProfileDashboard,
    exact: true,
  },
  {
    path: userLinks.update_profile_info,
    component: window.isETEP ? ProfileDashboard : UpdateInfo,
    exact: true,
  },
  {
    path: userLinks.update_profile_avatar,
    component: UpdateAvatar,
    exact: true,
  },
  {
    path: userLinks.update_password,
    component: ChangePass,
    exact: true,
  },
  {
    path: userLinks.myOrder,
    component: MyOrder,
    exact: true,
  },
];
