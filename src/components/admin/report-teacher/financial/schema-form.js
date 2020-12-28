import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import store from 'store/index';
import { change } from 'redux-form';
import Elements from 'components/common/elements';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import apiUrls from 'api-endpoints';
import AmountCollectedAccordingSearchFormLayout from './AmountCollectedAccordingSearchFormLayout';
import DebitFeesOfStudentSearchFormLayout from './DebitFeesOfStudentSearchFormLayout';
import { UiLibs } from 'configs/constants';
import { dateGreaterThan, dateLessThan } from 'common/validators';
import DatePicker from 'schema-form/elements/date-picker';

const { schoolYear, semester } = Elements;

const setDateWhenValueOnChange = (formid, currentValue, valueField) => {
  if (
    get(currentValue, 'start_date') &&
    (get(currentValue, 'start_date') < get(valueField, 'start_date') ||
      get(currentValue, 'start_date') > get(valueField, 'end_date'))
  ) {
    store.dispatch(change(formid, 'start_date', null));
  }

  if (
    get(currentValue, 'end_date') &&
    (get(currentValue, 'end_date') > get(valueField, 'end_date') ||
      get(currentValue, 'end_date') < get(valueField, 'end_date'))
  ) {
    store.dispatch(change(formid, 'end_date', null));
  }
};

const getSchema = ({ formid, values = {}, type = '' }) => ({
  school_year: schoolYear({
    hintText: t1('school_year'),
    floatingLabelText: t1('school_year'),
    valueKey: 'iid',
    multiple: false,
    transformValueOption: (value) => {
      return value && value.iid;
    },
    paramsasync: {
      value: {
        type: 'school_year',
        status: ['approved'],
      },
      transformData: (data) =>
        Array.isArray(data) &&
        [
          {
            value: '',
            primaryText: t1('all'),
          },
        ].concat(
          data.map((op) => ({
            value: {
              iid: op.iid,
              name: op.name,
              start_date: op.start_date,
              end_date: op.end_date,
            },
            primaryText: op.name,
          })),
        ),
    },
    onChange: (ev, value) => {
      setDateWhenValueOnChange(formid, values, value);
    },
  }),
  semester: semester({
    hintText: t1('semester'),
    multiple: false,
    floatingLabelText: t1('semester'),
    type: 'select',
    formid,
    values,
    transformValueOption: (value) => {
      return value && value.iid;
    },
    paramsasync: {
      value: {
        type: 'semester',
        status: ['approved'],
        school_year: get(values, 'school_year.iid')
          ? [get(values, 'school_year.iid')]
          : null,
      },
      key: `${formid}__${get(values, 'school_year.iid')}`,
      transformData: (data) =>
        Array.isArray(data) &&
        [
          {
            value: '',
            primaryText: t1('all'),
          },
        ].concat(
          data.map((op) => ({
            value: {
              iid: op.iid,
              name: op.name,
              start_date: op.start_date,
              end_date: op.end_date,
            },
            primaryText: op.name,
          })),
        ),
    },
    onChange: (ev, value) => {
      setDateWhenValueOnChange(formid, values, value);
    },
  }),
  fee_collecting_phase: {
    type: 'select',
    floatingLabelText: t1('fee_collecting_phase'),
    options: 'async',
    multiple: false,
    fullWidth: true,
    transformValueOption: (value) => {
      return value && value.iid;
    },
    paramsasync: {
      value: {
        status: ['approved'],
        start_date:
          get(values, 'semester.start_date') ||
          get(values, 'school_year.start_date'),
        end_date:
          get(values, 'semester.end_date') ||
          get(values, 'school_year.end_date'),
      },
      __url__: apiUrls.fee_collecting_phase_search,
      key: `${formid}__${get(values, 'semester.start_date') ||
        get(values, 'school_year.start_date')}
      __${get(values, 'semester.end_date') ||
        get(values, 'school_year.end_date')}`,
      transformData: (data) =>
        Array.isArray(data) &&
        [
          {
            value: '',
            primaryText: t1('all'),
          },
        ].concat(
          data.map((op) => ({
            value: {
              iid: op.iid,
              start_date: op.start_date,
              end_date: op.end_date,
            },
            primaryText: op.name,
          })),
        ),
    },
    onChange: (ev, value) => {
      setDateWhenValueOnChange(formid, values, value);
    },
  },
  start_date: {
    type: DatePicker,
    uiLib: UiLibs.ANT,
    getStartDate: true,
    validate: [
      dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
    ],
    floatingLabelText: t1('start_date'),
    fullWidth: true,
    minDate:
      get(values, 'fee_collecting_phase.start_date') ||
      get(values, 'semester.start_date') ||
      get(values, 'school_year.start_date'),
    maxDate:
      get(values, 'end_date') ||
      get(values, 'fee_collecting_phase.end_date') ||
      get(values, 'semester.end_date') ||
      get(values, 'school_year.end_date'),
  },
  end_date: {
    type: DatePicker,
    uiLib: UiLibs.ANT,
    getEndDate: true,
    floatingLabelText: t1('end_date_requested'),
    validate: [
      dateGreaterThan(
        values.start_date,
        t1('end_date_must_be_after_start_date'),
      ),
    ],
    fullWidth: true,
    minDate:
      get(values, 'start_date') ||
      get(values, 'fee_collecting_phase.start_date') ||
      get(values, 'semester.start_date') ||
      get(values, 'school_year.start_date'),
    maxDate:
      get(values, 'fee_collecting_phase.end_date') ||
      get(values, 'semester.end_date') ||
      get(values, 'school_year.end_date'),
  },
  form_of_training: {
    type: 'section',
    classWrapper: 'col-md-12',
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
      multiple: false,
    }),
    fullWidth: true,
  },
  campus_iids: {
    type: 'select',
    floatingLabelText: t1('campus'),
    options: 'async',
    fullWidth: true,
    paramsasync: {
      __url__: '/venue/api/get-venue-by-parent',
      value: {
        type: 'venue',
      },
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return [
          {
            value: '',
            label: t1('all'),
            primaryText: t1('all'),
          },
        ].concat(
          data.map((val) => ({
            value: val.iid,
            label: `${val.name} (${val.address})`,
            primaryText: `${val.name} (${val.address})`,
          })),
        );
      },
    },
  },
  cashier: {
    type: 'text',
    floatingLabelText: t1('search_cashier_by_name_or_code_or_mail'),
    fullWidth: true,
  },
  student: {
    type: 'text',
    floatingLabelText: t1('search_student_by_name_or_code_or_mail'),
    fullWidth: true,
  },
  fees_type: {
    type: 'radio',
    inline: true,
    fullWidth: true,
    classWrapper: 'col-sm-12',
    floatingLabelText: t1('fees_type_to_report'),
    defaultValue: 'tuition_fee',
    options: [
      {
        primaryText: t1('tuition_fee'),
        label: t1('tuition_fee'),
        value: 'tuition_fee',
      },
      {
        primaryText: t1('other_fee'),
        label: t1('other_fee'),
        value: 'other_fee',
      },
    ],
  },
  only_owed_fees: {
    type: 'checkbox',
    label: t1('only_students_are_owed_fees'),
  },
});

const getUi = (type = 'amount-collected-according') => [
  {
    id: 'default',
    fields:
      type === 'debit-fees-of-student'
        ? [
            'school_year',
            'semester',
            'fee_collecting_phase',
            'start_date',
            'end_date',
            'form_of_training',
            'student',
            'fees_type',
            'only_owed_fees',
          ]
        : [
            'school_year',
            'semester',
            'fee_collecting_phase',
            'start_date',
            'end_date',
            'campus_iids',
            'cashier',
          ],
  },
];

export default (type = 'amount-collected-according') => {
  return {
    schema: (formid, values) => getSchema({ formid, type, values }),
    ui: () => getUi(type),
    layout: {
      component:
        type === 'debit-fees-of-student'
          ? DebitFeesOfStudentSearchFormLayout
          : AmountCollectedAccordingSearchFormLayout,
      freestyle: 1,
    },
  };
};
