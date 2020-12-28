import React from 'react';
import Loadable from 'components/common/async-loader/Loadable';
import { renderRoutes } from 'react-router-config';
import AdminRouter from 'routes/admin/index';
import nodeEditContainer from 'routes/nodeEditContainer';

import HashDialog from 'components/common/modal/HashDialog';
import BankDialog from 'components/admin/node/bank/Dialog';

const Dev = Loadable({
  loader: () => import(/* webpackChunkName: "dev" */ './dev'),
});

const routes = (adminRootUrl) => [
  {
    path: `${adminRootUrl}/dev`,
    component: Dev,
  },
  ...AdminRouter(adminRootUrl),
  ...nodeEditContainer(adminRootUrl),
];

const Admin = (props) => {
  const {
    route: { path },
  } = props;
  return (
    <div>
      {renderRoutes(routes(path))}
      <BankDialog />
      <HashDialog />
    </div>
  );
};

export default Admin;
