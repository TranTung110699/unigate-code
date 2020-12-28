/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
export const ACTIVE_LOGIN_TAB_ACTION = 'ACTIVE_LOGIN_TAB_ACTION';
export const OPEN_LOGIN_DIALOG = 'OPEN_LOGIN_DIALOG';
export const CLOSE_LOGIN_DIALOG = 'CLOSE_LOGIN_DIALOG';
export const ACTIVE_REGISTER_TAB_ACTION = 'ACTIVE_REGISTER_TAB_ACTION';

export function activeLoginTab() {
  return { type: ACTIVE_LOGIN_TAB_ACTION };
}

export function openLoginDialog(
  optionsProperties = {},
  redirectLoginFailed = null,
) {
  return {
    type: OPEN_LOGIN_DIALOG,
    openLoginDialog: true,
    optionsProperties,
    redirectLoginFailed,
  };
}

export function closeLoginDialog() {
  return { type: OPEN_LOGIN_DIALOG, openLoginDialog: false };
}

export function activeRegisterTab() {
  return { type: ACTIVE_REGISTER_TAB_ACTION };
}
