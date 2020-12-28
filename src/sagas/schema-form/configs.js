/**
 * Created by hungvo on 18/04/2017.
 */
import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import actions from 'actions/node/creators';
import { transformServerResultArrayToFormFields } from 'common/utils/form';

const emptyArray = [];

function* formSchemaConfigs(action) {
  const { fieldName, formid } = action;
  const mappingAsync = action.mappingAsync || {};
  const params =
    mappingAsync.params ||
    Object.assign({}, action.params || {}, mappingAsync && mappingAsync.value);

  // const { __url__, params } = mappingAsync;
  // params._sand_form_schema_configs = 1;
  const url = mappingAsync.__url__ || getFormSchemaConfigs(fieldName, formid);

  params.formid = formid;

  const data = yield call(
    Requester.get,
    url, // getFormSchemaConfigs(fieldName, formid),
    params,
  );
  const keyState = (mappingAsync && mappingAsync.key) || fieldName;

  if (data && typeof data.success !== 'undefined') {
    if (data.result && data.result.length) {
      yield put(
        actions.setFormSchemaConfigs(
          transformServerResultArrayToFormFields(data.result, mappingAsync),
          keyState,
          formid,
        ),
      );
    } else {
      // empty list
      yield put(actions.setFormSchemaConfigs('__EMPTY__', keyState, formid));
    }
  }

  if (data && data && typeof data.success !== 'undefined') {
    console.log('error: Nothingfound');
  } else if (!data || !data.success) {
    console.log('network request error ');
  }
}

export default function* formSchemaConfigsSaga() {
  yield takeEvery('FORM_SCHEMA_CONFIGS_REQUEST', formSchemaConfigs);
}
