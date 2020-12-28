import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const Blog = Loadable({
  loader: () =>
    import(/* webpackChunkName: "blog" */ 'routes/route-groups/blog'),
  loading: Loading,
});

export default () => {
  return [
    {
      componentId: 'Blog',
      path: '/blog',
      component: Blog,
    },
  ];
};
