import React from 'react';
import { renderRoutes } from 'react-router-config';
import BuyPackageRoute from 'routes/buy-package';
import LayoutHelper from 'components/buy-package/Layout';

const routes = (buyPackageUrl) => [
  {
    path: buyPackageUrl,
    component: LayoutHelper,
    routes: BuyPackageRoute(buyPackageUrl),
  },
];

const BuyPackage = (props) => {
  const {
    route: { path },
  } = props;
  return renderRoutes(routes(path));
};

export default BuyPackage;
