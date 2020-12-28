import React from 'react';
import { required } from 'common/validators';
import { t1 } from 'translate';
import daysOfWeek from 'components/timetable/common/DayOfWeek';
import timeSlots from 'components/timetable/dump/timeSlot';
import NewTimeTableLayout from './NewTimeTableLayout';
import SelectAsTouchable from 'schema-form/elements/select-as-touchable';
import SuggestionList from 'schema-form/elements/suggestion-list';
import DatePicker from 'schema-form/elements/date-picker';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';

const dateDefaultFrom = new Date();
const dateDefaultTo = new Date(
  dateDefaultFrom.setDate(dateDefaultFrom.getDay() + 7),
);

export const scopingType = {
  THIS_DAY: 'ON_DAY',
  ALL_OF_TIMETABLE: 'ALL_OF_TIMETABLE',
};
const selectScopingOptions = [
  {
    value: scopingType.THIS_DAY,
    label: 'Chỉ áp dụng cho ngày được chọn',
  },
  {
    value: scopingType.ALL_OF_TIMETABLE,
    label: 'Áp dụng cho toàn bộ lịch giảng dạy của môn',
  },
];

const schema = (formid, values, step) => {
  const dayOfWeek =
    values.days_of_week && values.days_of_week.length > 0
      ? values.days_of_week[0]
      : '';
  const unixTime = values.unixTime;
  const clazz = values.clazz ? values.clazz : {};

  return {
    start_time: {
      type: DatePicker,
      hintText: 'From date',
      floatingLabelText: 'From date',
      container: 'inline',
      defaultValue: dateDefaultFrom.getTime(),
      validate: [required('name cannot be empty')],
      errorText: '',
    },
    end_time: {
      type: DatePicker,
      hintText: 'To date',
      container: 'inline',
      floatingLabelText: 'To date',
      defaultValue: dateDefaultTo.getTime(),
      errorText: '',
      validate: [required('name cannot be empty')],
    },
    teachers: {
      nameElement: 'teachers',
      type: InputAutoComplete,
      baseUrl: '/contract/api/teachers',
      // baseUrl: '/site/api/get-data-schema?ntype=user',
      floatingLabelText: t1('teachers'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'staff.name',
      },
      params: {
        start_time: clazz.start_time,
        end_time: clazz.end_time,
        unixTime,
        course_iid: clazz.iid,
        applyingScoping: values.applyingScoping,
      },
    },
    suggestionForTeacher: {
      nameElement: 'suggestionForTeacher',
      name: 'suggestionForTeacher',
      type: SuggestionList,
      forElement: 'teachers',
      // baseUrl: '/site/api/get-data-schema?ntype=user',
      floatingLabelText: t1('teachers'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'name',
      },
    },
    time_slots: {
      type: SelectAsTouchable,
      options: timeSlots,
      multiple: true,
      hintText: t1('time_slots'),
      configs: {
        label: 'name',
      },
    },
    room: {
      type: 'text',
      hintText: 'Phòng',
      container: 'inline',
      floatingLabelText: 'Phòng',
      errorText: '',
      validate: [required('name cannot be empty')],
    },
    classes: {
      nameElement: 'classes',
      name: 'classes',
      baseUrl: '/course/api/get-classes',
      type: InputAutoComplete,
      floatingLabelText: t1('choose_another_class'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'text',
        value: 'value',
        transformData: (res) =>
          res.map((data) => {
            const major = (data.major && data.major[0]) || {};
            return {
              text: `${data.name} (${major.name})`,
              value: {
                iid: data.iid,
                name: data.name,
                id: data.id,
              },
            };
          }),
      },
      params: {
        credit_syllabus: clazz.credit_syllabus,
        course_iid: clazz.iid,
      },
      // validate: [required(t1('class_cannot_be_empty'))],
    },

    course: {
      nameElement: 'Môn học',
      type: InputAutoComplete,
      limit: 1,
      // baseUrl: '/site/api/get-user-or-group',
      baseUrl: '/site/api/get-data-schema?ntype=user',
      floatingLabelText: t1('Môn học'),
      fullWidth: true,
      dataSourceConfig: {
        text: 'primaryText',
        value: 'value',
      },
      validate: [required(t1('teachers_cannot_be_empty'))],
    },
    days_of_week: {
      multiple: true,
      type: SelectAsTouchable,
      defaultValue: [1, 2, 3],
      options: daysOfWeek,
      hintText: t1('day_of_week'),
      configs: {
        label: 'label',
        value: 'value',
      },
    },
    applyingScoping: {
      type: 'radio',
      options: selectScopingOptions,
      defaultValue: scopingType.THIS_DAY,
    },
  };
};

const ui = (step, values) => {
  const config = {
    // step == ''
    new: [
      {
        id: 'left',
        title: '',
        fields: ['course'],
      },
      {
        id: 'right',
        title: '',
        fields: ['classes'],
      },
      {
        id: 'row2_1',
        title: '',
        fields: ['start_time'],
      },
      {
        id: 'row2_2',
        title: '',
        fields: ['end_time'],
      },
      {
        id: 'row2_3',
        title: '',
        fields: ['teachers'],
      },
      {
        id: 'row',
        title: '',
        fields: ['room', 'days_of_week', 'time_slots'],
      },
    ],
    edit_teachers: [
      {
        id: 'row',
        title: '',
        fields: ['applyingScoping', 'teachers', 'suggestionForTeacher'],
      },
    ],
    edit_classes: [
      {
        id: 'row',
        title: '',
        fields: ['applyingScoping', 'classes'],
      },
    ],
    new_setup: [
      {
        id: 'row',
        title: '',
        fields: ['start_time', 'end_time', 'days_of_week', 'time_slots'],
      },
    ],
    edit_cell: [
      {
        id: 'left',
        title: '',
        fields: ['start_time'],
      },
      {
        id: 'right',
        title: '',
        fields: ['end_time'],
      },
      {
        id: 'row',
        title: '',
        fields: ['time_slots'],
      },
    ],
  };

  return config[step];
};

const layout = {
  new: NewTimeTableLayout,
};

const newTimetable = {
  schema,
  ui,
  layout,
};

export default newTimetable;
