/**
 * The structure of input should be 20:07 or 20:07:40
 * The return the unix timestamp of the day (in minutes); start is 0 and finished at 24*60
 *
 * @param timeString
 * @returns {*}
 */
export const getTimeFromName = (timeString) => {
  if (!timeString) {
    return 0;
  }

  if (Number.isInteger(timeString)) {
    return timeString;
  }

  const timeDetail = timeString.split(':');

  if (timeDetail.length < 2 || timeDetail.length > 3) {
    return 0;
  }

  return parseInt(timeDetail[0]) * 60 + parseInt(timeDetail[1]);
};

export const Today = () => {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  // date.getTime() / 1000;
  return date;
};

/**
 * Input here are '20:07 or 20:07:40' and 20:07 or 20:07:40
 * if start > end then we will reverse the data like end, start
 *
 * @param startTimeOfDay: 20:07 or 20:07:40
 * @param endTimeOfDay: 20:07 or 20:07:40
 * @returns {startTime: 200, endTime: 400}
 */
export const convertTimeInTimeframeAndReverseIfNeed = (startTime, endTime) => {
  // let startTime = getTimeFromName(startTimeOfDay);
  // let endTime = getTimeFromName(endTimeOfDay);
  if (endTime < startTime) {
    const tmpl = startTime;
    startTime = endTime;
    endTime = tmpl;
  }
  return { startTime, endTime };
};

/**
 * convert from 7 to 07, 0 to 00
 * @param time
 * @returns {string}
 */
export const convertTimeTo2Number = (time) => {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
};

/**
 * This function will return the time (7h:15) from unix timestamp of the day (3423)
 *
 * @param unixTimestamp
 */
export const getTimeName = (unixTimestamp) => {
  if (!unixTimestamp || !Number.isInteger(unixTimestamp)) {
    return unixTimestamp;
  }

  return `${convertTimeTo2Number(
    Math.floor(unixTimestamp / 60),
  )}:${convertTimeTo2Number(unixTimestamp % 60)}`;
};

/**
 *
 * @param startTimeOfDay
 * @param endTimeOfDay
 * @param timeframeOfDay
 * @returns [0, 15, 30, 45, 60]
 */
export const generateAllTimeslotOfCourse = (
  startTimeOfDay,
  endTimeOfDay,
  timeframeOfDay,
) => {
  let { startTime, endTime } = convertTimeInTimeframeAndReverseIfNeed(
    startTimeOfDay,
    endTimeOfDay,
  );
  const timeframe = parseInt(timeframeOfDay);

  const result = [];
  while (startTime < endTime) {
    let nextStartTime = startTime + timeframe;
    nextStartTime = Math.min(nextStartTime, endTime);

    result.push({
      start_time: startTime,
      end_time: nextStartTime,
      start_time_name: getTimeName(startTime),
      end_time_name: getTimeName(nextStartTime),
    });
    startTime = nextStartTime;
  }
  return result;
};

export const generateTimeslotOfCourseForRooms = (
  rooms,
  startTimeOfDay,
  endTimeOfDay,
  timeframeOfDay,
) => {
  const result = [];
  const timeslots = generateAllTimeslotOfCourse(
    startTimeOfDay,
    endTimeOfDay,
    timeframeOfDay,
  );

  if (!rooms || rooms.length === 0) {
    timeslots.map((timeslot) => {
      result.push({
        ...timeslot,
      });
    });

    return result; // chỉ tạo ra timeslot ko có room
  }

  const roomTotal = rooms.length;
  rooms.map((room, numNo) => {
    timeslots.map((timeslot) => {
      result.push({
        ...timeslot,
        className: getLeftBgColor(numNo, roomTotal),
        room: { ...room },
      });
    });
  });

  return result;
};

const getLeftBgColor = (roomNo, totalRoom) => {
  if (totalRoom <= 1) {
    return '';
  }
  let className = 'bg1';
  if (roomNo % 2 === 0) {
    className = 'bg2';
  }

  return className;
};
