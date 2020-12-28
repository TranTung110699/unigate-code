export const CHANGE_USER_MONEY = 'CHANGE_USER_MONEY';
export const CHANGE_USER_WORKING_MODE = 'CHANGE_USER_WORKING_MODE';

export const changeUserWorkingMode = (workingMode) => ({
  type: CHANGE_USER_WORKING_MODE,
  workingMode,
});

export const changeUserMoney = (counter) => ({
  type: CHANGE_USER_MONEY,
  counter,
});
