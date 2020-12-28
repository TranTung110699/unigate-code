const languageState = 'en';

const LanguageState = (state = languageState, action) => {
  let newState = {};
  switch (action.type) {
    case 'SET_LOCALE':
      newState = languageState;
      // newState = action.locale;
      break;
    default:
      return state;
  }
  return newState;
};
export default LanguageState;
