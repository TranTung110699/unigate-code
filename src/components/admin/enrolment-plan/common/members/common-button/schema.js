import { t1 } from 'translate';
import {
  enrolmentPlanRejectReasonTypeOptions,
  enrolmentPlanRejectReasonTypes,
} from 'configs/constants/enrolmentPlan';

const schema = (formid, values) => {
  return {
    reject_reason_type: {
      type: 'select',
      floatingLabelText: t1('type'),
      floatingLabelFixed: false,
      fullWidth: true,
      options: enrolmentPlanRejectReasonTypeOptions(),
      defaultValue: enrolmentPlanRejectReasonTypes.OTHER,
    },
    reject_reason_detail: {
      type: 'text',
      multiLine: true,
      floatingLabelText: t1('detail'),
      rows: 2,
      floatingLabelFixed: false,
      fullWidth: true,
      maxLength: 200,
    },
  };
};

const ui = (step, values) => {
  if (values.mode === 'reject') {
    return [
      {
        fields: ['reject_reason_type', 'reject_reason_detail'],
        subTitle: t1('reason'),
        id: 'default',
      },
    ];
  }

  return [];
};

export default { schema, ui };
