import { call, put, takeEvery } from 'redux-saga/effects';
import nodeActions from 'actions/node/creators';

import Requester from 'common/network/http/Request';
import actions from 'actions/creators';
import { importDataStatuses } from 'configs/constants';
import { t1 } from 'translate';

function* importData({ urlNew, urlSearch, key, params, options }) {
  try {
    yield put(
      actions.saveImportDataStatus({ status: importDataStatuses.START }),
    );

    const data = yield call(Requester.get, urlNew, params);

    if (!data.success) {
      yield put(nodeActions.snackbar(true, data.message));
      return;
    }

    yield put(nodeActions.snackbar(true, t1('imported_successfully')));
    if (options && options.onRequestSuccessful) {
      options.onRequestSuccessful(data);
    }

    yield put(nodeActions.updateSearchResults(data.result, `${key}_metadata`));

    const searchParams = {
      import_id: data.result.import_id,
    };

    if (urlSearch) {
      const searchData = yield call(Requester.get, urlSearch, searchParams);

      if (searchData.success) {
        yield put(nodeActions.updateSearchResults(searchData, `${key}_items`));

        if (searchData.result.map) {
          yield searchData.result.map((item) =>
            put(nodeActions.treeUpsertNode(item)),
          );
        }
      }
    }
  } catch (ex) {
    console.log(ex);
  }
}

export default function* importDataSaga() {
  yield takeEvery('IMPORT_DATA_REQUEST', importData);
}
