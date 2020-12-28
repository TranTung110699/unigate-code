import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import nodeActions from 'actions/node/creators';
import actions from 'actions/node/creators';
import Requester from 'common/network/http/Request';
import {
  CREATE_NEW_TIMETABLE_REQUEST,
  DELETE_TIMETABLE,
  UPDATE_TIMETABLE,
} from 'actions/timetable';

function* createNewTimeTable(action) {
  const { url, formid, timetable, options } = action;
  yield put(actions.updateRowOnSearChResults(formid, timetable.id, timetable));
  const response = yield call(Requester.post, url, {
    timetable: timetable,
    allowDoUpdateIfConflict:
      options && options.allowDoUpdateIfConflict ? true : false,
    deleteTimeTableId: options.deleteTimeTableId,
    mainClassIid: options.mainClassIid,
  });

  yield call(
    processResultOnRequestUpsert,
    timetable,
    response,
    options,
    formid,
  );
}

function* updateTimeTable(action) {
  const { url, formid, timetable, options } = action;

  const response = yield call(Requester.post, url, {
    timetable: timetable,
    allowDoUpdateIfConflict:
      options && options.allowDoUpdateIfConflict ? true : false,
    deleteTimeTableId: options.deleteTimeTableId,
    mainClassIid: options.mainClassIid,
  });
  yield call(
    processResultOnRequestUpsert,
    timetable,
    response,
    options,
    formid,
  );
}

function* updateDataOfTimeTable(action) {
  const {
    url,
    formid,
    timetable,
    updateType,
    dayOfUpdateInTimeStamp,
    options,
    data,
  } = action;

  const timesAndTimeTableIids = options
    ? options.times_and_time_table_iids
    : {};
  const timeTableIid = options ? options.timeTableIid : undefined;

  const response = yield call(Requester.post, url, {
    timetable: timetable,
    allowDoUpdateIfConflict:
      options && options.allowDoUpdateIfConflict ? true : false,
    updateType: updateType,
    dayOfUpdateInTimeStamp,
    updateData: data,
    timesAndTimeTableIids,
    timeTableIid,
    mainClassIid: options.mainClassIid,
  });

  yield call(
    processResultOnRequestUpsert,
    timetable,
    response,
    options,
    formid,
  );
}

function* processResultOnRequestUpsert(timetable, response, options, formid) {
  if (!response.success) {
    if (options.onFail) {
      options.onFail(response);
    }
    return;
  }
  if (
    options.onConflict &&
    response &&
    response.success &&
    response.result &&
    !response.result.confirmed &&
    response.result.dailySchedulesConflict &&
    response.result.dailySchedulesConflict.length > 0
  ) {
    options.onConflict(
      timetable,
      response['result']['dailySchedulesConflict'],
      options,
    );
    return;
  }

  if (timetable) {
    yield put(actions.deleteRowOnSearChResults(formid, timetable.id));
  } else if (response['result'] && response['result']['timetableId']) {
    yield put(
      actions.deleteRowOnSearChResults(
        formid,
        response['result']['timetableId'],
      ),
    );
  }

  if (
    response &&
    response.success &&
    response.result &&
    response.result.updateData
  ) {
    let clientState = {};
    if (timetable && timetable.clientState) {
      clientState = { ...timetable.clientState };
    }
    let timetables = response.result.updateData;

    if (timetables.length > 0) {
      for (let i = 0; i < timetables.length; i++) {
        let t = timetables[i];
        let id = timetables[i]['id'];
        if (i === 0 && timetable) {
          id = timetable.id;
          t = { ...t, clientState: { ...clientState } };
        }
        yield put(
          actions.updateRowOnSearChResults(formid, id, {
            ...t,
            isNew: false,
            clientState: { ...clientState },
          }),
        );
      }
    }

    if (options && options.onSuccess) {
      options.onSuccess(response.result);
    }
  }

  if (
    response &&
    ((response.result && response.result.message) || response.message)
  ) {
    yield put(
      nodeActions.snackbar(
        true,
        (response.result && response.result.message) || response.message,
      ),
    );
  }
}

function* deleteTimeTable(action) {
  const { url, formid, timetable, options } = action;
  yield put(actions.deleteRowOnSearChResults(formid, timetable.id));
  const response = yield call(Requester.post, url, {
    id: timetable.id,
    mainClassIid: options.mainClassIid,
  });

  if (!response || !response.success) {
    //rollback data
    yield put(
      actions.updateRowOnSearChResults(formid, timetable.id, timetable),
    );
  } else {
    if (options && options.onSuccess) {
      options.onSuccess(response.result);
    }
  }
}

function* addRoomsToClass(action) {
  const { url, room_iids, class_iid } = action;

  try {
    const response = yield call(Requester.post, url, {
      room_iids,
      class_iid,
    });
    if (response && response.success && response.result) {
      yield put(actions.treeUpsertNode(response.result));
      yield put(
        nodeActions.fetchNode({
          iid: class_iid,
          ntype: 'course',
          depth: 2,
          is_timetable: true,
        }),
      );
    } else if (response && response.err) {
      yield put(nodeActions.snackbar(true, response.err));
    }
  } catch (e) {
    console.log(e);
  }
}

function* removeRoomFromClass(action) {
  const { url, room_iid, class_iid } = action;

  try {
    const response = yield call(Requester.post, url, {
      room_iid,
      class_iid,
    });
    if (response && response.success && response.result) {
      yield put(actions.treeUpsertNode(response.result));
      yield put(
        nodeActions.fetchNode({
          iid: class_iid,
          ntype: 'course',
          depth: 2,
          is_timetable: true,
        }),
      );
    } else if (response && response.err) {
      yield put(nodeActions.snackbar(true, response.err));
    }
  } catch (e) {
    console.log(e);
  }
}

export const createNewTimeTableAction = function* createNewTimeTableSaga() {
  yield takeEvery(CREATE_NEW_TIMETABLE_REQUEST, createNewTimeTable);
};

export const updateTimeTableAction = function* updateTimeTableSaga() {
  yield takeEvery(UPDATE_TIMETABLE, updateTimeTable);
};

export const updateDataOfTimeTableAction = function* updateDataOfTimeTableSaga() {
  yield takeEvery('UPDATE_DATA_OF_TIMETABLE', updateDataOfTimeTable);
};
export const deleteTimeTableAction = function* deleteTimeTableSaga() {
  yield takeEvery(DELETE_TIMETABLE, deleteTimeTable);
};
export const addRoomsToClassAction = function* addRoomsToClassSaga() {
  yield takeEvery('ADD_ROOMS_TO_CLASS', addRoomsToClass);
};
export const removeRoomFromClassAction = function* removeRoomFromClassSaga() {
  yield takeEvery('REMOVE_ROOMS_TO_CLASS', removeRoomFromClass);
};

export default [
  fork(createNewTimeTableAction),
  fork(updateTimeTableAction),
  fork(updateDataOfTimeTableAction),
  fork(deleteTimeTableAction),
  fork(addRoomsToClassAction),
  fork(removeRoomFromClassAction),
];
