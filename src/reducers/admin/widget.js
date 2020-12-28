export default function(
  state = { form: {}, role: {}, enableResize: false },
  action,
) {
  switch (action.type) {
    case 'CHANGE_ACTION_FILTER': {
      const { params, formid } = action;
      const form = { ...state.form };
      form[formid] = params;
      return { ...state, form };
    }
    case 'ACTION_ENABLE_RESIZE_WIDGET': {
      const { enable } = action;
      return { ...state, enableResize: enable };
    }
    default:
      return state;
  }
}
