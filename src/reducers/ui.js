function ui(state = {}, action) {
  switch (action.type) {
    case 'SNACKBAR': {
      const { messageType, message, duration } = action;

      const snackbar = {
        messageType,
        message,
        duration,
        ts: new Date().getTime(),
      };
      return Object.assign({}, state, { snackbar });
    }
    case 'TOGGLE_ADMIN_SIDE_MENU': {
      // console.log('TOGGLE_ADMIN_SIDE_MENU', action);
      const navDrawerClosed = action.closeIt || !state.navDrawerClosed;
      return Object.assign({}, state, { navDrawerClosed });
    }
    default: {
      return state;
    }
  }
}

export default ui;
