export const ADD_MONEY_BY_CARD_REQUEST = 'ADD_MONEY_BY_CARD_REQUEST';
export const GET_USER_MONEY_REQUEST = 'GET_USER_MONEY_REQUEST';

export const addMoneyByCardRequest = (params) => ({
  type: ADD_MONEY_BY_CARD_REQUEST,
  params,
});

export const getUserMoney = () => ({ type: GET_USER_MONEY_REQUEST });
