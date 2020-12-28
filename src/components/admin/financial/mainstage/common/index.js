import { constants } from 'configs/constants';

export function convertValueToLabel(type, value) {
  const item =
    Array.isArray(constants[type]) &&
    constants[type].find((t) => t && t.value === value);
  return (item && item.primaryText) || '';
}

export const getFeeCurrency = (fee) =>
  (fee && fee.fee_template && fee.fee_template.currency) || '';
