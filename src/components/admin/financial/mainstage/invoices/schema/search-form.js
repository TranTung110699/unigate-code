/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import get from 'lodash.get';
import { constants, invoiceStatuses, UiLibs } from 'configs/constants';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import React from 'react';
import { dateGreaterThan, dateLessThan } from 'common/validators';
import DateTimePicker from 'schema-form/elements/date-time-picker';

const schema = (formid, values) => {
  return {
    form_of_training: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        floatingLabelText: t1('applicable_for_major'),
        displayFields: [
          'faculty',
          'major',
          'training_mode',
          'training_level',
          'ico',
        ],
        forSearch: true,
        notValidate: true,
      }),
    },
    code: {
      classWrapper: 'col-md-4',
      type: 'text',
      fullWidth: true,
      name: 'text',
      floatingLabelText: t1('invoice_code'),
      floatingLabelFixed: true,
      placeholder: t1('search_by_invoice_code'),
    },
    student: {
      classWrapper: 'col-md-4',
      type: 'text',
      fullWidth: true,
      name: 'text',
      floatingLabelText: t1('student'),
      floatingLabelFixed: true,
      placeholder: t1('search_by_student_info'),
    },
    accountant: {
      classWrapper: 'col-md-4',
      type: 'text',
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      name: 'text',
      floatingLabelText: t1('accountant'),
      floatingLabelFixed: true,
      placeholder: t1('search_by_accountant_info'),
    },
    start_date: {
      classWrapper: 'col-md-4',
      type: DateTimePicker,
      uiLib: UiLibs.ANT,
      getStartDate: true,
      validate: [
        dateLessThan(values.end_date, t1('start_date_must_be_before_end_date')),
      ],
      floatingLabelText: t1('start_date'),
      fullWidth: true,
      maxDate: values.end_date,
    },
    end_date: {
      classWrapper: 'col-md-4',
      type: DateTimePicker,
      uiLib: UiLibs.ANT,
      getEndDate: true,
      floatingLabelText: t1('end_date'),
      validate: [
        dateGreaterThan(
          values.start_date,
          t1('end_date_must_be_after_start_date'),
        ),
      ],
      fullWidth: true,
      minDate: values.start_date,
    },
    status: {
      classWrapper: 'col-md-4 m-t-15',
      type: 'multiCheckbox',
      inline: true,
      floatingLabelText: t1('status'),
      hintText: t1('type_of_status'),
      options: constants.invoiceStatusOptions().concat(
        get(values, 'request_to_cancel__status') === 'sent'
          ? []
          : [
              {
                value: invoiceStatuses.CANCELLED,
                label: t1(invoiceStatuses.CANCELLED),
                primaryText: t1(invoiceStatuses.CANCELLED),
              },
            ],
      ),
      defaultValue: constants.invoiceStatusOptions().map((item) => item.value),
    },
  };
};

const ui = () => {
  return [
    {
      id: 'id', // you still have to have this id even for freestyle
      fields: [
        'form_of_training',
        'code',
        'student',
        'accountant',
        'start_date',
        'end_date',
        'status',
      ],
    },
  ];
};

export default {
  schema,
  ui,
};
