import { call, put, takeEvery } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import apiUrls from 'api-endpoints';
import { setPaperId } from 'actions/learn/index';
import actions from 'actions/node/creators';
import { loadingStatuses } from 'configs/constants';
import nodeActions from 'actions/creators';

//= ======================fetchNodeSaga=================================
function* fetchNode(action) {
  const {
    iid,
    ntype,
    depth,
    learning,
    is_timetable,
    slug,
    syllabus_iid,
    is_testing,
    take_id,
    taker_uiid,
    courseIid,
    exam_order,
    transformResult,
    paper_id,
    user_iid,
    class_iid,
    is_preview,
    session_iid,
    exam_mode,
    editing_syllabus,
    loadingStatusKey,
  } = action;

  const params = {
    ntype,
    depth,
    syllabus_iid,
    is_testing,
    taker_uiid,
    take_id,
    exam_order,
    paper_id,
    is_timetable,
    class_iid,
    user_iid,
    is_preview,
    session_iid,
    exam_mode,
    editing_syllabus,
  };

  if (iid) {
    params.iid = iid;
  } else if (slug) {
    params.slug = slug;
  } else if (!(is_testing && syllabus_iid) && !(class_iid && user_iid)) {
    return;
  }

  if (courseIid) {
    params.ciid = courseIid;
  }
  // TODO: make sure learn screen doesn't get this
  if (!learning || editing_syllabus) {
    params.editing_syllabus = editing_syllabus || 1;
  }

  const actionToSetLoadingStatusToSet = (status) =>
    nodeActions.changeLoadingStatus({
      status,
      [loadingStatusKey]: status,
    });

  try {
    yield put(actionToSetLoadingStatusToSet(loadingStatuses.LOADING));

    const api = action.apiUrl || apiUrls.fetch_node;
    const data = yield call(Requester.get, api, params);

    if (data && data.success && data.result) {
      if (typeof transformResult === 'function') {
        data.result = transformResult(data.result);
      }
      yield put(actions.treeUpsertNode(data.result, 'INSERT', is_testing));

      if (action.executeOnSuccess) {
        yield action.executeOnSuccess(data.result);
      }

      if (is_testing && data.result && data.result.paper_id) {
        yield put(setPaperId(data.result.paper_id));
      }
    } else if (data && typeof data.success !== 'undefined') {
      // yield call(reject, {location: 'No data for that location'});
      console.log('error: Nothingfound');
    } else {
      console.log('network request error ');
    }
  } catch (e) {
    console.log(e);
  }
  yield put(actionToSetLoadingStatusToSet(loadingStatuses.FINISHED));
}

export default function* fetchNodeSaga() {
  yield takeEvery('FETCH_NODE', fetchNode);
}
