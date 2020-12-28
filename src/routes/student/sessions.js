import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const Sessions = Loadable({
  loader: () => import('components/front-end/sessions'),
  loading: Loading,
});

export default () => [
  {
    componentId: 'Sessions',
    path: '/sessions',
    component: Sessions,
  },
];
