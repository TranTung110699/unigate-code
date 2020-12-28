const actions = {
  changeActionFilter: (formid, params) => ({
    type: 'CHANGE_ACTION_FILTER',
    formid,
    params,
  }),
  enableResize: (enable) => ({
    type: 'ACTION_ENABLE_RESIZE_WIDGET',
    enable,
  }),
  changeUserWidget: (widget) => ({
    type: 'CHANGE_USER_WIDGET',
    widget,
  }),
};

export default actions;
