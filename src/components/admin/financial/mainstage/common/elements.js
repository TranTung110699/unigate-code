import { feesTemplateTypes, feeTemplateTypeOptions } from 'configs/constants';
import { t1 } from 'translate';

export const formulasOfFee = (props = {}) => ({
  type: 'radio',
  fullWidth: true,
  inline: true,
  floatingLabelText: t1('formulas_of_fee'),
  floatingLabelFixed: true,
  options: feeTemplateTypeOptions().filter(
    (option) =>
      option &&
      [
        feesTemplateTypes.TUITION_FEE_BY_SUBJECT,
        feesTemplateTypes.TUITION_FEE_BY_CREDIT,
        feesTemplateTypes.TUITION_FEE_BY_SEMESTER,
      ].includes(option.value),
  ),
  ...props,
});
