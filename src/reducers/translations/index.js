const initDefaultData = () => {
  const data = localStorage.getItem('reduxPersist:translations');
  if (!data) {
    return {
      messages: {},
    };
  }

  try {
    return JSON.parse(localStorage.getItem('reduxPersist:translations'));
  } catch (ex) {}
  return {
    messages: {},
  };
};

const translation = initDefaultData();

const translationState = (state = translation, action) => {
  switch (action.type) {
    case 'SAVE_TRANSLATIONS': {
      const data = action.data || {};
      return Object.assign({}, state, data);
    }
    default:
      return state;
  }
};
export default translationState;
