import lodashGet from 'lodash.get';

let storeSubscribers = new Map();
let watchAllActions = false;

//==============UTILITY FUNCTIONS FOR DEBUGING REDUX STORE ============================
/**
 * to watch for changes at redux state
 * if you only want to focus on small part of state, pass 'path' param
 * if you want to set an id for this watcher, pass 'subscriberId' param
 *    otherwise subscriberId will be the same as path or 'default' if path is empty
 *
 * E.g:
 * state = {
 *   a: 'value of a',
 *   b: 'value of b'
 * }
 *
 * window.watchState();
 * =>  when anything change => you will see logs in console
 * window.watchState('a');
 * =>  when 'a' change => you will see logs in console
 * =>  when 'b' change => you will not see anything in console
 *
 * @param path
 * @param subscriberId
 */
window.watchState = (path, subscriberId = '') => {
  const realId = subscriberId || path || 'default';
  storeSubscribers.set(realId, path);
};

/**
 * to cancel watcher with subscriberId
 *
 * @param subscriberId
 */
window.unwatchState = (subscriberId) => {
  storeSubscribers.delete(subscriberId);
};

window.setWatchAllActions = (v) => {
  watchAllActions = v;
};

//=====================================================================================

/**
 * E.g:
 *  oldState = {
 *      a: {
 *          b: [1, 2, 3],
 *          c: 13
 *      },
 *      d: 7
 *  }
 *
 *  newState = {
 *      a: {
 *          b: [1, 3, 2],
 *          c: 13
 *      },
 *      d: 5
 *  }
 *
 *  => return [
 *    'a.b',
 *    'd'
 *  ]
 * @param oldState
 * @param newState
 *
 * @return array
 */
const getDiffPaths = (oldState, newState) => {
  const isValid = (state) =>
    typeof state === 'object' && state !== null && !Array.isArray(state);

  if (!isValid(oldState) || !isValid(newState)) {
    return [];
  }

  let results = [];

  const allKeys = Object.keys(oldState)
    .concat(Object.keys(newState))
    .filter((key, index, arr) => arr.indexOf(key) === index);

  allKeys.forEach((key) => {
    if (newState[key] !== oldState[key]) {
      const diffPathsOfSubTree = getDiffPaths(newState[key], oldState[key]);
      if (diffPathsOfSubTree.length > 0) {
        results = results.concat(
          diffPathsOfSubTree.map((cPath) => `${key}.${cPath}`),
        );
      } else {
        results = results.concat([key]);
      }
    }
  });

  return results;
};

export default (reducer) => (oldState, action, ...rest) => {
  const newState = reducer(oldState, action, ...rest);

  if ((storeSubscribers && storeSubscribers.size) || watchAllActions) {
    storeSubscribers.forEach((path, id) => {
      const [partOfOldState, partOfNewState] = path
        ? [lodashGet(oldState, path), lodashGet(newState, path)]
        : [oldState, newState];

      let hasDiff = partOfNewState !== partOfOldState;
      if (hasDiff || watchAllActions) {
        let diffs = [];

        if (hasDiff) {
          const diffPaths = getDiffPaths(partOfOldState, partOfNewState);
          if (Array.isArray(diffPaths) && diffPaths.length > 0) {
            diffs = diffPaths.reduce(
              (res, path) => ({
                ...res,
                [path]: {
                  old: lodashGet(partOfOldState, path),
                  new: lodashGet(partOfNewState, path),
                },
              }),
              {},
            );
          }
        }

        console.trace(id, {
          action,
          ...(hasDiff && {
            oldState: partOfOldState,
            newState: partOfNewState,
            diffs,
          }),
        });
      }
    });
  }

  return newState;
};
