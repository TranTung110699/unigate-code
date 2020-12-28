import get from 'lodash.get';
import { fromArrayToKeyValueObject } from 'common/utils/Array';

/**
 *
 * @param startTime
 * @param endTime
 */
export const generateDateFrameByRoundTime = (pStartTime, pEndTime) => {
  if (!pStartTime || !pEndTime) {
    return null;
  }

  const date = new Date();
  date.setTime(pStartTime * 1000);
  date.setHours(0, 0, 0, 0);
  const startTime = date.getTime() / 1000;

  date.setTime(pEndTime * 1000);
  date.setHours(0, 0, 0, 0);
  const endTime = date.getTime() / 1000;

  const roundTime = endTime - startTime;
  const totalDay = parseInt(roundTime / 86400, 10);

  const res = [];
  for (let day = 0; day <= totalDay; day += 1) {
    date.setTime((startTime + day * 86400) * 1000);
    res.push({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }

  return res;
};

export const makeArrayAttendanceToKeyMap = (attendances) => {
  if (!Array.isArray(attendances)) {
    return {};
  }

  const object = {};

  attendances.forEach((attendance) => {
    const session = get(attendance, 'session');
    if (!session) {
      return;
    }
    const key = `${session.day}-${session.month}-${session.year}`;
    object[key] = fromArrayToKeyValueObject(
      get(attendance, 'attendances'),
      'user_iid',
    );
  });

  return object;
};
