import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const Temis = Loadable({
  loader: () => import('components/temis'),
  loading: Loading,
});

export default () => [
  {
    componentId: 'TemisFrontend',
    path: '/temis',
    component: Temis,
  },
];
