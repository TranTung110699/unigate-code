const loginAs = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case 'MASK_TEACHER':
      newState = action.payload;
      break;
    default:
      return state;
  }
  return newState;
};

export default loginAs;
