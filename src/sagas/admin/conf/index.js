import { fork } from 'redux-saga/effects';

// import getMenuConfigSaga from './getMenuConfig';
import reloadDefaultConfValue from './reloadDefaultConfValue';

const confSagas = [fork(reloadDefaultConfValue)];

export default confSagas;
