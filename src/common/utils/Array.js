import get from 'lodash.get';
import clone from 'lodash.clone';
import { set } from './object';

export const removeDuplicatedObjects = (arr) => {
  const usedObjects = {};
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const so = JSON.stringify(arr[i]);
    if (usedObjects[so]) {
      arr.splice(i, 1);
    } else {
      usedObjects[so] = true;
    }
  }
  return arr;
};

export const extractObject = (object, keys = []) => {
  const result = {};
  if (!object || typeof object === 'undefined') {
    return {};
  }
  keys.forEach((key) => {
    if (object[key] && typeof object[key] !== 'undefined') {
      result[key] = object[key];
    }
  });
  return result;
};

export const max = (array, accessor, getMaxAtIndex = 'FIRST') => {
  if (!Array.isArray(array) || array.length === 0) {
    return {
      index: NaN,
      max: NaN,
    };
  }
  const localAccessor =
    typeof accessor === 'function' ? accessor : (element) => element;

  let resultIndex = 0;
  for (let i = 0; i < array.length; i += 1) {
    const valueToCompareAtThisPosition = localAccessor(array[i]);
    const valueToCompareAtResultIndex = localAccessor(array[resultIndex]);
    if (
      (getMaxAtIndex === 'LAST' &&
        valueToCompareAtThisPosition >= valueToCompareAtResultIndex) ||
      (getMaxAtIndex === 'FIRST' &&
        valueToCompareAtThisPosition > valueToCompareAtResultIndex)
    ) {
      resultIndex = i;
    }
  }

  return {
    index: resultIndex,
    max: array[resultIndex],
  };
};

export const sum = (array, accessor) => {
  if (!Array.isArray(array)) {
    return NaN;
  }

  const localAccessor =
    typeof accessor === 'function' ? accessor : (element) => element;

  return array.reduce((result, item) => result + localAccessor(item), 0);
};

export const pushToSet = (array, newItem, accessor) => {
  if (!Array.isArray(array)) {
    return [newItem];
  }

  const localAccessor =
    typeof accessor === 'function' ? accessor : (element) => element;

  return array.findIndex(
    (item) => localAccessor(item) === localAccessor(newItem),
  ) === -1
    ? array.concat([newItem])
    : array;
};

export const concatToSet = (array, anotherArray, accessor) => {
  return filterDuplicate((array || []).concat(anotherArray || []), accessor);
};

export const filterDuplicate = (array, accessor) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  const localAccessor =
    typeof accessor === 'function' ? accessor : (element) => element;

  return array.filter(
    (item, index, arr) =>
      arr.findIndex((elem) => localAccessor(elem) === localAccessor(item)) ===
      index,
  );
};

/**
 * @param array
 * @param itemToRemove
 * @param accessor
 *
 * Ex1:
 *  array = [1, 3, 2, 3, 4]
 *  itemToRemove = 3
 *  accessor = null
 *  => return [1, 2, 4]
 *
 * Ex2:
 *  array = [{ x: 1 }, { x: 3 }, { x: 2 }, { x: 3 }, { x: 4 }]
 *  itemToRemove = { x: 3 }
 *  accessor = (elem) => elem.x;
 *  => return [{ x: 1 }, { x: 2 }, { x: 4 }]
 *
 * @returns array
 */
export const remove = (array, itemToRemove, accessor) => {
  if (!Array.isArray(array)) {
    return array;
  }

  const localAccessor =
    typeof accessor === 'function' ? accessor : (element) => element;

  return array.filter(
    (item) => localAccessor(item) !== localAccessor(itemToRemove),
  );
};

/**
 * @param array
 * @param arrayOfItemsToRemove
 * @param accessor
 *
 * @see remove for param explanation
 */
export const removeMultiple = (array, arrayOfItemsToRemove, accessor) => {
  if (!Array.isArray(arrayOfItemsToRemove)) {
    return array;
  }

  return arrayOfItemsToRemove.reduce(
    (res, itemToRemove) => remove(res, itemToRemove, accessor),
    array,
  );
};

export const removeAtIndex = (array, index) => {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter((item, indexInArray) => indexInArray !== index);
};

export const removeByCondition = (arr, condition) => {
  if (!Array.isArray(arr) || typeof condition !== 'function') {
    return arr;
  }

  return arr.filter((item) => !condition(item));
};

export const updateMultipleElement = (
  arr,
  findCallback,
  updateCallback,
  upsert = false,
) => {
  if (
    typeof findCallback !== 'function' ||
    typeof updateCallback !== 'function'
  ) {
    return [];
  }

  let result = [];
  let found = false;

  if (Array.isArray(arr)) {
    arr.forEach((element) => {
      if (!findCallback(element)) {
        result = result.concat([element]);
        return;
      }
      found = true;
      result = result.concat([updateCallback(element)]);
    });
  }

  if (!found && upsert) {
    result = result.concat([updateCallback()]);
  }

  return result;
};

export const count = (array, condition) => {
  if (!Array.isArray(array)) {
    throw new Error(`count only work with array, you give ${array}`);
  }
  const localCondition =
    typeof condition === 'function' ? condition : (element) => element;

  return array.filter(localCondition).length;
};

export const filterTheMenusAvailable = (menus, menuAvailable) => {
  const result = [];
  if (!Array.isArray(menus) || !menuAvailable || !menuAvailable.length) {
    return [];
  }
  menus.forEach((item) => {
    if (item.children && item.children.length) {
      const children = item.children.filter((child) => {
        if (!child.id) {
          return false;
        }
        if (!menuAvailable || !menuAvailable.length) {
          return true;
        }
        return menuAvailable.includes(child && child.id);
      });
      if (children.length) {
        result.push({ ...item, children });
      }
    } else if (
      item.id &&
      (!menuAvailable ||
        !menuAvailable.length ||
        menuAvailable.includes(item.id))
    ) {
      result.push(item);
    }
  });

  return result;
};

const shouldItemBeShown = (
  menuAvailable,
  childId,
  enableWorkingMode,
  workingMode,
  schoolType,
  isStaff,
) => {
  const itemConfig = menuAvailable[childId];
  if (isStaff && childId === 'group_manage') return true;

  if (!itemConfig) {
    return false;
  }
  /*
    item is something like
    'payment_support' => [
      'meaning' => t('support_course_unlock_payment (payment_support)'),
      'working_modes' => [self::WORKING_MODE_FINANCE, self::WORKING_MODE_PR_MEDIA],
      'applicable_school_types' => [self::TYPE_ENTERPRISE],
    ],
    */

  if (
    enableWorkingMode &&
    workingMode &&
    itemConfig.working_modes &&
    !itemConfig.working_modes.includes(workingMode)
  ) {
    return false;
  }

  // check if this menu is applicable for this type of school
  if (
    itemConfig.applicable_school_types &&
    !itemConfig.applicable_school_types.includes(schoolType)
  ) {
    return false;
  }

  return true;
};

export const filterMenusAvailableForMainLeftMenuV2 = (
  menus,
  menuAvailable,
  enableWorkingMode,
  workingMode,
  schoolType,
  isStaff,
) => {
  const result = [];
  if (
    !Array.isArray(menus) ||
    !menuAvailable ||
    !Object.keys(menuAvailable).length
  ) {
    return [];
  }

  menus.forEach((item) => {
    if (item.subMenu && item.subMenu.length) {
      const subMenu = item.subMenu.filter((menuItem) => {
        if (!menuItem.id) {
          return false;
        }
        return shouldItemBeShown(
          menuAvailable,
          menuItem && menuItem.id,
          enableWorkingMode,
          workingMode,
          schoolType,
          isStaff,
        );
      });

      if (subMenu.length) {
        result.push({ ...item, subMenu });
      }
    } else if (
      // There are level 1 menu items
      item.id &&
      shouldItemBeShown(
        menuAvailable,
        item.id,
        enableWorkingMode,
        workingMode,
        schoolType,
        isStaff,
      )
    ) {
      result.push(item);
    }
  });

  return result;
};

export const filterMenusAvailableForSubLeftMenuV2 = (
  menus,
  keysAvailable,
  checkPermissionMenuItem,
) => {
  const result = [];
  if (!Array.isArray(menus) || !keysAvailable || !keysAvailable.length) {
    return [];
  }

  menus.forEach((item) => {
    if (item.subMenu && item.subMenu.length) {
      const subMenu = item.subMenu.filter((child) => {
        if (child.divider) return true;

        if (!child.id) {
          return false;
        }

        if (!keysAvailable || !keysAvailable.length) {
          return true;
        }

        const isItemAvailable = keysAvailable.includes(child && child.id);
        if (!isItemAvailable) {
          return false;
        }
        return (
          !checkPermissionMenuItem ||
          typeof checkPermissionMenuItem !== 'function' ||
          checkPermissionMenuItem(child)
        );
      });
      if (subMenu.length) {
        result.push({ ...item, subMenu });
      }
    } else if (
      (item.id &&
        (!keysAvailable ||
          !keysAvailable.length ||
          keysAvailable.includes(item.id))) ||
      item.divider
    ) {
      if (
        !checkPermissionMenuItem ||
        typeof checkPermissionMenuItem !== 'function' ||
        checkPermissionMenuItem(item)
      ) {
        result.push(item);
      }
    }
  });

  return result;
};

export const fromArrayToKeyValueObject = (
  arr,
  keyField,
  valueField = undefined,
  defaultValue = undefined,
) =>
  arr.reduce(
    (result, elem) => ({
      ...result,
      [elem[keyField]]:
        (typeof valueField !== 'undefined' ? elem[valueField] : elem) ||
        defaultValue,
    }),
    {},
  );

/**
 * arrayOfItems = [
 *  {id: 1, name: 'One'},
 *  {id: 2, name: 'Two'},
 * ]
 *
 * expect extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue(arrayOfItems, 2, 'id', 'name')
 * to be 'Two'
 */
export const extractSomeAttributeFromArrayItemThatHasAttributeMatchingAValue = (
  arrayOfItems,
  value,
  keyToCompare,
  keyToExtract,
) => {
  if (!arrayOfItems || !arrayOfItems.length) return;

  const filtered = arrayOfItems.filter((item) => item[keyToCompare] === value);
  if (filtered.length) {
    return filtered[0][keyToExtract];
  }
};

/**
 * Grouping objects by a property
 *
 * @param objectArray
 * @param property
 * @returns object
 *
 * E.g:
 * objectArray = [{ a: 1, b: 2}, { a: 1, b: 1}, { a: 2, b: ''}, { a: 2, b: 1}, { b: 0}, { c: 1 }]
 * property = 'a'
 *
 * usage: groupBy(objectArray, 'a')
 * result: {
 *  '1': [ { a: 1, b: 2 }, { a: 1, b: 1 } ],
 *  '2': [ { a: 2, b: '' }, { a: 2, b: 1 } ],
 *  undefined: [ { b: 0 }, { c: 1 } ]
 * }
 */
export const groupByKey = (arrayOfObject, path) => {
  if (!Array.isArray(arrayOfObject) || arrayOfObject.length === 0) {
    return {};
  }

  return arrayOfObject.reduce((result, elem) => {
    const keyValue = get(elem, path);
    return {
      ...result,
      [keyValue]: [...(result[keyValue] || []), elem],
    };
  }, {});
};

/**
 * get an array of where every elements is unique
 *
 * @param array
 * @param accessor
 *
 * E.g:
 *  a = {  u: 12, s: 12 };
 *  b = { u: 13, s: 13 };
 *  c = { u: 12, s: 14 };
 *  d = { u: 14, s: 15 };
 *
 *  unique([a, b, c, d], (elem) => elem.u) = [12, 13, 14]
 */
export const getUnique = (array, accessor) => {
  const localAccessor =
    typeof accessor === 'function' ? accessor : (element) => element;

  return filterDuplicate(array, localAccessor).map(localAccessor);
};

/**
 *
 * @param smallArray
 * @param bigArray
 *
 * E.g:
 *  a = [1, 2, 3, 4, 5, 6, 7, 8]
 *  b = [2, 3, 5, 7]
 *  c = [3, 2, 5, 7]
 *  call function with params:
 *    (b, a, true) => true
 *    (b, a, false) => true
 *    (c, a, true) => false
 *    (c, a, false) => true
 *
 * @param maintainOrder
 */
export const isAnArraysSubsetOfAnotherArray = (
  smallArray,
  bigArray,
  maintainOrder = false,
) => {
  if (!Array.isArray(bigArray) || !Array.isArray(smallArray)) {
    return false;
  }

  if (smallArray.some((elem) => !bigArray.includes(elem))) {
    return false;
  }

  if (!maintainOrder) {
    return true;
  }

  return smallArray.every((elem, index) => {
    if (index === 0) {
      return true;
    }

    const prevElem = smallArray[index - 1];
    return bigArray.indexOf(prevElem) < bigArray.indexOf(elem);
  });
};

/**
 * @param items
 * @param keysToGroup
 * @param keyToPopulateRowSpanInfo
 * E.g
 *  items = [
 *    { a: 1, b: 2, c: 3 },
 *    { a: 1, b: 1, c: 3 },
 *    { a: 1, b: 1, c: 4 },
 *    { a: 2, b: 1, c: 4 },
 *    { a: 3, b: 1, c: 4 },
 *  ];
 *  keysToGroup = ['a', 'b'] (the smaller the key index in this array, the more important its is);
 *  keyToPopulateRowSpanInfo = 'rowSpansInfo';
 *
 *  return [
 *    { a: 1, b: 2, c: 3, rowSpansInfo: { a: 3, b: 1 } },
 *    { a: 1, b: 1, c: 3, rowSpansInfo: { a: 0, b: 2 } },
 *    { a: 1, b: 1, c: 4, rowSpansInfo: { a: 0, b: 0 } },
 *    { a: 2, b: 1, c: 4, rowSpansInfo: { a: 1, b: 1 } },
 *    { a: 3, b: 1, c: 4, rowSpansInfo: { a: 1, b: 1 } },
 *  ],
 *
 * @returns array
 */
export const populateRowSpanInfoToRenderListOfItemAsTable = (
  items,
  keysToGroup = [],
  keyToPopulateRowSpanInfo = 'rowSpans',
) => {
  if (!Array.isArray(items) || items.length === 0) {
    return items;
  }

  const mapFromItemIndexToTheStartRowIndexesOfEachItemKeysToGroup = [];

  items.forEach((elem, elemIndex) => {
    const startRowIndexesOfEachItemKeysToGroupOfThisElem = {};

    if (Array.isArray(keysToGroup)) {
      keysToGroup.forEach((key, keyIndex) => {
        if (elemIndex === 0) {
          startRowIndexesOfEachItemKeysToGroupOfThisElem[key] = elemIndex;
        } else {
          const prevElem = items[elemIndex - 1];
          const startRowIndexesOfEachItemKeysToGroupOfPrevElem =
            mapFromItemIndexToTheStartRowIndexesOfEachItemKeysToGroup[
              elemIndex - 1
            ];

          const valueAtKeyOfElem = get(elem, key);
          const valueAtKeyOfPrevElem = get(prevElem, key);
          if (valueAtKeyOfElem !== valueAtKeyOfPrevElem) {
            startRowIndexesOfEachItemKeysToGroupOfThisElem[key] = elemIndex;
          } else if (keyIndex === 0) {
            startRowIndexesOfEachItemKeysToGroupOfThisElem[key] =
              startRowIndexesOfEachItemKeysToGroupOfPrevElem[key];
          } else {
            const prevKey = keysToGroup[keyIndex - 1];
            startRowIndexesOfEachItemKeysToGroupOfThisElem[key] = Math.max(
              startRowIndexesOfEachItemKeysToGroupOfThisElem[prevKey],
              startRowIndexesOfEachItemKeysToGroupOfPrevElem[key],
            );
          }
        }
      });
    }

    mapFromItemIndexToTheStartRowIndexesOfEachItemKeysToGroup[
      elemIndex
    ] = startRowIndexesOfEachItemKeysToGroupOfThisElem;
  });

  const rowSpans = [];
  mapFromItemIndexToTheStartRowIndexesOfEachItemKeysToGroup.forEach(
    (startRowIndexesOfEachItemKeysToGroup, rowIndex) => {
      rowSpans[rowIndex] = {};
      keysToGroup.forEach((key) => {
        const startRowIndexOfItemKey =
          startRowIndexesOfEachItemKeysToGroup[key];

        rowSpans[startRowIndexOfItemKey][key] =
          rowIndex - startRowIndexOfItemKey + 1;

        if (startRowIndexOfItemKey !== rowIndex) {
          rowSpans[rowIndex][key] = 0;
        }
      });
    },
  );

  return items.map((elem, index) =>
    Object.assign({}, elem, {
      [keyToPopulateRowSpanInfo]: rowSpans[index],
    }),
  );
};

export const isNotEmptyArray = (array) =>
  Array.isArray(array) && array.length > 0;

export const isEmptyArray = (array) =>
  Array.isArray(array) && array.length === 0;

/**
 * Given an array of objects
 *
 * For each object in array:
 *   Deconstructs an array field from the input objects to output an object for each element.
 *   By default each output object is the input object with the value of the array field replaced by the element.
 *
 *   E.g
 *   arr = [
 *    { a: [1, 2, 3], b: 1 },
 *    { a: [1, 2], b: 2 }
 *   ]
 *   keyToUnwind = 'a'
 *
 *   => [
 *    { a: 1, b: 1 },
 *    { a: 2, b: 1 },
 *    { a: 3, b: 1 },
 *    { a: 1, b: 2 }
 *    { a: 2, b: 2 }
 *   ]
 *
 *
 * @param arr
 * @param keyToUnwind
 *
 * @param keyToSaveUnwindValue if you do not override the default key
 * @param modifyNewArrayElemBeforeReturned function if you want to modify newly returned object (may be you want to get info about its original index in input array)
 *
 * @example:
 *   arr = [
 *    {
 *      a: [1, 2, 3],
 *      b: 1
 *    },
 *    {
 *      a: [1, 2],
 *      b: 2
 *    }
 *   ]
 *
 *   keyToUnwind = 'a'
 *   keyToSaveUnwindValue = 'unwinded_a'
 *   modifyNewElement = (newElem, originalIndexInInputArray, originalIndexInSubArray) => ({
 *     ...newElem,
 *     index: originalIndexInInputArray + ':' + originalIndexInSubArray
 *   })
 *
 *   =>  [{
 *           a: [1, 2, 3]
 *           b: 1
 *           index: "0:0"
 *           unwinded_a: 1
 *        },
 *        {
 *           a: [1, 2, 3]
 *           b: 1
 *           index: "0:1"
 *           unwinded_a: 2
 *        },
 *        {
 *           a: [1, 2, 3]
 *           b: 1
 *           index: "0:2"
 *           unwinded_a: 3
 *        },
 *        {
 *           a: [1, 2]
 *           b: 2
 *           index: "1:0"
 *           unwinded_a: 1
 *        },
 *        {
 *           a: [1, 2]
 *           b: 2
 *           index: "1:1"
 *           unwinded_a: 2
 *        }]
 *
 * @return {*}
 */
export const unwind = (
  arr,
  keyToUnwind,
  keyToSaveUnwindValue,
  modifyNewArrayElemBeforeReturned,
) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return arr;
  }

  let results = [];
  arr.forEach((elem, originalIndexInInputArray) => {
    const mayBeArray = get(elem, keyToUnwind);
    if (isNotEmptyArray(mayBeArray)) {
      mayBeArray.forEach((e, originalIndexInSubArray) => {
        let newElem = set(elem, keyToSaveUnwindValue || keyToUnwind, e);
        if (typeof modifyNewArrayElemBeforeReturned === 'function') {
          newElem = modifyNewArrayElemBeforeReturned(
            newElem,
            originalIndexInInputArray,
            originalIndexInSubArray,
          );
        }
        results = results.concat(newElem);
      });
    } else {
      results = results.concat(elem);
    }
  });

  return results;
};

/**
 * create an array with all numbers from "start" to "end"
 *
 * @param start
 * @param end
 * @param step
 * @returns {Array}
 *
 * E.g:
 *  start = 1,
 *  end = 5,
 *  => return [1, 2, 3, 4, 5]
 *
 *  start = 5,
 *  end = 1,
 *  => return [5, 4, 3, 2, 1]
 *
 *  start = 1,
 *  end = 5,
 *  step = 2,
 *  => return [1, 3, 5]
 */
export const range = (start, end, step) => {
  if (step === 0) {
    return [];
  }

  let goUp = true;

  if (typeof step === 'number') {
    goUp = step > 0;
  } else {
    goUp = start < end;
    step = goUp ? 1 : -1;
  }

  let res = [];

  const conditionToLoop = (iter) => (goUp ? iter <= end : iter >= end);

  for (let iter = start; conditionToLoop(iter); iter += step) {
    res = res.concat([iter]);
  }

  return res;
};

/**
 * E.g: array = [1, 2, 3, 4, 5, 6, 7]
 *    chunkSize = 3
 *    => return [[1, 2, 3], [4, 5, 6], [7]]
 *
 * @param array
 * @param chunkSize
 * @returns {Array}
 */
export const splitIntoChunks = (array, chunkSize) => {
  if (
    !Array.isArray(array) ||
    array.length === 0 ||
    !Number.isInteger(chunkSize) ||
    chunkSize <= 0
  ) {
    return [];
  }

  let chunks = [];
  for (let index = 0; index < array.length; index += chunkSize) {
    chunks = chunks.concat([array.slice(index, index + chunkSize)]);
  }

  return chunks;
};

export const average = (array) => {
  if (!Array.isArray(array)) {
    return NaN;
  }

  return sum(array) / array.length;
};

/**
 *
 * @param arr1 ['a', 'b'     ]
 * @param arr2 [     'b', 'c']
 * @returns {Array} ['a']
 */
export const arrayDiff = (arr1, arr2) => {
  const result = [];
  if (!arr1) {
    return result;
  }

  if (!arr2) {
    return arr1;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      result.push(arr1[i]);
    }
  }

  return result;
};

export const last = (arr) => {
  return Array.isArray(arr) ? arr[arr.length - 1] : undefined;
};

export const head = (arr) => {
  return Array.isArray(arr) ? arr[0] : undefined;
};

export const nonDestructiveSort = (arr, compareFunc) => {
  if (!Array.isArray(arr)) {
    return arr;
  }

  const sortedArr = [...arr].sort(compareFunc);

  if (sortedArr.every((elem, index) => arr[index] === elem)) {
    // if 2 array is the same, we return the old one
    return arr;
  }

  return sortedArr;
};

/**
 * shuffle item of array
 * @param array
 * @returns {*[]}
 */
export const shuffleArray = (array = []) => {
  let tmp = clone(array);
  if (!tmp || !Array.isArray(tmp)) {
    return tmp;
  }

  for (let i = tmp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
  }
  return tmp;
};
