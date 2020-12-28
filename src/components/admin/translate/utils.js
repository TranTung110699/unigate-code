export const getTranslateScope = (pathname) =>
  pathname.indexOf('system') !== -1 ? 'system' : 'school';
