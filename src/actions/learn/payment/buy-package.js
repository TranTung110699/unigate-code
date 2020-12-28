export const ADD_PACKAGE_TO_BUY = 'ADD_PACKAGE_TO_BUY';
export const ADD_CHECKOUT_ITEM = 'ADD_CHECKOUT_ITEM';
export const ADD_CHECKOUT_ITEM_SAGA = 'ADD_CHECKOUT_ITEM_SAGA';

export const addPackageToBuy = (packageIid) => ({
  type: ADD_PACKAGE_TO_BUY,
  packageIid,
});

export const addCheckoutItem = (item) => ({
  type: ADD_CHECKOUT_ITEM,
  item,
});

export const addCheckoutItemSaga = (config) => ({
  type: ADD_CHECKOUT_ITEM_SAGA,
  config,
});
