import DatePicker from 'schema-form/elements/date-picker';
import { t1 } from 'translate';
import get from 'lodash.get';
import { ILT_BBB } from '../common/constants';
import Duration from 'schema-form/elements/duration/smaller-than-one-day';
import { durationDisplayFormats } from 'schema-form/elements/duration/smaller-than-one-day/common/constants';

const schema = (formid, values, step) => {
  return {
    date_time: {
      type: DatePicker,
      getStartDate: true,
      hintText: t1('start_time'),
      floatingLabelText: t1('enter_session_start_time'),
      fullWidth: true,
    },
    start_time: {
      type: Duration,
      valueIsNumberOfMinutes: true,
      label: `${t1('start_time')} (hh:mm)`,
      // formatTime: datetimeFormat.TIME_IN_SECOND_FORMAT,
      formatTime: durationDisplayFormats.TIME_FORMAT, //default format
      defaultValue: 540,
    },
    end_time: {
      type: Duration,
      valueIsNumberOfMinutes: true,
      label: `${t1('end_time')} (hh:mm)`,
      // formatTime: datetimeFormat.TIME_IN_SECOND_FORMAT,
      formatTime: durationDisplayFormats.TIME_FORMAT, //default format
    },
    room_iid: {
      type: 'select',
      floatingLabelText: t1('room'),
      options: 'async',
      paramsasync: {
        __url__: `/venue/api/get-all-rooms?is_virtual=${
          values.location == ILT_BBB ? '1' : '0'
        }`,
        key: `room_iid_${values.location}`,
        value: 'iid',
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((item) => ({
            value: item.iid,
            label: get(item, 'full_name'),
            primaryText: get(item, 'full_name'),
          }));
        },
      },
      populateValue: true,
    },
    teacher_iids: {
      type: 'select',
      multiple: true,
      floatingLabelText: t1('instructors'),
      options: 'async',
      paramsasync: {
        __url__: '/user/search?_sand_step=staff',
        key: 'teacher_iids',
        value: 'iid',
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((item) => ({
            value: item.iid,
            label: get(item, 'name'),
            primaryText: get(item, 'name'),
          }));
        },
      },
    },
  };
};

const ui = (step, values) => {
  const fields = [
    'date_time',
    'start_time',
    'end_time',
    'room_iid',
    'teacher_iids',
  ];

  return [
    {
      id: 'scheduled-session',
      title: t1('session_scheduling'),
      fields,
    },
  ];
};

export default { schema, ui };
