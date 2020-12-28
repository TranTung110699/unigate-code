/**
 * Created by Peter Hoang Nguyen on 3/15/2017.
 */

import { ADD_PHONETIC_DIFF, CLEAN_PHONETIC_DIFF } from 'actions/learn';

const recognitionInitialState = {
  recognizing: false,
  recognizingVid: 0,
  vocabset: {},
  vocabsetList: {}, // noi nhieu vobcabset
  resultList: {},
  phoneticDiff: {},
  lang: 'us',
  autoRecognition: false,
};

const Recognition = (state = recognitionInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_PHONETIC_DIFF: {
      const { vid, position, phoneticDiff } = action;
      const oldState = Object.assign({}, state);
      const oldPhoneticDiff = Object.assign({}, oldState.phoneticDiff);
      const oldVideoPhoneticDiff = Object.assign({}, oldPhoneticDiff[vid]);
      const newVideoPhoneticDiff = Object.assign({}, oldVideoPhoneticDiff, {
        [position]: phoneticDiff,
      });
      const newPhoneticDiff = Object.assign({}, oldPhoneticDiff, {
        [vid]: newVideoPhoneticDiff,
      });
      newState = Object.assign({}, oldState, { phoneticDiff: newPhoneticDiff });
      break;
    }
    case CLEAN_PHONETIC_DIFF: {
      const { vid } = action;
      const oldState = Object.assign({}, state);
      const newPhoneticDiff = Object.assign({}, oldState.phoneticDiff);
      delete newPhoneticDiff[vid];
      newState = Object.assign({}, oldState, { phoneticDiff: newPhoneticDiff });
      break;
    }
    default:
      return state;
  }
  return newState;
};

export default Recognition;
