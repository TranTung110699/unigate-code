export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';

export const forgotPassword = (params) => ({
  type: FORGOT_PASSWORD_REQUEST,
  params,
});
