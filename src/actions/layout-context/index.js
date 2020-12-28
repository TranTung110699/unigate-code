export const layoutContextActionTypes = {
  SET_STATE_OF_LEFT_MENU: 'SET_STATE_OF_LEFT_MENU',
  SET_MENU_LEFT: 'SET_MENU_LEFT',
  SET_BREADCRUMB: 'SET_BREADCRUMB',
  SET_SUBMENU_LEFT: 'SET_SUBMENU_LEFT',
  SET_SUBMENU_TOP: 'SET_SUBMENU_TOP',
  SET_MENU_TOP: 'SET_MENU_TOP',
  SET_APPLICABLE_WORKING_MODES: 'APPLICABLE_WORKING_MODES',
};

export default {
  setStateOfLeftMenu(isOpenLeftMenu) {
    return {
      type: layoutContextActionTypes.SET_STATE_OF_LEFT_MENU,
      isOpenLeftMenu,
    };
  },
  setMenuLeft(data) {
    return { type: layoutContextActionTypes.SET_MENU_LEFT, data };
  },
  setSubMenuLeft(data) {
    return { type: layoutContextActionTypes.SET_SUBMENU_LEFT, data };
  },
  setSubMenuTop(data) {
    return { type: layoutContextActionTypes.SET_SUBMENU_TOP, data };
  },
  setTopMenu(data) {
    return { type: layoutContextActionTypes.SET_MENU_TOP, data };
  },
  setBreadCrumb(data) {
    return { type: layoutContextActionTypes.SET_BREADCRUMB, data };
  },
  setApplicableWorkingModes(data) {
    return {
      type: layoutContextActionTypes.SET_APPLICABLE_WORKING_MODES,
      data,
    };
  },
};
