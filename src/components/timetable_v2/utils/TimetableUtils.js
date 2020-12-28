import { max } from 'common/utils/Array';
import lodashGet from 'lodash.get';

export const isTimeTableForEvent = (timetable) =>
  Boolean(lodashGet(timetable, 'created_from_event'));

export const getEventFromTimetable = (timetable) =>
  lodashGet(timetable, 'event');

/**
 *
 * @param timetables
 * @param date
 * @param timeslot
 */
export const getCellsFromTimetables = (
  allTimeslots,
  timeslotIndex,
  timetablesInput,
  date,
  timeframe,
  rowHeight,
  cellsFilledData,
) => {
  if (!timetablesInput || timetablesInput.length === 0) {
    return {};
  }
  const timeslot = allTimeslots[timeslotIndex];
  const room = timeslot.room || {};
  const roomIid = room.iid;
  let timetables = getValidTimetable(roomIid, timetablesInput, date, timeslot);

  if (timetables.length === 0) {
    return {};
  }

  let convertTimeDurationToRowHeight = (duration) =>
    (duration * rowHeight) / timeframe;

  let endTimeOfLastSlot = lodashGet(
    max(allTimeslots, (slot) => lodashGet(slot, 'end_time')),
    'max.end_time',
  );

  let cells = [];
  let newCellsFilledData = cellsFilledData;
  timetables.forEach((timetable) => {
    //??? event:
    const scheduled = getDateScheduledFromTimetable(timetable, date);
    if (!scheduled) {
      return;
    }

    let startTimeOfIntersectionBetweenTimeSlotAndSchedule = Math.max(
      scheduled.start_time,
      timeslot.start_time,
    );
    let endTimeOfIntersectionBetweenTimeSlotAndSchedule = Math.min(
      scheduled.end_time,
      timeslot.end_time,
    );
    let time =
      Math.min(scheduled.end_time, endTimeOfLastSlot) -
      startTimeOfIntersectionBetweenTimeSlotAndSchedule;

    let top = convertTimeDurationToRowHeight(
      startTimeOfIntersectionBetweenTimeSlotAndSchedule - timeslot.start_time,
    );
    let boxHeight = convertTimeDurationToRowHeight(time);

    const totalCell = (boxHeight + top) / rowHeight;
    const duplicateSlot = generateMarkedData(roomIid, date, timeslot);
    let left = 1;

    const { existed, total: existedTotal } = isStoreCellOnFilledList(
      newCellsFilledData,
      duplicateSlot,
    );

    if (existed) {
      left = (existedTotal + 1) * 5;
    }
    newCellsFilledData = addCellToFilledList(
      newCellsFilledData,
      1,
      roomIid,
      date,
      allTimeslots,
      timeslotIndex,
    );

    cells = cells.concat([
      {
        timeslot,
        timeframe,
        timetable,
        scheduled,
        style: {
          height: `${boxHeight}px`,
          top: `${top}px`,
          left: `${left}px`,
          width: `calc(100% - ${left + 1}px)`,
          zIndex: 1440 - timeslot.start_time,
        },
        date,
        totalCell,
        time: time,
      },
    ]);
  });

  return {
    cells,
    cellsFilledData: newCellsFilledData,
  };
};

export const getTimetableFromCell = (cell) => lodashGet(cell, 'timetable');

export const isCellForEvent = (cell) =>
  isTimeTableForEvent(getTimetableFromCell(cell));

/**
 * Với mỗi timetable khi được sắp xếp vào session rồi sẽ có dates là các buổi học đã được sắp
 * @param timetable
 * @param date
 * @returns {*}
 */
const getDateScheduledFromTimetable = (timetable, date) => {
  const unixTime = date.getTime() / 1000;
  const dates = timetable.dates || [];
  for (let i = 0; i < dates.length; i++) {
    if (dates[i].date_time === unixTime) {
      return dates[i];
    }
  }
  return null;
};

const generateMarkedData = (roomIid, date, timeslot) => {
  return {
    roomIid,
    unixTime: date.getTime(),
    ...timeslot,
    total: 1,
  };
};

/**
 *
 * @param cellsFilledData
 * @param totalCell
 * @param roomIid
 * @param date
 * @param timeslots
 * @param timeslotIndex
 * @returns {*}
 */
const addCellToFilledList = (
  cellsFilledData,
  totalCell,
  roomIid,
  date,
  timeslots,
  timeslotIndex,
) => {
  let newCellsFilledData = cellsFilledData;
  for (let i = 0; i < totalCell; i++) {
    let index = timeslotIndex + i;
    if (index >= timeslots.length) {
      break;
    }
    const timeslot = timeslots[index];
    const duplicateSlot = generateMarkedData(roomIid, date, timeslot);
    let { existed } = isStoreCellOnFilledList(cellsFilledData, duplicateSlot);
    if (!existed) {
      newCellsFilledData = newCellsFilledData.concat([duplicateSlot]);
    } else {
      ({ cellsFilledData: newCellsFilledData } = isStoreCellOnFilledList(
        cellsFilledData,
        duplicateSlot,
        true,
      ));
    }
  }
  return newCellsFilledData;
};

/**
 * check if this timeslot was duplicated
 *
 * @param cellsFilledData
 * @param data
 * @param incrementTotal
 * @return {{existed: boolean}|{total: number, cellsFilledData: *, existed: boolean}}
 */
const isStoreCellOnFilledList = (cellsFilledData, data, incrementTotal) => {
  if (!cellsFilledData || cellsFilledData.length === 0) {
    return {
      existed: false,
    };
  }
  let total = 0;
  let existed = false;
  for (let i = 0; i < cellsFilledData.length; i++) {
    if (
      cellsFilledData[i].unixTime === data.unixTime &&
      cellsFilledData[i].start_time == data.start_time &&
      cellsFilledData[i].end_time == data.end_time &&
      cellsFilledData[i].roomIid == data.roomIid
    ) {
      existed = true;
      if (total <= cellsFilledData[i].total) {
        total = cellsFilledData[i].total;
      }

      if (incrementTotal) {
        let newCellData = cellsFilledData[i];
        newCellData = {
          ...newCellData,
          total: newCellData.total + 1,
        };

        cellsFilledData = Object.assign([], cellsFilledData, {
          [i]: newCellData,
        });
      }
    }
  }

  return {
    existed,
    total,
    cellsFilledData,
  };
};

/**
 * Find all the timetable that belong to the room iid
 *
 * @param roomIid
 * @param timetables
 */
const getValidTimetable = (roomIid, timetables, date, timeslot) => {
  const result = [];
  const dayOfWeek = date.getDay();
  timetables.map((timetable) => {
    if (!isValidTimetableByDate(date, timetable)) {
      return;
    }
    if (!isValidTimetableByRoomIid(roomIid, timetable)) {
      return;
    }
    //??? event: if timetable does not have days_of_week (may be for event)
    if (!isValidTimetableByDayOfWeek(dayOfWeek, timetable)) {
      return;
    }
    if (!isValidByTimeSlot(timeslot, date, timetable)) {
      return;
    }
    result.push(timetable);
  });
  return result;
};

/**
 * is valid when: timetable.start_time >= timeslot.start_time and timetable.start_end < timeslot.start_end
 *
 * @param timeslot
 * @param date
 * @param timetable
 *
 * @returns {boolean}
 */
const isValidByTimeSlot = (timeslot, date, timetable) => {
  const scheduled = getDateScheduledFromTimetable(timetable, date);

  if (!scheduled) {
    return false;
  }

  if (
    timeslot.end_time > scheduled.start_time &&
    timeslot.start_time < scheduled.end_time
  ) {
    return true;
  }
  return false;
};

/**
 * is valid when timetable contain the day of date
 *
 * @param day
 * @param timetable
 * @returns {Array}
 */
const isValidTimetableByDayOfWeek = (day, timetable) => {
  return timetable.days_of_week.includes(day);
};

/**
 * Find all the timetable that belong to the room iid
 *
 * @param roomIid
 * @param timetables
 */
const isValidTimetableByDate = (date, timetable) => {
  const unixTime = date.getTime() / 1000;
  return timetable.start_date <= unixTime && timetable.end_date >= unixTime;
};

/**
 * Find all the timetable that belong to the room iid
 *
 * @param roomIid
 * @param timetables
 */
const isValidTimetableByRoomIid = (roomIid, timetable) => {
  if (!roomIid) {
    // không chọn room nào tức là show tất cả room
    return true;
  }
  return timetable.room_iid === roomIid;
};

/**
 *
 * @param timetables
 * @param date
 * @param timeslot
 */
export const getRoomsCellsFromTimetables = (
  timeslot,
  room,
  timeframe,
  columnWidth,
  rowHeight,
  roomsCellsFilledData,
) => {
  let sessions = room.sessions || [];

  if (sessions.length === 0) {
    return {};
  }

  const cells = [];
  let newCellsFilledData = [];
  sessions.map((session) => {
    const scheduled = session.scheduled;
    if (scheduled.room_iid !== room.iid) {
      return;
    }

    if (
      scheduled.start_time >= timeslot.start_time &&
      scheduled.start_time < timeslot.end_time
    ) {
      const time = scheduled.end_time - scheduled.start_time;
      const boxWidth = (columnWidth * time) / timeframe;
      const left =
        ((scheduled.start_time - timeslot.start_time) * columnWidth) /
        timeframe;
      const totalCell = (boxWidth + left) / boxWidth;
      // const duplicateSlot = generateMarkedData(roomIid, date, timeslot);
      let top = 1;

      // const existed = isStoreCellOnFilledList(cellsFilledData, duplicateSlot);
      //
      // if (existed) {
      //   top = (existed.total + 1) * 5;
      // }

      cells.push({
        session,
        room,
        style: {
          width: `${boxWidth - 4}px`,
          position: 'fixed',
          margin: `${top}px 0 0 ${left + 2}px`,
          height: `${rowHeight - top - 2}px`,
          zIndex: 10,
        },
      });
    }
  });

  return {
    cells,
    roomsCellsFilledData: newCellsFilledData,
  };
};
