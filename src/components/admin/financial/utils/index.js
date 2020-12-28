import {
  CURRENCY_JPY,
  CURRENCY_PERCENT,
  CURRENCY_USD,
  CURRENCY_VND,
} from 'configs/constants';

export function calculateBenefit(fee, benefit) {
  if (!fee || !benefit) return 0;
  const feeTemplate = fee.fee_template;
  const amount = fee.amount;

  if (!feeTemplate) return 0;

  switch (benefit.benefit_type) {
    case 'discount_for_repeating_subject': {
      const targetItem = fee.target_item;
      const numberOfTimesRepeatingSubject =
        targetItem && targetItem.number_of_times_repeating_subject;
      const discountPercent =
        Array.isArray(benefit.repeating_subject_discount_percent) &&
        benefit.repeating_subject_discount_percent[
          numberOfTimesRepeatingSubject - 1
        ];
      return discountPercent ? (amount * discountPercent) / 100 : 0;
    }
    default: {
      const feeTemplateCurrency = feeTemplate.currency;
      const benefitCurrency = benefit.currency;
      let money = 0;
      switch (benefitCurrency) {
        case CURRENCY_PERCENT.value:
          money = (amount * benefit.amount) / 100;
          break;
        case CURRENCY_VND.value:
        case CURRENCY_USD.value:
        case CURRENCY_JPY.value:
          if (feeTemplateCurrency === benefitCurrency) {
            money = benefit.amount;
          }
          break;
        default:
          break;
      }
      return money;
    }
  }
}
