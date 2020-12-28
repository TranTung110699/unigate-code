import React from 'react';
import { renderRoutes } from 'react-router-config';

import DevRouter from 'routes/dev';

const Dev = (props) => {
  const {
    route: { path },
  } = props;
  return renderRoutes(DevRouter(path));
};

export default Dev;
