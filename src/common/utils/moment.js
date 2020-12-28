/**
 * utility functions to deal with moment.js
 */

export const setMomentObjectToStartOfDay = (momentObject) => {
  momentObject.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
};

export const setMomentObjectToEndOfDay = (momentObject) => {
  momentObject.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });
};
