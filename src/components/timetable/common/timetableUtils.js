import React from 'react';
import { normalizeDateAsddmmyyy } from 'common/normalizers';
import { incrementDayByTime } from './Datetime';

export const isSameTimetable = (t1, t2) => {
  const class1Iids = t1.class_iids;
  const class2Iids = t2.class_iids;
  return (
    class1Iids &&
    class2Iids &&
    class1Iids.length === class2Iids.length &&
    class1Iids.includes(class2Iids)
  );
};

export const getPropertyOfObjects = (objects, property) => {
  let result = [];
  if (!objects) {
    return result;
  }
  objects.map((obj) => {
    if (obj[property]) {
      result.push(obj[property]);
    }
  });
  return result;
};

export const getTimetablesAfterResolveConflict = (
  timetable,
  conflictTables,
) => {
  const dailySchedules = getDailySchedules(
    conflictTables,
    timetable.days_of_week,
  );
  if (!dailySchedules || dailySchedules.length === 0) {
    return timetable;
  }

  const dailySchedulesConflict = [];
  dailySchedules.map((dailySchedule) => {
    // tìm các ngày trong khoảng start và end để xác định đó là ngày conflict
    const unixTime = parseInt(dailySchedule.date.getTime() / 1000);
    if (timetable.start_time <= unixTime && unixTime <= timetable.end_time) {
      dailySchedulesConflict.push(dailySchedule);
    }
  });
  dailySchedulesConflict.sort(function(a, b) {
    // sắp xếp theo thứ tự từ ngày gần nhất đến ngày xa nhất để chia khoảng cho dễ
    return a.date.getTime() > b.date.getTime();
  });

  const resultTmpl = [];
  let ttTemp = { ...timetable };
  dailySchedulesConflict.map((dailySchedule) => {
    const newStartTimeTableTmpl = {
      ...ttTemp,
      end_time: incrementDayByTime(dailySchedule.date, -1).getTime() / 1000,
    };
    ttTemp = {
      ...ttTemp,
      start_time: incrementDayByTime(dailySchedule.date, 1).getTime() / 1000,
    };
    const newStartTimeTable = getTimetableDetail(newStartTimeTableTmpl);
    if (newStartTimeTable.length > 0) {
      resultTmpl.push(newStartTimeTable.fitTimeTable);
    }
  });

  const newEndTimeTableTmpl = getTimetableDetail(ttTemp);
  if (newEndTimeTableTmpl.length > 0) {
    resultTmpl.push(newEndTimeTableTmpl.fitTimeTable);
  }
  let timetableResult = [];
  let groupId, data;
  if (resultTmpl.length > 1) {
    // chỉ giữ lại id cho phần tử đầu tiên (update) còn lại sẽ là new
    data = { ...resultTmpl[0] };
    groupId = data.group_id || data.id;
    data.group_id = groupId;
    timetableResult.push({ ...data });
    for (let i = 1; i < resultTmpl.length; i++) {
      data = { ...resultTmpl[i] };
      data.id = `${data.id}@${i}`;
      data.isNew = true;
      data.group_id = groupId;
      timetableResult.push({ ...data });
    }
  } else {
    timetableResult = resultTmpl;
  }

  return {
    timetables: timetableResult,
    dailySchedulesConflict: dailySchedulesConflict,
  };
};

export const getMessageForConflictTimetable = (dailySchedules) => {
  return (
    <ul>
      {dailySchedules.map((dailySchedule) => {
        const dateAsString = normalizeDateAsddmmyyy(dailySchedule.date);
        return (
          <li key={`conflict-date-${dateAsString}`}>
            {' '}
            {dateAsString}{' '}
            {getTimeSlotsAsString(dailySchedule.timetable.time_slots)}{' '}
          </li>
        );
      })}
    </ul>
  );
};

export const getTimeSlotsAsString = (timeslots) => {
  let result = '';
  timeslots.map((timeslot, index) => {
    if (index !== 0) {
      result += '; ';
    }
    result += `${timeslot.name} (${timeslot.time_from}-${timeslot.time_to})`;
  });
  return result;
};

/**
 * lấy ra ngày tiếp theo trong tuần (thứ 2 hàng tuần chẳng hạn)
 */
const getNextSameDayInWeek = (unixTimestamp) => {
  let date = new Date(unixTimestamp * 1000);
  date = incrementDayByTime(date, 7);
  return date;
};

export const getDailySchedules = (timetables, daysOfWeekInput) => {
  let days = [];
  if (!timetables) {
    return days;
  }
  timetables.map((timetable) => {
    const tmpl = getTimetableDetail(timetable, daysOfWeekInput);
    if (tmpl.length > 0) {
      const dailySchedules = tmpl.days.map((date) => {
        return {
          date: date,
          totalTimeSlots: getTimeTotalInTimeSlots(tmpl.original.time_slots),
          timetable: tmpl.original,
        };
      });

      days = days.concat(dailySchedules);
    }
  });
  return days;
};

export const isValidTimeTable = (timetable) => {
  return getTimetableDetail(timetable).length > 0;
};

export const delegateDailyScheduleToSession = (timetables, sessions) => {
  if (
    !timetables ||
    !sessions ||
    timetables.length === 0 ||
    sessions.length === 0
  ) {
    return sessions;
  }

  const result = [];
  let days = getDailySchedules(timetables);

  days.sort(function(a, b) {
    // sắp xếp theo thứ tự từ ngày gần nhất đến ngày xa nhất để chia khoảng cho dễ
    return a.date.getTime() > b.date.getTime();
  });

  sessions.map((session) => {
    const totalSessionTime = session.time || 0;
    const assignedSessionTime = session.assigned_time || 0;

    if (days.length > 0 && totalSessionTime - assignedSessionTime > 0) {
      const availableTimes = getNextAvailableDate(
        days,
        totalSessionTime - assignedSessionTime,
      );
      if (availableTimes !== false) {
        days = [...availableTimes.days];
        const assignedDates = session.assigned_dates || [];
        result.push({
          ...session,
          assigned_time: assignedSessionTime + availableTimes.assignedTime,
          assigned_dates: assignedDates.concat(availableTimes.assignedDates),
        });
      } else {
        result.push({ ...session });
      }
    } else {
      result.push({ ...session });
    }
  });

  return result;
};

export const getNextAvailableDate = (days, totalTime) => {
  if (!days || days.length === 0) {
    return false;
  }
  let i = 0;
  let assignedDates = [];
  let totalInCounter = 0;
  let availableDays = [...days];
  while (true) {
    let day = availableDays[i];
    assignedDates = [...assignedDates, day];
    totalInCounter += day.totalTimeSlots;

    if (totalInCounter > totalTime) {
      day = { ...day, totalTimeSlots: totalInCounter - totalTime };
      availableDays = availableDays.splice(i + 1, availableDays.length - 1);
      return {
        assignedDates,
        assignedTime: totalTime,
        days: [day, ...availableDays],
      };
    } else if (totalInCounter === totalTime) {
      availableDays = availableDays.splice(i + 1, availableDays.length - 1);
      return {
        assignedDates,
        assignedTime: totalTime,
        days: [...availableDays],
      };
    }

    if (i < availableDays.length - 1) {
      i++;
    } else {
      return {
        assignedDates,
        assignedTime: totalInCounter,
        days: [],
      };
    }
  }

  // return {
  //   dateAndTimeSlots: dateAndTimeSlots,
  //   allDateAndTimeSlots: [...newData]
  // }
};

export const getTimeTotalInTimeSlots = (timeSlots) => {
  let total = 0;
  if (!timeSlots || timeSlots.length === 0) {
    return total;
  }
  timeSlots.map((timeslot) => {
    total += timeslot.time;
  });
  return total;
};

export const getTimetableDetail = (timetable, daysOfWeekInput) => {
  const daysOfWeek = daysOfWeekInput || timetable.days_of_week;
  let startTime = timetable.start_time;
  let endTime = timetable.end_time;
  let fitStartDate, fitEndDate;

  startTime = new Date(startTime * 1000);
  endTime = new Date(endTime * 1000);

  startTime.setHours(0, 0, 0, 0);
  endTime.setHours(0, 0, 0, 0);

  const result = [];
  let startConvertDate = startTime;
  while (startConvertDate.getTime() <= endTime.getTime()) {
    if (
      daysOfWeek.includes(startConvertDate.getDay() + '') ||
      daysOfWeek.includes(startConvertDate.getDay())
    ) {
      result.push(startConvertDate);
      if (!fitStartDate) {
        fitStartDate = startConvertDate;
      }
      fitEndDate = startConvertDate;
    }
    startConvertDate = incrementDayByTime(startConvertDate, 1);
  }

  let fitTimeTable = { ...timetable };
  if (fitStartDate) {
    fitTimeTable['start_time'] = fitStartDate.getTime() / 1000;
    fitTimeTable['end_time'] = fitEndDate.getTime() / 1000;
  }

  return {
    length: result.length,
    start_time: fitStartDate,
    end_time: fitEndDate,
    days: result,
    original: timetable,
    fitTimeTable,
  };
};
