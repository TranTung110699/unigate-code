/*
*/
import Store from 'store';

const getLocalStorage = (key) => {
  const persistKey = `reduxPersist:${key}`;
  if (!localStorage.getItem(persistKey)) {
    return null;
  }
  const data = JSON.parse(localStorage.getItem(persistKey)) || {};
  return data;
};

const getUser = (key) => {
  key = key || 'user';
  let userInfo = Store.getState()[key];
  const user = userInfo && userInfo.info;
  if (!user || !user.iid) {
    userInfo = getLocalStorage(key) || {};
  }
  return userInfo;
};

export default getUser;
