import React from 'react';
import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { constants, UiLibs, userMajorStatus } from 'configs/constants';
import DatePicker from 'schema-form/elements/date-picker';

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];
const schema = (optionFilters, props, showExport = false) => ({
  filter_by_form_of_training: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('form_of_training'),
      displayFields:
        (optionFilters && optionFilters.displayFields) || displayFields,
      notValidate: true,
      forSearch: true,
    }),
  },
  status: {
    classWrapper: 'col-md-4',
    fullWidth: true,
    type: 'select',
    inline: true,
    floatingLabelText: t1('status'),
    hintText: t1('type_of_status'),
    options:
      (optionFilters && optionFilters.statusOptions) ||
      [
        {
          value: '',
          label: t1('all'),
          primaryText: t1('all'),
        },
      ].concat(constants.userMajorStatusOptions),
    defaultValue: userMajorStatus.STUDYING,
  },
  start_date: {
    classWrapper: 'col-md-4',
    type: DatePicker,
    uiLib: UiLibs.ANT,
    floatingLabelText: t1('start_date'),
    fullWidth: true,
    getStartDate: true,
  },
  end_date: {
    classWrapper: 'col-md-4',
    type: DatePicker,
    uiLib: UiLibs.ANT,
    floatingLabelText: t1('end_date'),
    getEndDate: true,
    fullWidth: true,
  },
  text: {
    classWrapper: showExport ? 'col-md-8' : 'col-md-12',
    fullWidth: true,
    type: 'text',
    floatingLabelText: t1('search_user'),
    hintText: t1('search_by_name_or_iid'),
  },
  student_in_the_admissions: {
    type: 'checkbox',
    classWrapper: 'col-md-4 m-t-30',
    label: t1('is_the_student_in_the_admissions_student_group'),
  },
});

const ui = (showExport = false) => [
  {
    id: 'id',
    fields: [
      'filter_by_form_of_training',
      'status',
      'start_date',
      'end_date',
      'text',
      showExport && 'student_in_the_admissions',
    ].filter(Boolean),
  },
];

export default (optionFilters, showExport = false) => ({
  schema: (formid, values, step, xpath, props) =>
    schema(optionFilters, props, showExport),
  ui: () => ui(showExport),
});
