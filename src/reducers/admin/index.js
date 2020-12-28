function AdminLeftMenuState(state = { status: {}, role: {} }, action) {
  switch (action.type) {
    case 'CHANGE_STATUS_COLLAPSE_MENU': {
      const { params } = action;
      let newState = {};
      newState = { ...state };
      newState.status[params.id] = params.open;
      return newState;
    }
    case 'CHANGE_SELECTED_ROLE': {
      const { params } = action;
      return { ...state, role: params };
    }
    default:
      return state;
  }
}

export default AdminLeftMenuState;
