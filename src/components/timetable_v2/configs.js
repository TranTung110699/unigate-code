import { t1 } from 'translate';

export default {
  DATE_FORMAT: 'DD/MM/YYYY',
  TIME_FORMAT: 'HH:mm',
  TIME_IN_SECOND_FORMAT: 'HH:mm:ss',
  MINUTES_AND_SECONDS: 'mm:ss',
};

export const timeframeConfigs = {
  T5: {
    name: t1('5_minutes'),
    value: 5,
  },
  T10: {
    name: t1('10_minutes'),
    value: 10,
  },
  T15: {
    name: t1('15_minutes'),
    value: 15,
  },
  T20: {
    name: t1('20_minutes'),
    value: 20,
  },
  T30: {
    name: t1('30_minutes'),
    value: 30,
  },
  T60: {
    name: t1('1_hour'),
    value: 60,
  },
  T120: {
    name: t1('2_hours'),
    value: 120,
  },
  T180: {
    name: t1('3_hours'),
    value: 180,
  },
  T240: {
    name: t1('4_hours'),
    value: 240,
  },
};

export const timetableConfigs = {
  timeframe: timeframeConfigs.T60,
  start_time: '07:00',
  end_time: '21:00',
};

export const timetableEndpoints = {
  new_timetable: `/timetable-v2/new`,
  search_teacher: `/contract/api/find-teachers`,
  search_course: `/course/api/get-classes`,
  assignee_teacher: `/timetable-v2/assign-teacher`,
  attach_classes: `/timetable-v2/attach-classes`,
  update_settings: `/timetable-v2/update-setting`,
  search_venus: `/venue/api/get-venue-by-parent`,
  getAllRoomToDisplay: `/venue/api/get-rooms-of-schedule`,
};
