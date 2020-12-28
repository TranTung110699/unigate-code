function loading(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_LOADING_STATUS': {
      const data = action.data || {};
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
}

export default loading;
