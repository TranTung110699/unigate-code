import { SAVE_SUGGEST_AUTO_COMPLETE } from 'actions/suggest/creators';

const suggest = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SUGGEST_AUTO_COMPLETE: {
      const { data } = action;
      return data;
    }
    default:
      return state;
  }
};

export default suggest;
