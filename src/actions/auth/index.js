/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */
import userLinks from 'routes/links/user';
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const SESSION_EXPIRED = 'SESSION_EXPIRED';

export function login(params, history) {
  const loginUrl = userLinks.login;
  return { type: LOGIN_ACTION, loginUrl, params, history };
}

export function loginSuccess(userInfo, keyFilter) {
  return { type: LOGIN_SUCCESS_ACTION, userInfo, keyFilter };
}

export function logout(redirectUrl, showMessage = true) {
  const logoutUrl = userLinks.logout;
  return { type: LOGOUT_ACTION, logoutUrl, redirectUrl, showMessage };
}

export function maskTeacher(teacher) {
  return {
    type: 'MASK_TEACHER',
    payload: teacher,
  };
}

export function unmaskTeacher(teacher) {
  return {
    type: 'UNMASK_TEACHER',
    payload: teacher,
  };
}

export const sessionExpired = (expired) => ({
  type: SESSION_EXPIRED,
  expired,
});
