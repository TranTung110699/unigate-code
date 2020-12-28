import Loadable from 'components/common/async-loader/Loadable';

export default Loadable({
  loader: () =>
    import(/* webpackChunkName: "AttachmentComponent" */ './Component'),
});
