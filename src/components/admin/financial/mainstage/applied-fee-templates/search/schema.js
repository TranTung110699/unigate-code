/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { constants } from 'configs/constants';

const styles = {
  checkBox: {
    width: '130px',
  },
};
const schema = () => ({
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
  school_year_and_semester: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      displayFields: ['school_year', 'semester'],
      notValidate: true,
      forSearch: true,
    }),
  },
  fee_template__template_type: {
    classWrapper: 'col-md-9',
    fullWidth: true,
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('type_fee_template'),
    hintText: t1('type_of_status'),
    labelStyle: styles.checkBox,
    options: constants.feeTemplateTypes(),
    defaultValue: constants.feeTemplateTypes().map((item) => item.value),
  },
  status: {
    classWrapper: 'col-md-3',
    name: 'status',
    fullWidth: true,
    type: 'multiCheckbox',
    inline: true,
    floatingLabelText: t1('status'),
    options: constants.feeTemplateStatusOptions(),
    defaultValue: constants
      .feeTemplateStatusOptions()
      .map((item) => item.value),
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'major',
      'school_year_and_semester',
      'fee_template__template_type',
      'status',
    ],
  },
];

export default { schema, ui };
