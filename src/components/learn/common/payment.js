const progressThresholds = {
  locked: [-1, 0],
  notyet: [0, 1],
  struggling: [1, 50],
  completed: [50, 101],
};

// const getTcoLevel = (progress) => {
//   const level = Object.keys(progressThresholds).reduce(
//     (result, key) => {
//       const value = progressThresholds[key];
//       if (progress >= value[0] && progress < value[1]) {
//         return key;
//       }
//       return result;
//     }, 'locked');
//
//   return level;
// };

export const isLocked = (isPreview, itemPrice) => !isPreview && itemPrice > 0;
