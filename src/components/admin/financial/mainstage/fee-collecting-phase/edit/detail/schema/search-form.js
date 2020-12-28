import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import {
  constants,
  feesTemplateTypes,
  feesTypeApplied,
} from 'configs/constants';
import SearchFormLayoutFreestyle from '../SearchFormLayoutFreestyle';

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];

const feeTemplateTypeOptions = Object.keys(feesTypeApplied)
  .map((key) => {
    if (
      feesTypeApplied[key] !== feesTypeApplied.TUITION_FEE &&
      !feesTemplateTypes[key]
    ) {
      return null;
    }
    return {
      value: feesTypeApplied[key],
      label: t1(feesTypeApplied[key]),
      primaryText: t1(feesTypeApplied[key]),
    };
  })
  .filter(Boolean);

const schema = (formid, values) => ({
  filter_targets_applied: {
    type: 'cascade',
    classWrapper: 'col-md-12',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('filter_targets_applied'),
      displayFields,
      forSearch: true,
      notValidate: true,
      multiple: true,
    }),
  },
  template_type: {
    classWrapper: 'col-md-12',
    fullWidth: true,
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('type_fee_template'),
    hintText: t1('type_of_status'),
    options: feeTemplateTypeOptions,
    defaultValue: feeTemplateTypeOptions.map((item) => item.value),
  },
});

const ui = () => [
  {
    id: 'id',
    fields: ['filter_targets_applied', 'template_type'],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
