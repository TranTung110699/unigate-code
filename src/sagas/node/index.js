import { fork } from 'redux-saga/effects';

import fetchNodesSaga from './fetchNodes';
import fetchNodeSaga from './fetchNode';
// import newNodeSaga from './newNode';
import upsertNodeSaga from './upsertNode';
import deepCloneNodeSaga from './deepCloneNode';
import deleteNodeSaga from './deleteNode';
// import updateNodeSaga from './updateNode';
import formSubmitSaga from './formSubmit';
import apiGetDataSaga from './apiGetData';

const nodeSagas = [
  fork(fetchNodesSaga),
  fork(fetchNodeSaga),
  // fork(newNodeSaga),
  fork(upsertNodeSaga),
  fork(deepCloneNodeSaga),
  // fork(updateNodeSaga),
  fork(deleteNodeSaga),
  fork(formSubmitSaga),
  fork(apiGetDataSaga),
];

export default nodeSagas;
