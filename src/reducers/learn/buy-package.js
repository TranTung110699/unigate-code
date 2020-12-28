import {
  ADD_CHECKOUT_ITEM,
  ADD_PACKAGE_TO_BUY,
} from '../../actions/learn/payment/buy-package';

const initialState = {
  buyPackageIid: undefined,
};

export default function buyPackage(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case ADD_PACKAGE_TO_BUY: {
      const { packageIid } = action;

      newState = {
        ...state,
        packageIid,
      };
      break;
    }

    case ADD_CHECKOUT_ITEM: {
      const { item } = action;

      newState = {
        ...state,
        checkoutItem: item,
      };
      break;
    }

    default:
      return state;
  }

  return newState;
}
