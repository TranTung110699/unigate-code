import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const Tests = Loadable({
  loader: () => import('components/front-end/test'),
  loading: Loading,
});

export default (learnRootUrl) => [
  {
    componentId: 'Test',
    path: '/tests',
    component: Tests,
    exact: true,
  },
  {
    componentId: 'TestWithType',
    path: '/tests/:type',
    component: Tests,
    exact: true,
  },
  {
    componentId: 'TestWithTypeAndIid',
    path: '/tests/:type/:iid',
    component: Tests,
  },
];
