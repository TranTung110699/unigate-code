import React from 'react';
import { renderRoutes } from 'react-router-config';
import SystemRouter from 'routes/system';

const routes = (systemRootUrl) => SystemRouter(systemRootUrl);

const System = (props) => {
  const {
    route: { path },
  } = props;
  return renderRoutes(routes(path));
};

export default System;
