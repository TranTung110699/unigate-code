import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const RegisterSchool = Loadable({
  loader: () => import('components/admin/school/school/register'),
  loading: Loading,
});
const InitializeSchool = Loadable({
  loader: () => import('components/admin/school/school/initialize'),
  loading: Loading,
});

export default () => [
  {
    componentId: 'RegisterSchool',
    path: '/school/register',
    component: RegisterSchool,
    exact: true,
  },
  {
    componentId: 'InitializeSchool',
    path: '/initialize',
    component: InitializeSchool,
    exact: true,
  },
];
