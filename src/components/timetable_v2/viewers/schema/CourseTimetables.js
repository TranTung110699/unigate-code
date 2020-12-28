import React from 'react';
import moment from 'moment';
import get from 'lodash.get';
import { t, t1 } from 'translate';
import Tooltip from 'antd/lib/tooltip';
import { getDataByIid, getDataByIids } from '../../utils';
import datetimeFormat from '../../configs';
import { getTimeName } from '../../utils/DailyUnixTimestamp';
import { daysOfWeek } from '../../utils/DateUtils';

export default (admin = false) => {
  if (admin) {
    return [
      {
        title: t1('form_of_training'),
        render: (text, row) => {
          const children = (
            <div>
              <li>{`${t1('ico')}: ${get(row, 'course.icoObject.name')}`}</li>
              <li>{`${t1('major')}: ${get(
                row,
                'course.majorObject.name',
              )}`}</li>
              <li>{`${t1('training_mode')}: ${t1(
                get(row, 'course.training_mode'),
              )}`}</li>
              <li>{`${t1('training_level')}: ${t1(
                get(row, 'course.training_level'),
              )}`}</li>
            </div>
          );
          return {
            children,
            props: {
              rowSpan: row.rowSpan,
            },
          };
        },
      },
      {
        title: t1('course'),
        render: (text, row) => {
          const children = (
            <div>
              <li>{get(row, 'course.name')}}</li>
              <li>#{get(row, 'course.code')}}</li>
            </div>
          );
          return {
            children,
            props: {
              rowSpan: row.rowSpan,
            },
          };
        },
      },
      {
        title: t1('subject'),
        render: (text, row) => {
          const children = (
            <div>
              <li>{get(row, 'name')}}</li>
              <li>#{get(row, 'code')}}</li>
            </div>
          );
          return {
            children,
            props: {
              rowSpan: row.rowSpan,
            },
          };
        },
      },
      {
        title: t1('number_credit_(theory_credit/practice_credit)'),
        render: (text, row) => ({
          children: (
            <div>
              <li>{`${get(row, 'theory_credit', 0)} ${t1(
                'theory_credit',
              )}`}</li>
              <li>{`${get(row, 'practice_credit', 0)} ${t1(
                'practice_credit',
              )}`}</li>
            </div>
          ),
          props: {
            rowSpan: row.rowSpan,
          },
        }),
      },
      {
        title: t1('room'),
        dataIndex: 'room',
        render: (text, row) => <span>{row.room && row.room.name}</span>,
      },

      {
        title: t1('teacher'),
        dataIndex: 'teachers',
        render: (text, row) => {
          const teachers = row.teachers || [];

          return {
            children: teachers
              .map((teacher) => {
                return `${teacher.name} (#${teacher.code})`;
              })
              .join(' | '),
            props: {
              rowSpan: row.rowSpan,
            },
          };
        },
      },

      {
        title: t1('time_on_schedule'),
        dataIndex: 'timetable',
        render: (text, row, index) => {
          const timetable = row.timetable;
          if (!timetable) return '';
          const day = timetable.days_of_week && timetable.days_of_week[0];
          const dayName = daysOfWeek[day].label;

          const startEndDate =
            timetable.start_date === timetable.end_date
              ? getDateFromUnix(timetable.start_date)
              : `${getDateFromUnix(timetable.start_date)} - ${getDateFromUnix(
                  timetable.end_date,
                )}`;

          return (
            <span>
              {`${startEndDate} (${dayName} ${t('weekly')} `}{' '}
              {getStartTimeAndEndTimeOfTimetable(timetable)} {') '}
            </span>
          );
        },
      },
    ];
  }

  return [
    {
      title: t1('code'),
      dataIndex: 'code',
      render: (text, row, index) => ({
        children: text,
        props: {
          rowSpan: row.rowSpan,
        },
      }),
    },
    {
      title: t1('name'),
      dataIndex: 'name',
      render: (text, row, index) => ({
        children: text,
        props: {
          rowSpan: row.rowSpan,
        },
      }),
    },

    {
      title: t1('TC_LT'),
      dataIndex: 'theory_credit',
      render: (text, row, index) => ({
        children: text,
        props: {
          rowSpan: row.rowSpan,
        },
      }),
    },

    {
      title: t1('TC_TH'),
      dataIndex: 'practice_credit',
      render: (text, row, index) => ({
        children: text,
        props: {
          rowSpan: row.rowSpan,
        },
      }),
    },

    {
      title: t1('room'),
      dataIndex: 'room',
      render: (text, row, index) => <span>{row.room && row.room.name}</span>,
    },

    {
      title: t1('teacher'),
      dataIndex: 'teachers',
      render: (text, row) => {
        const teachers = row.teachers || [];

        return {
          children: teachers
            .map((teacher) => {
              return `${teacher.name} (#${teacher.code})`;
            })
            .join(' | '),
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },

    {
      title: t1('time_on_schedule'),
      dataIndex: 'timetable',
      render: (text, row, index) => {
        const timetable = row.timetable;
        if (!timetable) return '';
        const day = timetable.days_of_week && timetable.days_of_week[0];
        const dayName = daysOfWeek[day].label;

        const startEndDate =
          timetable.start_date === timetable.end_date
            ? getDateFromUnix(timetable.start_date)
            : `${getDateFromUnix(timetable.start_date)} - ${getDateFromUnix(
                timetable.end_date,
              )}`;

        return (
          <span>
            {`${startEndDate} (${dayName} ${t('weekly')} `}{' '}
            {getStartTimeAndEndTimeOfTimetable(timetable)} {') '}
          </span>
        );
      },
    },
  ];
};

export const formatData = (courseTimetables) => {
  const result = [];
  if (!Array.isArray(courseTimetables) || !courseTimetables.length)
    return result;

  courseTimetables.forEach(
    ({ syllabus = {}, timetables = [], teachers = [], ...course }) => {
      const courseWithSingleTimetable = {
        course,
      };
      courseWithSingleTimetable.code = syllabus.code;
      courseWithSingleTimetable.name = syllabus.name;
      courseWithSingleTimetable.practice_credit = syllabus.practice_credit;
      courseWithSingleTimetable.theory_credit = syllabus.theory_credit;

      if (timetables.length === 0) {
        result.push(courseWithSingleTimetable);
        return;
      }

      courseWithSingleTimetable.timetable = timetables[0];
      courseWithSingleTimetable.room = getRoom(
        course,
        courseWithSingleTimetable.timetable,
      );
      courseWithSingleTimetable.teachers = getDataByIids(
        teachers,
        timetables[0].teacher_iids,
      );
      courseWithSingleTimetable.rowSpan = timetables.length;
      result.push(courseWithSingleTimetable);

      for (let i = 1; i < timetables.length; i++) {
        const newElement = { empty: true };
        newElement.iid = course.iid;
        newElement.timetable = timetables[i];
        newElement.room = getRoom(course, timetables[i]);
        newElement.teachers = getDataByIids(
          teachers,
          timetables[i].teacher_iids,
        );
        newElement.rowSpan = 0;
        result.push(newElement);
      }
    },
  );
  return result;
};

const getRoom = (course, timetable) =>
  timetable.room_iid == course.iid
    ? {
        code: 'VTR',
        name: t1('online_learning'),
      }
    : getDataByIid(course.rooms, timetable.room_iid);

export const getDateFromUnix = (unix) =>
  moment(unix * 1000).format(datetimeFormat.DATE_FORMAT);

export const getStartTimeAndEndTimeOfTimetable = (timetable) => {
  const dates = timetable.dates;
  if (!dates || dates.length === 0) {
    return getTimeName(timetable.start_time);
  }

  const timesAndDates = {};
  dates.map((date) => {
    const key = date.end_time - date.start_time;
    const dateOnKey = timesAndDates[key] || [];
    dateOnKey.push(date);
    timesAndDates[key] = dateOnKey;
  });

  const times = Object.keys(timesAndDates);
  if (times.length === 1) {
    return (
      <span>{`${t('from')} ${getTimeName(dates[0].start_time)} ${t(
        'to',
      )} ${getTimeName(dates[0].end_time)} `}</span>
    );
  }

  const result = [];
  times.map((time) => {
    const date = timesAndDates[time][0];
    let titles = '';

    timesAndDates[time].map((date) => {
      titles = `${titles +
        moment(date.date_time * 1000).format(datetimeFormat.DATE_FORMAT)}, `;
    });

    result.push(
      <Tooltip title={titles}>{`${t('from')} ${getTimeName(
        date.start_time,
      )} ${t('to')} ${getTimeName(date.end_time)} `}</Tooltip>,
    );
  });
  return result;
};
