import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import sessionStorage from 'redux-persist/lib/storage/session'; //
import mySaga from 'sagas/';
import reducers from 'reducers/index';
import { whitelist } from 'reducers/persist-keys';
import addDebuggerToReducer from './addDebuggerToReducer';
import contestLogger from 'components/admin/contest/logger';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const persistConfig = {
  key: 'root', //everything will be stored in storage['persist:root']
  // set this in public/settings.js if you wanna use session storage
  storage: window.REDUX_PERSIST_IN_SESSION_STORAGE ? sessionStorage : storage,
  whitelist,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reducerWithDebugger = addDebuggerToReducer(persistedReducer);

export const getStore = (initialState = {}) => {
  const store = createStore(
    reducerWithDebugger,
    initialState,
    compose(
      applyMiddleware(historyMiddleware, sagaMiddleware, contestLogger),
      // autoRehydrate(), // auto persistence
      devToolsEnhancer ? devToolsEnhancer() : (f) => f,
    ),
  );

  sagaMiddleware.run(mySaga);

  let persistor = persistStore(store);

  // TODO: remove the old key in v4
  if (
    window &&
    window.localStorage &&
    window.localStorage['reduxPersist:user']
  ) {
    delete window.localStorage['reduxPersist:user'];
  }

  return { store, persistor };
};

const theStore = getStore();
export const persistor = theStore.persistor;

const store = theStore.store;
export default store;

// TODO: configure all the name spaces here
// mode = admin|system
export const adminMenuItemsStoreKey = (mode) => `menu_conf_${mode}`;
