import React from 'react';
import { t1 } from 'translate';
import filtersetSchema from 'components/admin/group/schema/elements/filterset/filterset';
import SchemaForm from 'schema-form/Form';
import {
  enrolmentPlanMemberRtOptions,
  enrolmentPlanRejectReasonTypeOptions,
} from 'configs/constants/enrolmentPlan';
import SearchFormLayoutFreestyle from './SearchFormLayoutFreestyle';

const schema = (formid) => ({
  filterset: {
    type: 'cascade',
    component: (
      <SchemaForm hideSubmitButton formid={formid} schema={filtersetSchema} />
    ),
  },
  rt: {
    type: 'multiCheckbox',
    options: enrolmentPlanMemberRtOptions(),
    inline: true,
    floatingLabelText: t1('status'),
    floatingLabelFixed: false,
  },
  reject_reason_type: {
    type: 'multiCheckbox',
    floatingLabelText: t1('rejection_type'),
    floatingLabelFixed: false,
    fullWidth: true,
    inline: true,
    options: enrolmentPlanRejectReasonTypeOptions(),
  },
});

const ui = () => [
  {
    id: 'default',
    fields: ['filterset', 'rt', 'reject_reason_type'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
