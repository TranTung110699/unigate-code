import { takeEvery } from 'redux-saga';
import nodeActions from 'actions/node/creators';
import { call, fork, put } from 'redux-saga/effects';
import Requester from 'common/network/http/Request';
import timetableAction, { timetableV2 } from 'actions/timetable/TimetableV2';

function* putResponseMessage(response) {
  if (response && (response.message || response.err)) {
    yield put(
      nodeActions.snackbar(
        response.success ? 'success' : 'error',
        response.message || response.err,
      ),
    );
  }
}

function* upsertTimetable(action) {
  const { url, params, options } = action;

  try {
    const { course, onConflictTimetable, auto_resolve_conflict } = options;
    const response = yield call(Requester.post, url, {
      timetable: { ...params },
      auto_resolve_conflict: auto_resolve_conflict,
      course_iid: course.iid,
    });
    if (response && response.success && response.result) {
      yield put(
        timetableAction.getTimetables({
          start_date: course.start_date,
          end_date: course.end_date,
          room_iids: course && course.room_iids,
        }),
      );
      yield put(timetableAction.getSessions({ course_iid: course.iid }));
    } else if (response) {
      if (typeof onConflictTimetable === 'function') {
        onConflictTimetable(response.conflictSessions, response.conflictEvents);
      }
    }
    yield putResponseMessage(response);
  } catch (e) {
    console.log(e);
  }
}

function* getTimetable(action) {
  const { url, params, options } = action;

  try {
    const response = yield call(Requester.get, url, { ...params });
    if (response && response.success) {
      yield put(timetableAction.storeTimetables(response.result || []));
    } else {
      yield putResponseMessage(response);
    }
  } catch (e) {
    console.log(e);
  }
}

function* getSessions(action) {
  const { url, params, options } = action;

  try {
    const response = yield call(Requester.get, url, { ...params });
    if (!response || !response.success) {
      yield putResponseMessage(response);
    } else if (response && response.success && response.result) {
      yield put(
        timetableAction.storeSessions(params.course_iid, response.result),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* deleteTimetable(action) {
  const { url, params, options } = action;
  const { course } = options;
  try {
    const response = yield call(Requester.get, url, { ...params });
    if (response && response.success) {
      yield put(timetableAction.getSessions(params));
      yield put(
        timetableAction.getTimetables({
          start_date: course.start_date,
          end_date: course.end_date,
          room_iids: course.room_iids,
        }),
      );
    } else {
      yield putResponseMessage(response);
    }
  } catch (e) {
    console.log(e);
  }
}

export const upsertTimetableAction = function* upsertTimetableSaga() {
  yield takeEvery(timetableV2.UPSERT_TIME_TABLE, upsertTimetable);
};
export const getTimetableAction = function* getTimetableSaga() {
  yield takeEvery(timetableV2.GET_TIMETABLES, getTimetable);
};
export const getSessionsAction = function* getSessionsSaga() {
  yield takeEvery(timetableV2.GET_SESSIONS_OF_COURSE, getSessions);
};
export const deleteTimetableAction = function* deleteTimetableSaga() {
  yield takeEvery(timetableV2.REMOVE_TIME_TABLE, deleteTimetable);
};
export default [
  fork(upsertTimetableAction),
  fork(getTimetableAction),
  fork(getSessionsAction),
  fork(deleteTimetableAction),
];
