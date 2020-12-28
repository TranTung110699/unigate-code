import { SET_UNREAD_NOTIFICATIONS } from 'actions/notification';

const notificationInitialState = {
  unreadNotifications: true,
};

const notification = (state = notificationInitialState, action) => {
  let newState = {};

  switch (action.type) {
    case SET_UNREAD_NOTIFICATIONS:
      newState = {
        ...state,
        unreadNotifications: !(state.unreadNotifications || false),
      };
      break;
    default:
      return state;
  }
  return newState;
};
export default notification;
