import { arrayToString } from 'common/utils/string';
import { getTimeName } from 'components/timetable_v2/utils/DailyUnixTimestamp';
import { t1 } from 'translate';
import urlApis from 'api-endpoints';
import get from 'lodash.get';

function getDate(timestamp, minute) {
  const date = new Date(parseInt(`${timestamp}000`, 0));
  date.setHours(parseInt(minute, 10) / 60);
  date.setMinutes(parseInt(minute, 10) % 60);
  return date;
}

function createTitle(course, room, learningItems) {
  let title = '';
  if (get(course, 'name')) {
    title += `${t1('subject')}: ${course.name}`;
  }

  if (room) {
    title += ` - ${t1('room')}: ${arrayToString(room, 'name')}`;
  }

  if (learningItems) {
    title += ` - ${t1('learning_items')}: ${arrayToString(
      learningItems,
      'name',
    )}`;
  }
  return title;
}

function getSchedulesFromSession(
  session,
  rootUrl,
  generateLinkForOnlicked,
  userIid,
) {
  if (!session) return null;

  const { course, scheduled, room } = session;
  const startTime = parseInt(get(scheduled, 'start_time'), 10);
  const endTime = parseInt(get(scheduled, 'end_time'), 10);
  const dateTime = parseInt(get(scheduled, 'date_time'), 10);

  return {
    start: getDate(dateTime, startTime),
    end: getDate(dateTime, endTime),
    title: createTitle(course, room, session.learning_items),
    desc: endTime - startTime,
    course,
    teachers: session.teachers,
    room: get(room, '[0]'),
    timeFrom: getTimeName(startTime),
    timeTo: getTimeName(endTime),
    absent: (get(session, 'absent', []) || []).includes(parseInt(userIid, 10)),
    learning_items: session.learning_items,
    time_slot: dateTime,
    linkTo: generateLinkForOnlicked
      ? generateLinkForOnlicked(course, session)
      : urlApis.attendance_manage(course && course.iid, session.iid, rootUrl),
  };
}

export function convertSessionToSchedule(
  sessions,
  rootUrl,
  generateLinkForOnlicked,
  userIid,
) {
  if (!sessions) return [];

  return sessions
    .map((session) =>
      getSchedulesFromSession(
        session,
        rootUrl,
        generateLinkForOnlicked,
        userIid,
      ),
    )
    .filter(Boolean);
}
