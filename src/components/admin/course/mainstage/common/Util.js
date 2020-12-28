import get from 'lodash.get';

export const getHistoryOfUser = (session, user, order) => {
  let history = get(session, `histories[${order || 0}].attendance`, []) || [];

  if (typeof history === 'object') {
    history = Object.values(history);
  }

  return Array.isArray(history)
    ? history.find((item) => get(item, 'user_iid') == get(user, 'iid'))
    : {};
};
