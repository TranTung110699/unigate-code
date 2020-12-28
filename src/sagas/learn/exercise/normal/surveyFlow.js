import { call, put, race, select, take, takeEvery } from 'redux-saga/effects';
import get from 'lodash.get';
import {
  getSaveSurveyTakeParamsSelector,
  modes,
  steps,
} from 'common/learn/exercise';
import {
  getLearnCourseIidSelector,
  getLearnItemInfoSelector,
} from 'common/learn';
import {
  INIT_SURVEY,
  SUBMIT_SURVEY,
} from 'actions/learn/exercise/normal/saga-creators';
import { saveItemInfo, setUserAnswers } from 'actions/learn';
import { saveSurveyTakeRequest } from 'actions/learn/saga-creators';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';

import Requester from 'common/network/http/Request';
import coreFlow from './coreFlow';

function* saveTake(itemIid) {
  const getSaveTakeParams = yield select(getSaveSurveyTakeParamsSelector);
  const saveTakeParams = yield call(getSaveTakeParams, itemIid);
  yield put(saveSurveyTakeRequest(itemIid, saveTakeParams));
}

function* getOldSurveyTake(itemIid) {
  const selectInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(selectInfo, itemIid);
  const courseIid = yield select(getLearnCourseIidSelector);
  const data = yield call(Requester.get, sApiUrls.get_survey_take, {
    survey_applied_item_relation_id: info.survey_applied_item_relation_id,
    survey_iid: itemIid,
    item_iid: get(info, 'item_iid') || courseIid,
    type: get(info, 'item_type'),
  });

  if (data && data.success) {
    return data.result;
  }
  return null;
}

function* waitForActionAndSubmitSurvey(itemIid) {
  while (true) {
    yield take(
      (action) =>
        action.type === SUBMIT_SURVEY &&
        String(action.itemIid) === String(itemIid),
    );

    yield call(saveTake, itemIid);
  }
}

function* surveyFlow(itemIid) {
  const selectInfo = yield select(getLearnItemInfoSelector);
  const info = yield call(selectInfo, itemIid);

  if (info.mode === modes.NORMAL) {
    const oldSurveyTake = yield call(getOldSurveyTake, itemIid);
    if (oldSurveyTake) {
      yield put(setUserAnswers(itemIid, oldSurveyTake.answers));
    }
  }

  yield put(saveItemInfo(itemIid, { step: steps.MAIN }));

  let racingFlows = {
    coreFlow: call(coreFlow, itemIid),
  };

  if (info.mode === modes.NORMAL) {
    racingFlows = {
      ...racingFlows,
      waitForActionAndSubmitSurvey: call(waitForActionAndSubmitSurvey, itemIid),
    };
  }

  yield race(racingFlows);
}

export default function* exerciseFlowSaga() {
  yield takeEvery(INIT_SURVEY, function*(action) {
    const { itemIid, info } = action;
    yield put(saveItemInfo(itemIid, info));
    yield call(surveyFlow, itemIid);
  });
}
