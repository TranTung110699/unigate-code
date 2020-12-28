function timer(state = {}, action) {
  switch (action.type) {
    case 'SAVE_TIME_COUNT_DOWN': {
      const { stateKey, data } = action;
      return { ...state, [stateKey]: data };
    }
    case 'SAVE_TIME_COUNT_UP': {
      const { stateKey, data } = action;
      return { ...state, [stateKey]: data };
    }
    default:
      return state;
  }
}

export default timer;
