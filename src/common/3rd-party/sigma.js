import get from 'lodash.get';

export const initSigma = (userInfo, clientId, publicJwt) => {
  if (!window.hls) return;

  window.hls.appInfo = {
    browser: 'Google-Chrome',
    appId: 6,
    userId: get(userInfo, 'id') || get(publicJwt, 'id'),
    'client-id': clientId,
  };
  window.hls.audioTrack = 0;
  window.hls.setAuthenToken(get(userInfo, 'jwt_cdn') || get(publicJwt, 'jwt'));
};
