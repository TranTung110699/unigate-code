import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { appRouters } from './routes/register';
import { Switch } from 'react-router-dom';
import 'react-virtualized/styles.css';

class App extends Component {
  render() {
    return <Switch>{renderRoutes(appRouters)}</Switch>;
  }
}

export default hot(module)(App);
