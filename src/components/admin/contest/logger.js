import lodashGet from 'lodash.get';
import { EXAM_SHIFT_STATE_PREFIX } from 'components/contest/pre-exam';
import {
  SAVE_ANSWER,
  SAVE_TAKE_REQUEST_SUCCESS,
  SET_PAPER_ID,
} from 'actions/learn';
import {
  SAVE_TAKE_REQUEST,
  SAVE_VIOLATION_REQUEST,
} from 'actions/learn/saga-creators';
import {
  FINISH_EXERCISE,
  INIT_EXAM,
} from 'actions/learn/exercise/normal/saga-creators';
import { types as questionTypes } from 'components/admin/question/schema/question-types';

//=============private functions ========================
const formatLog = (action) => {
  action.___ts = new Date().toLocaleString();
  return action;
};

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

// localStorage[key] is an array of objects
Storage.prototype.pushObject = function(key, obj) {
  let value = this.getObject(key) || [];
  value.push(obj);

  this.setObject(key, value);
};

// skip those non-important actions
// TODO: only log if we have 'INIT_EXAM' in the stack
// And also clear this in the log once the exam is submitted
const skipLogging = (action) => {
  if (
    action.type === 'SAVE_ITEM_COUNT_DOWN_TIME' ||
    action.type === 'SAVE_TIME_COUNT_UP'
  ) {
    return true;
  }

  if (
    action.type === SAVE_ANSWER ||
    action.type === SAVE_TAKE_REQUEST ||
    action.type === INIT_EXAM
  )
    return false;

  return true;
};

const didUserAnswer = (answer) => {
  // console.log({ didUserAnswer: answer });

  if (
    lodashGet(answer, 'type') == questionTypes.TYPE_MC ||
    lodashGet(answer, 'type') == questionTypes.TYPE_INLINE ||
    lodashGet(answer, 'type') == questionTypes.TYPE_REORDER ||
    lodashGet(answer, 'type') == questionTypes.TYPE_MATCHING_PAIRS ||
    lodashGet(answer, 'type') == questionTypes.TYPE_NUMBER
  ) {
    if (lodashGet(answer, 'answer') && lodashGet(answer, 'answer').length) {
      return true;
    } else {
      return false;
    }
  }

  return false;
};
// ============= end private functions========================

const addContestReduxLog = (logEntry) => {
  if (localStorage.pushObject) {
    localStorage.pushObject('contest_log', formatLog(logEntry));
  }
};

const simpleContestLogger = (store) => (next) => (action) => {
  if (!skipLogging(action)) {
    // console.group(action.type);
    // console.info('dispatching', action);
    // console.groupEnd();

    let logEntry = null;

    switch (action.type) {
      case INIT_EXAM:
        logEntry = action;
        delete localStorage.contest_log;
        // TODO: add user name to contest
        // console.log({action});
        localStorage.contest_name = lodashGet(action, 'info.name');
        break;

      case SAVE_VIOLATION_REQUEST:
        logEntry = {
          type: action.type,
          contestCode: lodashGet(action, 'params.contest_code'),
        };
        break;
      case 'DATA_API_RESULT': // fetch data
        if (action.keyState.indexOf(EXAM_SHIFT_STATE_PREFIX) === 0) {
          // fetched exam successfully
          logEntry = {
            type: 'DATA_API_RESULT',
            nextExamOrder: lodashGet(action, 'data.nextExamOrder'),
            examStatus: lodashGet(action, 'data.examStatus'),
            iid: lodashGet(action, 'data.iid'),
            name: lodashGet(action, 'data.name'),
            duration: lodashGet(action, 'data.duration'),
          };
        }
        break;
      case SET_PAPER_ID:
        logEntry = {
          type: SET_PAPER_ID,
          paperId: lodashGet(action, 'paperId'),
        };
        break;
      case SAVE_ANSWER:
        const answer = lodashGet(action, 'answer');
        if (didUserAnswer(answer)) {
          logEntry = {
            type: SAVE_ANSWER,
            questionIid: action.questionIndex,
            answer: action.answer,
          };
          if (navigator.onLine) {
            logEntry.networkStatus = 'online';
          } else logEntry.networkStatus = 'OFFLINE';
        } else {
          console.log('empty answer');
        }

        break;
      case SAVE_TAKE_REQUEST:
        // logEntry = action;
        break;
      case SAVE_TAKE_REQUEST_SUCCESS:
        logEntry = action;
        break;
      case FINISH_EXERCISE: {
        logEntry = {
          type: FINISH_EXERCISE,
        };
      }
      default:
        break;
    }

    if (logEntry) {
      addContestReduxLog(logEntry);
    }
  }

  if (typeof next !== 'function') {
    return;
  }

  return next(action);
};

export default simpleContestLogger;

export const getContestReduxLog = () => {
  return localStorage.contest_log;
};
