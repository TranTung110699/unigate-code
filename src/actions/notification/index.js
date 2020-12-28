export const SET_UNREAD_NOTIFICATIONS = 'SET_UNREAD_NOTIFICATIONS';

export const notificationActions = {
  setUnreadNotificationsNumber: () => {
    return {
      type: SET_UNREAD_NOTIFICATIONS,
    };
  },
};
