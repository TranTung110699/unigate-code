function handleEditable(state = {}, action) {
  switch (action.type) {
    case 'HANDLE_EDITABLE': {
      const { data } = action;
      return {
        ...state,
        ...data,
      };
    }
    default: {
      return state;
    }
  }
}

export default handleEditable;
