import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import nodeActions from 'actions/node/creators';
import actions from 'actions/creators';
import { t1 } from 'translate';
import { importDataStatuses } from 'configs/constants';

function* confirmImportData(action) {
  const { url, params } = action;

  try {
    yield put(
      actions.saveImportDataStatus({ status: importDataStatuses.IMPORTING }),
    );
    const data = yield call(Requester.post, url, params);

    if (data.success) {
      yield put(
        actions.saveImportDataStatus({ status: importDataStatuses.DONE }),
      );
      yield put(nodeActions.snackbar(true, `${t1('import_data_successful')}!`));
    } else {
      yield put(
        actions.saveImportDataStatus({ status: importDataStatuses.FAILED }),
      );
      yield put(nodeActions.snackbar(true, `${t1('import_data_failed')}!`));
    }
  } catch (ex) {
    yield put(
      actions.saveImportDataStatus({ status: importDataStatuses.FAILED }),
    );
    yield put(nodeActions.snackbar(true, `${t1('import_data_failed')}!`));
  }
}

export default function* confirmImportDataSaga() {
  yield takeEvery('CONFIRM_IMPORT_DATA_REQUEST', confirmImportData);
}
