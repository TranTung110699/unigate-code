import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBaseTheme, MuiThemeProvider } from 'material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { renderRoutes } from 'react-router-config';
import store, { history, persistor } from './store';
import appRouters from './routes/register';
import lodashGet from 'lodash.get';
import { MediaGroupContextProvider } from 'components/common/enhanced-react-player/media-group';
import { EnabledFeaturesContextProvider } from 'feature-flag/contexts/enabled-features';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

window.rootAppContainer = document.getElementById('root');

//==============UTILITY FUNCTIONS FOR DEBUGING REDUX STORE ============================

/**
 * to log the current redux state
 * if you only want to log a small part of state, pass 'path' param
 *
 * E.g:
 * state = {
 *   a: 'value of a',
 *   b: 'value of b'
 * }
 *
 * logState() => {a: 'value of a', b: 'value of b'}
 * logState('a') => 'value of a'

 * @param path
 */
window.logState = (path) => {
  const state = store.getState();
  if (path) {
    console.log(lodashGet(state, path));
  } else {
    console.log(state);
  }
};
//=====================================================================================

const loading = <div>persistor loading...</div>;

/**
 * the requirement is that there is at most one active media player on screen
 * so we need MediaGroupContextProvider,
 * if the requirement change, you can remove it
 */
render(
  <EnabledFeaturesContextProvider>
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <MediaGroupContextProvider>
            <ConnectedRouter history={history}>
              {renderRoutes(appRouters)}
            </ConnectedRouter>
          </MediaGroupContextProvider>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  </EnabledFeaturesContextProvider>,
  window.rootAppContainer,
);
