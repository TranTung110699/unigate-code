import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const AMhywbWh_Loadable = ({ loader, ...rest }) =>
  Loadable({
    loader,
    loading: Loading,
    ...rest,
  });

export default AMhywbWh_Loadable;
