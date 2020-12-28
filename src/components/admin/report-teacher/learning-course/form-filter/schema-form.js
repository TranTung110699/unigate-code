import React from 'react';
import { t1 } from 'translate';
import { attendanceStatus, leariningShifts } from 'configs/constants';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import SearchFormLayout from './SearchFormLayout';
import TimePicker from 'schema-form/elements/time-picker';
import DatePicker from 'schema-form/elements/date-picker';

const currentTimestamp = new Date().getTime() / 1000;

const schema = (formid, values, step, xpath, props) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: [
        'faculty',
        'major',
        'training_mode',
        'training_level',
        'ico',
      ],
      notValidate: true,
      forSearch: true,
    }),
  },
  course: {
    type: 'text',
    hintText: t1('search_course_name_or_iid_or_code'),
    floatingLabelText: t1('search_subject_name_or_iid_or_code'),
    fullWidth: true,
  },
  subject: {
    type: 'text',
    hintText: t1('search_subject_name_or_iid_or_code'),
    floatingLabelText: t1('search_subject_name_or_iid_or_code'),
    fullWidth: true,
  },
  teacher: {
    type: 'text',
    hintText: t1('search_teacher_name_or_iid_or_code'),
    floatingLabelText: t1('search_tearcher_name_or_iid_or_code'),
    fullWidth: true,
  },
  time: {
    type: 'text',
    hintText: t1('time'),
    floatingLabelText: t1('time'),
    fullWidth: true,
  },
  status: {
    type: 'select',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    defaultValue: 'all',
    options: attendanceStatus(),
    fullWidth: true,
  },
  learning_shift: {
    type: 'select',
    floatingLabelText: t1('learning_shift'),
    floatingLabelFixed: true,
    defaultValue: 'all',
    options: leariningShifts,
    fullWidth: true,
  },
  start_date: {
    type: DatePicker,
    hintText: 'From date',
    floatingLabelText: 'From date',
    container: 'inline',
    defaultValue: currentTimestamp,
    errorText: '',
  },
  end_date: {
    type: DatePicker,
    hintText: 'To date',
    container: 'inline',
    floatingLabelText: 'To date',
    defaultValue: currentTimestamp + 24 * 60 * 60,
    errorText: '',
  },
  start_time: {
    type: TimePicker,
    floatingLabelText: t1('start_time'),
    dailyUnix: true,
    fullWidth: true,
  },
  end_time: {
    type: TimePicker,
    floatingLabelText: t1('end_time'),
    dailyUnix: true,
    fullWidth: true,
  },
});

const ui = () => [
  {
    id: 'id',
    fields: [
      'major',
      'course',
      'subject',
      'teacher',
      'status',
      'learning_shift',
      'start_date',
      'end_date',
      'start_time',
      'end_time',
    ],
  },
];

export default (handleExport) => ({
  schema,
  ui,
  layout: {
    component: (props) => (
      <SearchFormLayout {...props} handleExport={handleExport} />
    ),
    freestyle: 1,
  },
});
