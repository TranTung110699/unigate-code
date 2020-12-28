import { DefinedUrlParams } from 'routes/links/common';
import Loadable from 'react-loadable';
import Loading from 'components/common/loading';
import userLinks from 'routes/links/user';

const ForgotPassword = Loadable({
  loader: () => import('components/user/forgot-password/Layout'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('components/user/auth/login'),
  loading: Loading,
});
const Register = Loadable({
  loader: () => import('components/user/auth/register'),
  loading: Loading,
});

const UserUpdate = Loadable({
  loader: () => import('components/user/update/Layout'),
  loading: Loading,
});

export default () => [
  {
    componentId: 'UserUpdate',
    path: userLinks.update,
    component: UserUpdate,
    exact: true,
  },
  {
    componentId: 'UserUpdateWithStep',
    path: `${userLinks.update}/:${DefinedUrlParams.STEP}`,
    component: UserUpdate,
    exact: true,
  },
  {
    componentId: 'login',
    path: userLinks.login,
    component: Login,
    exact: true,
  },
  {
    componentId: 'register',
    path: userLinks.register,
    component: Register,
    exact: true,
  },
  {
    componentId: 'ForgotPassword',
    path: userLinks.forgot_password,
    component: ForgotPassword,
    exact: true,
  },
];
