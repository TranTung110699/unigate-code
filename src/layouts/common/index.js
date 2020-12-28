import lGet from 'lodash.get';

export const hasShowTopMenu = (menu, themeConfig) => {
  const availableTopMenus = lGet(themeConfig, 'top_menus_available', '');
  if (availableTopMenus.indexOf(menu) !== -1) {
    return true;
  }
  return false;
};
