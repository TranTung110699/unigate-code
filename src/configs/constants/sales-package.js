export const orderStatus = {
  CREATED: 'CREATED',
  PAID: 'PAID',
  FULLFILLED: 'FULLFILLED',
  CANCELED: 'CANCELED',
};

export const orderStatusLabel = (key) => {
  const map = {
    [orderStatus.CREATED]: 'created',
    [orderStatus.PAID]: 'paid',
    [orderStatus.FULLFILLED]: 'fullfilled',
    [orderStatus.CANCELED]: 'canceled',
  };

  return map[key];
};

export const paymentMethods = {
  BANKING: 'BANK',
  CARD: 'CARD',
};

export const paymentMethodLabel = (key) => {
  const map = {
    [paymentMethods.BANKING]: 'banking',
    [paymentMethods.CARD]: 'gojapan_card',
  };

  return map[key];
};

export const cardStatus = {
  SUCCESS: 'SUCCESS',
  INVALID_ORDER_STATUS: 'INVALID_ORDER_STATUS',
  CARD_INVALID: 'CARD_INVALID',
  CARD_INSUFFICIENT: 'CARD_INSUFFICIENT',
};

export const cardStatusMessage = (key) => {
  const map = {
    [cardStatus.SUCCESS]: 'success',
    [cardStatus.INVALID_ORDER_STATUS]: 'invalid_order_status',
    [cardStatus.CARD_INVALID]: 'card_invalid',
    [cardStatus.CARD_INSUFFICIENT]: 'card_insufficient',
  };

  return map[key];
};

export const packageStatus = {
  created: 'created',
  approved: 'approved',
  deleted: 'deleted',
};
