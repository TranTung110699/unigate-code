import React from 'react';
import getLodash from 'lodash.get';
import { required } from 'common/validators';
import { reqTypes, UiLibs } from 'configs/constants';
import { t1 } from 'translate';
import FeesOfUser from './fees-of-user';
import DatePicker from 'schema-form/elements/date-picker';

export default (values, hiddenFields) => {
  const hiddenFieldsSearchFees = {
    student__iid: getLodash(hiddenFields, 'requester_iid'),
    deadline: getLodash(
      values,
      `request_data.${reqTypes.POSTPONE_FEE_DEADLINE}.deadline`,
    ),
    _sand_step: 'postpone',
  };

  return {
    type: 'section',
    classWrapper: 'row',
    schema: {
      schema: {
        fees: {
          type: 'cascade',
          classWrapper: 'col-md-12',
          component: <FeesOfUser hiddenFields={hiddenFieldsSearchFees} />,
          validate: [required(t1('end_time_cannot_be_empty'))],
        },
        deadline: {
          type: DatePicker,
          getEndDate: true,
          uiLib: UiLibs.ANT,
          minDate: new Date(),
          classWrapper: 'col-md-12',
          floatingLabelText: t1('deadline_paid_fees'),
          fullWidth: true,
          validate: [required(t1('start_time_cannot_be_empty'))],
        },
        reason: {
          type: 'text',
          multiLine: true,
          classWrapper: 'col-md-12',
          floatingLabelText: t1('reason_postpone_fee_deadline'),
          fullWidth: true,
        },
      },
      ui: () => [
        {
          id: 'register_credit_syllabus',
          fields: ['deadline', 'reason', 'fees'],
        },
      ],
    },
  };
};
