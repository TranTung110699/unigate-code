export const LOGIN_OAUTH_SUCCESS_REQUEST = 'LOGIN_OAUTH_SUCCESS_REQUEST';
export const RE_LOGIN = 'RE_LOGIN';

export const loginOAuthSuccessRequest = (
  loginType,
  token,
  params,
  history,
  actionType,
  nextUrl,
) => ({
  type: 'LOGIN_OAUTH_SUCCESS_REQUEST',
  loginType,
  token,
  params,
  history,
  actionType,
  nextUrl,
});

export const reLogin = () => ({
  type: RE_LOGIN,
});
