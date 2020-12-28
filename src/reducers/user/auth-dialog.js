/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

import { LOGIN_ACTION, LOGOUT_ACTION } from 'actions/auth';

import {
  ACTIVE_LOGIN_TAB_ACTION,
  ACTIVE_REGISTER_TAB_ACTION,
  CLOSE_LOGIN_DIALOG,
  OPEN_LOGIN_DIALOG,
} from 'actions/auth/auth-dialog';

const initialState = {
  isLoginTabActivated: true,
  openLoginDialog: false,
};

const auth = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ACTIVE_LOGIN_TAB_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: true,
      };
      break;

    case LOGIN_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: true,
      };
      break;

    case LOGOUT_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: true,
        // TODO: reset state.user ?
      };
      break;

    case ACTIVE_REGISTER_TAB_ACTION:
      newState = {
        ...state,
        isLoginTabActivated: false,
      };
      break;
    case OPEN_LOGIN_DIALOG: {
      const optionsProperties =
        action.openLoginDialog && action.optionsProperties
          ? action.optionsProperties
          : {};
      const redirectLoginFailed =
        action.redirectLoginFailed || state.redirectLoginFailed || null;
      newState = {
        ...state,
        openLoginDialog: action.openLoginDialog,
        optionsProperties,
        redirectLoginFailed,
      };
      break;
    }
    case CLOSE_LOGIN_DIALOG:
      newState = {
        ...state,
        openLoginDialog: action.openLoginDialog,
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default auth;
