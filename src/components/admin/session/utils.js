import { getCurrentUnixTimestamp } from 'common/utils/Date';
import lGet from 'lodash.get';
import { ILT_BBB } from './common/constants';

export const joinStatuses = {
  JOIN_STATUS_TOO_LATE: 'late',
  JOIN_STATUS_OK: 'ok',
  JOIN_STATUS_TOO_EARLY: 'early',
};

/**
 * return
 *  - 1 if ok to join
 *  - 0 if not ok
 *  - -1 if too late
 * @param session
 * @param beforeCanJoinToLearn
 * @return {*}
 */
export const canJoinToLearn = (
  session,
  beforeCanJoinToLearn = 15 /* minutes*/,
) => {
  const currentUnixTs = getCurrentUnixTimestamp();

  const preClassTime = session.pre_class_time || beforeCanJoinToLearn;
  if (isSessionScheduled(session)) {
    const fromTime =
      session.scheduled.date_time +
      session.scheduled.start_time * 60 -
      preClassTime * 60;
    const toTime =
      session.scheduled.date_time + session.scheduled.end_time * 60;

    if (currentUnixTs <= toTime && currentUnixTs >= fromTime) {
      return joinStatuses.JOIN_STATUS_OK;
    } else if (currentUnixTs > toTime) return joinStatuses.JOIN_STATUS_TOO_LATE;
    else return joinStatuses.JOIN_STATUS_TOO_EARLY;
  }

  return joinStatuses.JOIN_STATUS_TOO_EARLY;
};

export const isSessionScheduled = (session) => {
  return (
    lGet(session, 'scheduled.start_time') &&
    lGet(session, 'scheduled.room_iid') &&
    lGet(session, 'scheduled.end_time') &&
    lGet(session, 'scheduled.date_time') &&
    lGet(session, 'scheduled.teacher_iids')
  );
};

export const isBBB = (session) => {
  return isSessionScheduled(session) && session.location == ILT_BBB;
};
