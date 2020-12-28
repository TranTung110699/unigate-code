const actions = {
  changeStatusCollapseMenu: (params) => ({
    type: 'CHANGE_STATUS_COLLAPSE_MENU',
    params,
  }),
  changeSelectedRole: (params) => ({
    type: 'CHANGE_SELECTED_ROLE',
    params,
  }),
};

export default actions;
