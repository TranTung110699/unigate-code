/**
 * Created by Peter Hoang Nguyen on 10/9/2017.
 */

export const getConflictTimeTable = (timetable, conflictTables) => {
  const dayOfWeeks = timetable.days_of_week;
  conflictTables.map((conflict) => {});
};

const findStartTimeAndEndTime = (conflictTables) => {
  if (!conflictTables || conflictTables.length === 0) {
    return;
  }
  let startTime, endTime;
  conflictTables.map((conflict) => {
    if (!startTime || startTime < conflict['start_time']) {
      startTime = conflict['start_time'];
    }

    if (!endTime || endTime > conflict['end_time']) {
      endTime = conflict['end_time'];
    }
  });
};

export const getCellToDisplay = (timestable, room, timestamp, timeSlot) => {
  if (!timestable || !timestamp || timestable.length === 0 || !timeSlot) {
    return;
  }

  const dayOfWeek = getDayNumberOfWeek(timestamp);
  let result;
  for (let i = 0; i < timestable.length; i++) {
    const data = timestable[i];
    if (!isExitsInArray(data.days_of_week, dayOfWeek)) {
      continue;
    }
    if (!isContainTimeSlot(data.time_slots, timeSlot)) {
      continue;
    }
    let startTime = getTime(data.start_time);
    let endTime = getTime(data.end_time);
    // console.log("(!startTime || startTime <= timestamp) && (!endTime || endTime >= timestamp)",startTime, endTime, timestamp,  (!startTime || startTime <= timestamp) && (!endTime || endTime >= timestamp));
    if (
      (!startTime || startTime <= timestamp) &&
      (!endTime || endTime >= timestamp)
    ) {
      if (
        data.timetable_type !== 'event' &&
        (!data.room || data.room.id !== room.id)
      ) {
        continue;
      }
      const rowSpan = getRowSpan(data.time_slots, timeSlot);
      if (rowSpan === 0) {
        continue;
      }
      //
      // if(rowSpan === -1) {
      //   return {
      //     rowSpan: rowSpan
      //   }
      // }
      const classes = data.classes || [];
      const teachers = data.teachers || [];

      const newCell = {
        cellId: {
          timeId: timestamp,
          roomId: room.id,
          firstTimeSlotId: timeSlot,
        },
        id: data.id,
        classes: [...classes],
        teachers: [...teachers],
        isNew: data.isNew,
        timeId: timestamp,
        roomId: room.id,
        type: data.timetable_type || 'normal',
        rowSpan: rowSpan,
        timeTable: data,
        time_slots: data.time_slots,
        time_slot: { ...timeSlot },
      };

      if (incrementRowSpan(result, newCell)) {
        continue;
      }

      result = newCell;
    }
  }
  return result;
};

const getRowSpan = (timeSlots, timeSlot) => {
  let rowSpan = 0;
  if (!timeSlots || timeSlots.length === 0) {
    return rowSpan;
  }
  if (isNextTimeSlot(timeSlots, timeSlot)) {
    return -1;
  }

  // check xem timeSlots có chưa timeSlot hay ko
  let isValideTimeSlot;
  for (let i = 0; i < timeSlots.length; i++) {
    if (timeSlots[i].id === timeSlot.id) {
      isValideTimeSlot = true;
      break;
    }
  }

  let timeSlotToCheck = { ...timeSlot };
  // tính số rowspan
  while (true) {
    rowSpan += 1;
    timeSlotToCheck = getNextTimeSlot(timeSlots, timeSlotToCheck);
    if (!timeSlotToCheck) {
      break;
    }
  }

  return rowSpan;
};

const isContainTimeSlot = (timeSlots, timeSlot) => {
  for (let i = 0; i < timeSlots.length; i++) {
    let data = timeSlots[i];
    if (timeSlot.id == data.id || timeSlot.time_from === data.time_from) {
      return true;
    }
  }
  return false;
};

const getNextTimeSlot = (timeSlots, timeSlot) => {
  for (let i = 0; i < timeSlots.length; i++) {
    let data = timeSlots[i];
    if (
      timeSlot.id != data.id &&
      (timeSlot.next_time_id == data.id || timeSlot.time_to === data.time_from)
    ) {
      return data;
    }
  }
  return false;
};

/**
 * Nếu id == next_time_id hoặc time_from === time_to chính tỏ nó là next timeSlot của một timeSlot khác.
 *
 * {
 *   "id": 1,
 *   "name": "tiết 1",
 *   "time_from": "7:00",
 *  "time_to": "8:00",
 *  "next_time_id": 2,
 * },
 * {
 *  "id": 2,
 *  "name": "tiết 2",
 *   "time_from": "8:00",
 *   "time_to": "9:00",
 *   "next_time_id": 3,
 * },
 * @param timeSlots
 * @param timeSlot
 * @returns {boolean}
 */
const isNextTimeSlot = (timeSlots, timeSlot) => {
  for (let i = 0; i < timeSlots.length; i++) {
    let data = timeSlots[i];
    if (
      data.next_time_id == timeSlot.id ||
      data.time_to === timeSlot.time_from
    ) {
      return true;
    }
  }
  return false;
};

/**
 * Hàm này sẽ tăng rowSpan lên để đảm bảo có thể merge các row có time giống nhau vào là 1.
 * Có 2 cách để tăng: quy định next id của timetable hoặc end của timetable này là start của timetable kia
 * @param cellData
 * @param newCell
 * @returns {boolean}
 */
const incrementRowSpan = (cellData, newCell) => {
  if (
    !cellData ||
    cellData.timeId !== newCell.timeId ||
    cellData.roomId !== newCell.roomId
  ) {
    return false;
  }

  const cellDataTimeSlot = cellData.time_slot;
  const newCellTimeSlot = newCell.time_slot;

  if (cellDataTimeSlot.id === newCellTimeSlot.next_time_id) {
    cellData.rowSpan = cellData.rowSpan + 1;
    return true;
  }
  if (cellDataTimeSlot.time_to === newCellTimeSlot.time_from) {
    cellData.rowSpan = cellData.rowSpan + 1;
    return true;
  }

  return false;
};

const getTime = (time, defaultValue) => {
  if (!time || typeof time !== 'number') {
    return defaultValue;
  }
  if (time < 9999999999) {
    time = time * 1000;
  }
  return new Date(new Date(time).toDateString()).getTime();
};

const getDayNumberOfWeek = (time) => {
  return new Date(time).getDay();
};

const isExitsInArray = (Arr, value) => {
  if (!Arr || Arr.length === 0) {
    return false;
  }
  for (let i = 0; i < Arr.length; i++) {
    if (parseInt(Arr[i]) === parseInt(value)) {
      return true;
    }
  }
  return false;
};

export const getIdsFromTimeslots = (timeSlots) => {
  const ids = [];
  for (let i = 0; i < timeSlots.length; i++) {
    ids.push(timeSlots[i].id);
  }
  return ids;
};
