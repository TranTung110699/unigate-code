import { DefinedUrlParams, getCatalogueUrl } from 'routes/links/common';
import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const DashboardLayout = Loadable({
  loader: () => import('components/front-end/dashboard/Layout'),
  loading: Loading,
});

export default () => {
  return [
    {
      componentId: 'DashboardPage',
      path: '/:dashboard(learn|teach|dashboard|request)',
      component: DashboardLayout,
      exact: true,
    },
    {
      componentId: 'SubDashboardPage',
      path: `/:dashboard(learn|teach|dashboard|request)/:${
        DefinedUrlParams.NTYPE
      }`,
      component: DashboardLayout,
      exact: true,
    },
    {
      componentId: 'SubDashboardPage1',
      path: `/:dashboard(learn)/:${DefinedUrlParams.NTYPE}/:${
        DefinedUrlParams.TIMESTAMP
      }(\\d+)`,
      component: DashboardLayout,
      exact: true,
    },
    {
      componentId: 'DashboardPageNews',
      path: `/:dashboard(learn|teach)/:${DefinedUrlParams.NTYPE}/:${
        DefinedUrlParams.SLUG
      }.html`,
      component: DashboardLayout,
      exact: true,
    },
  ];
};
