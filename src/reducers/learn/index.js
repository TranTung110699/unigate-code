import { secondsToTimeString } from 'common/utils/Date';
import {
  ACTIVE_ITEMS_IN_VIEW,
  CLEAR_ANSWERS,
  CURRENT_LEARN_ELEMENT,
  DISPLAY_CONFIGURATION_COURSE,
  DISPLAY_QUESTIONS_CHECKED_RESULT,
  INIT_LEARN_VIEW_LIST,
  SAVE_ANSWER,
  SAVE_ITEM_INFO,
  SAVE_ITEM_COUNT_DOWN_TIME,
  SAVE_ITEM_QUESTION_AUDIO_STATUS,
  SAVE_ITEM_QUESTION_INFO,
  SAVE_TCOS_PRICE_TO_STORE,
  SET_PAPER_ID,
  SET_POSITION_OF_NOW_PLAYING_ITEM_ON_NAV,
  SET_USER_ANSWER,
  STOP_DISPLAY_QUESTIONS_CHECKED_RESULT,
  SET_ANSWERS_LOG,
  SAVE_TAKE_REQUEST_FAIL,
  SAVE_TAKE_REQUEST_SUCCESS,
  SHOW_SYLLABUS_IN_EP,
  CLOSE_NAV_DRAWER,
} from 'actions/learn';
import lodashGet from 'lodash.get';
import { concatToSet, removeMultiple } from 'common/utils/Array';
import { SHOW_SAVE_QUESTION_ONLY } from 'actions/learn/exercise/normal/saga-creators';

const getItemInfoFromState = (state, itemIid) => {
  const currentInfo = state.info || {};
  return currentInfo[itemIid];
};

const getStateAfterSaveItemInfo = (state, itemIid, info, shouldUpdate) => {
  const currentInfo = state.info || {};
  const currentItemInfo = currentInfo[itemIid];

  const newItemInfo = shouldUpdate
    ? Object.assign({}, currentItemInfo, info)
    : Object.assign({}, info);

  const newInfo = Object.assign({}, currentInfo, { [itemIid]: newItemInfo });

  return {
    ...state,
    info: newInfo,
  };
};

const getQuestionInfoFromState = (state, itemIid, questionUniqueId) => {
  const currentLearnInfo = state.info || {};
  const currentItemInfo = currentLearnInfo[itemIid] || {};
  const currentItemQuestionsInfo = currentItemInfo.questions || {};
  const currentItemQuestionInfo = currentItemQuestionsInfo[questionUniqueId];
  return currentItemQuestionInfo;
};

const getStateAfterSaveItemQuestionInfo = (
  state,
  itemIid,
  questionUniqueId,
  info,
  shouldUpdate,
) => {
  const currentLearnInfo = state.info || {};
  const currentItemInfo = currentLearnInfo[itemIid] || {};
  const currentItemQuestionsInfo = currentItemInfo.questions || {};
  const currentItemQuestionInfo = currentItemQuestionsInfo[questionUniqueId];

  const newItemQuestionInfo = shouldUpdate
    ? Object.assign({}, currentItemQuestionInfo, info)
    : Object.assign({}, info);

  const newItemQuestionsInfo = Object.assign({}, currentItemQuestionsInfo, {
    [questionUniqueId]: newItemQuestionInfo,
  });
  const newItemInfo = Object.assign({}, currentItemInfo, {
    questions: newItemQuestionsInfo,
  });
  const newLearnInfo = Object.assign({}, currentLearnInfo, {
    [itemIid]: newItemInfo,
  });

  return Object.assign({}, state, { info: newLearnInfo });
};

const learnInitialState = {
  navs: {},
  viewer: {
    // learIid: {
    //   activeItems: [],
    //   items: {},
    // }
  },
};

const MM = (state = learnInitialState, action) => {
  let newState = {};
  switch (action.type) {
    case INIT_LEARN_VIEW_LIST: {
      let learnObject = state.viewer[action.iid];
      learnObject = learnObject || {};
      learnObject = { ...learnObject, items: action.items };

      newState = {
        ...state,
        viewer: {
          ...state.viewer,
          [action.iid]: learnObject,
        },
      };
      break;
    }
    case ACTIVE_ITEMS_IN_VIEW: {
      let learn = state.viewer[action.iid];
      learn = learn || {};
      learn = { ...learn, activeItems: action.activeItems };

      newState = {
        ...state,
        viewer: {
          ...state.viewer,
          [action.iid]: learn,
        },
      };
      break;
    }
    case SET_POSITION_OF_NOW_PLAYING_ITEM_ON_NAV: {
      const data = action.data;
      const { positionOfCurrentItem } = data;

      newState = {
        ...state,
        positionOfCurrentItem,
      };
      break;
    }
    case CURRENT_LEARN_ELEMENT: {
      const data = action.data;
      const { navId } = data;
      if (navId) {
        const items = navId.split('-');
        data.itemIid = items[items.length - 2];
        data.parentIid = items[items.length - 3];
      }
      newState = {
        ...state,
        ...data,
      };
      break;
    }
    case SET_PAPER_ID: {
      const { paperId } = action;

      newState = {
        ...state,
        paperId,
      };
      break;
    }
    case SAVE_TCOS_PRICE_TO_STORE: {
      const { data } = action;
      const oldData = state.tcosPrice;
      const newData = Object.assign({}, oldData, data);
      newState = {
        ...state,
        tcosPrice: newData,
      };
      break;
    }
    case SAVE_ITEM_INFO: {
      const { itemIid, shouldUpdate } = action;
      newState = getStateAfterSaveItemInfo(
        state,
        itemIid,
        action.info,
        shouldUpdate,
      );
      break;
    }
    case SAVE_TAKE_REQUEST_FAIL: {
      const { itemIid, info: actionInfo } = action;
      const affectedQuestions = lodashGet(actionInfo, 'affectedQuestions');

      const itemInfo = getItemInfoFromState(state, itemIid);
      const currentFailToSaveTakeQuestions = lodashGet(
        itemInfo,
        'failToSaveTakeQuestions',
      );

      newState = getStateAfterSaveItemInfo(
        state,
        itemIid,
        {
          failToSaveTakeQuestions: concatToSet(
            currentFailToSaveTakeQuestions,
            affectedQuestions,
          ),
        },
        true,
      );
      break;
    }
    case SAVE_TAKE_REQUEST_SUCCESS: {
      const { itemIid, info: actionInfo } = action;
      const affectedQuestions = lodashGet(actionInfo, 'affectedQuestions');

      const itemInfo = getItemInfoFromState(state, itemIid);
      const currentFailToSaveTakeQuestions = lodashGet(
        itemInfo,
        'failToSaveTakeQuestions',
      );

      newState = getStateAfterSaveItemInfo(
        state,
        itemIid,
        {
          failToSaveTakeQuestions: removeMultiple(
            currentFailToSaveTakeQuestions,
            affectedQuestions,
          ),
        },
        true,
      );
      break;
    }
    case SAVE_ITEM_COUNT_DOWN_TIME: {
      const { itemIid } = action;
      let { timeLeftInSeconds } = action;

      newState = getStateAfterSaveItemInfo(
        state,
        itemIid,
        {
          timeLeft: secondsToTimeString(timeLeftInSeconds),
          timeLeftInSeconds,
        },
        true,
      );

      break;
    }
    case SAVE_ITEM_QUESTION_INFO: {
      const { itemIid, questionUniqueId, info, shouldUpdate } = action;
      newState = getStateAfterSaveItemQuestionInfo(
        state,
        itemIid,
        questionUniqueId,
        info,
        shouldUpdate,
      );
      break;
    }
    case SAVE_ITEM_QUESTION_AUDIO_STATUS: {
      const { itemIid, questionUniqueId, audioIndex, status } = action;
      const currentQuestionInfo = getQuestionInfoFromState(
        state,
        itemIid,
        questionUniqueId,
      );
      const audiosInfo = currentQuestionInfo.audiosInfo || {};
      const audiosInfoAtIndex = audiosInfo[audioIndex] || {};
      const newAudiosInfoAtIndex = Object.assign({}, audiosInfoAtIndex, {
        status,
      });
      const newAudiosInfo = Object.assign({}, audiosInfo, {
        [audioIndex]: newAudiosInfoAtIndex,
      });

      newState = getStateAfterSaveItemQuestionInfo(
        state,
        itemIid,
        questionUniqueId,
        {
          audiosInfo: newAudiosInfo,
        },
        true,
      );
      break;
    }
    case SAVE_ANSWER: {
      const { questionIndex, answer, itemIid } = action;
      newState = getStateAfterSaveItemQuestionInfo(
        state,
        itemIid,
        questionIndex,
        { answer },
        true,
      );
      break;
    }
    case SET_USER_ANSWER: {
      const { userAnswers, itemIid } = action;
      newState = Object.keys(userAnswers || {}).reduce((tmpState, key) => {
        const answer = userAnswers[key];
        return getStateAfterSaveItemQuestionInfo(
          tmpState,
          itemIid,
          key,
          { answer },
          true,
        );
      }, state);
      break;
    }
    case CLEAR_ANSWERS: {
      const { itemIid } = action;
      const questionsInfo =
        (state.info && state.info[itemIid] && state.info[itemIid].questions) ||
        {};
      newState = Object.keys(questionsInfo).reduce(
        (tmpState, key) =>
          getStateAfterSaveItemQuestionInfo(
            tmpState,
            itemIid,
            key,
            { answer: null },
            true,
          ),
        state,
      );
      break;
    }
    case DISPLAY_QUESTIONS_CHECKED_RESULT: {
      const { questionIndexes, itemIid } = action;

      if (!questionIndexes) {
        const questionsInfo =
          (state.info &&
            state.info[itemIid] &&
            state.info[itemIid].questions) ||
          {};
        newState = Object.keys(questionsInfo).reduce(
          (tmpState, key) =>
            getStateAfterSaveItemQuestionInfo(
              tmpState,
              itemIid,
              key,
              { shouldDisplayCheckedResult: true },
              true,
            ),
          state,
        );
      } else if (Array.isArray(questionIndexes)) {
        newState = questionIndexes.reduce(
          (tmpState, index) =>
            getStateAfterSaveItemQuestionInfo(
              tmpState,
              itemIid,
              index,
              { shouldDisplayCheckedResult: true },
              true,
            ),
          state,
        );
      }

      break;
    }
    case STOP_DISPLAY_QUESTIONS_CHECKED_RESULT: {
      const { questionIndexes } = action;
      const { itemIid } = action;

      if (!questionIndexes) {
        const questionsInfo =
          (state.info &&
            state.info[itemIid] &&
            state.info[itemIid].questions) ||
          {};
        newState = Object.keys(questionsInfo).reduce(
          (tmpState, key) =>
            getStateAfterSaveItemQuestionInfo(
              tmpState,
              itemIid,
              key,
              { shouldDisplayCheckedResult: false },
              true,
            ),
          state,
        );
      } else if (Array.isArray(questionIndexes)) {
        newState = questionIndexes.reduce(
          (tmpState, index) =>
            getStateAfterSaveItemQuestionInfo(
              tmpState,
              itemIid,
              index,
              { shouldDisplayCheckedResult: false },
              true,
            ),
          state,
        );
      }

      break;
    }
    case DISPLAY_CONFIGURATION_COURSE: {
      const { display } = action;

      newState = {
        ...state,
        displayConfigurationCourse: display,
      };
      break;
    }
    case SET_ANSWERS_LOG: {
      const { answersLog } = action;

      newState = {
        ...state,
        answersLog,
      };
      break;
    }
    case SHOW_SAVE_QUESTION_ONLY: {
      const { isShowSaveQuestionOnly } = action;

      newState = {
        ...state,
        isShowSaveQuestionOnly,
      };
      break;
    }
    case SHOW_SYLLABUS_IN_EP: {
      const { EPItemIid } = action;

      newState = {
        ...state,
        EPItemIid,
      };
      break;
    }
    case CLOSE_NAV_DRAWER: {
      const { showDrawer } = action;

      newState = {
        ...state,
        showNavDrawer: showDrawer,
      };
      break;
    }
    default:
      return state;
  }
  return newState;
};

export default MM;
