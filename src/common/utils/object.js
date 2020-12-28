import isEqual from 'lodash.isequal';
import lodashGet from 'lodash.get';
import isEqualWith from 'lodash.isequalwith';

export const isShallowEqual = (
  obj,
  anotherObj,
  keysToIgnore = [],
  keysToCompare,
) => {
  if (keysToCompare !== undefined && !Array.isArray(keysToCompare)) {
    throw Error(
      `isShallowEqual only work with keysToCompare of type array, you give ${keysToCompare}`,
    );
  }

  if (!Array.isArray(keysToIgnore)) {
    throw Error(
      `isShallowEqual only work with keysToIgnore of type array, you give ${keysToIgnore}`,
    );
  }

  if (
    !['object', 'undefined'].includes(typeof obj) ||
    !['object', 'undefined'].includes(typeof anotherObj)
  ) {
    throw Error(
      `isShallowEqual only work with object or array, you give 2 params ${obj} and ${anotherObj}`,
    );
  }

  if (obj === anotherObj) {
    return true;
  }

  if (
    obj === null ||
    obj === undefined ||
    anotherObj === null ||
    anotherObj === undefined
  ) {
    return false;
  }

  if (Array.isArray(obj) !== Array.isArray(anotherObj)) {
    return false;
  }

  const filterKey = (key) =>
    !keysToIgnore.includes(key) &&
    (keysToCompare === undefined || keysToCompare.includes(key));

  const objKeys = Object.keys(obj).filter(filterKey);

  const anotherObjKeys = Object.keys(anotherObj).filter(filterKey);

  if (objKeys.length !== anotherObjKeys.length) {
    return false;
  }

  for (let index = 0; index < objKeys.length; index += 1) {
    const key = objKeys[index];
    if (obj[key] !== anotherObj[key]) {
      return false;
    }
  }
  return true;
};

export const filterObjectKeys = (object, keys, keepKeys = true) => {
  if (typeof object !== 'object' || Array.isArray(object)) {
    return object;
  }

  if (!Array.isArray(keys)) {
    throw Error(
      `filterObjectKeys only work with param keys of type array, you give ${keys}`,
    );
  }

  const filteredObject = Object.assign({}, object);

  const keysAsStrings = keys.map(String);
  Object.keys(filteredObject).forEach((key) => {
    const isKeyInList = keysAsStrings.includes(String(key));
    if (keepKeys) {
      if (!isKeyInList) {
        delete filteredObject[key];
      }
    } else if (isKeyInList) {
      delete filteredObject[key];
    }
  });

  return filteredObject;
};

export const deepAssign = (
  obj,
  paths,
  valueToSet,
  shouldCreateNewKey = true,
) => {
  if (!Array.isArray(paths)) {
    throw Error(
      `deepAssign only work with paths of type array (for now), you give paths = ${paths}`,
    );
  }

  let objToAssign = obj;

  if (typeof objToAssign === 'undefined' && shouldCreateNewKey) {
    objToAssign = {};
  }

  if (typeof objToAssign !== 'object' || objToAssign === null) {
    return objToAssign;
  }

  const baseValue = Array.isArray(objToAssign) ? [] : {};
  if (paths.length === 0) {
    return Object.assign(baseValue, objToAssign, valueToSet);
  }

  const [key, ...rest] = paths;
  return Object.assign(baseValue, objToAssign, {
    [key]: deepAssign(objToAssign[key], rest, valueToSet),
  });
};

/*
  callBack = (node, nodeParent, currentLevel, nodeAncestors) => someValue
 */
export const fromTreeToArray = (
  node,
  callBack = (item) => item,
  depth = -1,
  getChildren = (item) => item && item.children,
  nodeParent = null,
  currentLevel = 0,
  nodeAncestors = [],
) => {
  if (typeof callBack !== 'function') {
    throw new Error('callBack is not a function in fromTreeToArray');
  }

  const children = getChildren(node);

  const childrenReturnedValues =
    depth !== 0 && Array.isArray(children)
      ? children.reduce(
          (result, child) =>
            result.concat(
              fromTreeToArray(
                child,
                callBack,
                depth - 1,
                getChildren,
                node,
                currentLevel + 1,
                nodeAncestors.concat([node]),
              ),
            ),
          [],
        )
      : [];

  return [callBack(node, nodeParent, currentLevel, nodeAncestors)].concat(
    childrenReturnedValues,
  );
};

/*
  callBack = (
    node, 
    { 
      parent,
      level,
      key,
      traversalIndex,
      ancestors,
    }
  ) => someValue
 */
const mapTreeWithRecursiveData = (
  node,
  callBack,
  getChildrenKeys,
  { parent = null, level = 0, key, traversalIndex = 0, ancestors = [] },
) => {
  let returnedNode = callBack(node, {
    parent,
    level,
    key,
    traversalIndex,
    ancestors,
  });

  if (!returnedNode) {
    return [returnedNode, { traversalIndex }];
  }

  const childrenKeys = getChildrenKeys(returnedNode);
  if (!Array.isArray(childrenKeys) && childrenKeys.length === 0) {
    return [returnedNode, { traversalIndex }];
  }

  childrenKeys.forEach((childrenKey) => {
    const children = returnedNode[childrenKey];
    if (Array.isArray(children)) {
      returnedNode = {
        ...returnedNode,
        [childrenKey]: children.map((child) => {
          const [
            childNode,
            { traversalIndex: childTraversalIndex },
          ] = mapTreeWithRecursiveData(child, callBack, getChildrenKeys, {
            parent: node,
            level: level + 1,
            key: childrenKey,
            traversalIndex: traversalIndex + 1,
            ancestors: [node].concat(ancestors),
          });

          traversalIndex = childTraversalIndex;

          return childNode;
        }),
      };
    }
  });

  return [returnedNode, { traversalIndex }];
};

/*
  callBack = (
    node,
    {
      parent,
      level,
      key,
      traversalIndex,
      ancestors,
    }
  ) => someValue
 */
export const mapTree = (
  node,
  callBack,
  getChildrenKeys = (node) => ['children'],
) => {
  if (typeof callBack !== 'function') {
    throw new Error('callBack is not a function in mapTree');
  }

  const [returnedNode] = mapTreeWithRecursiveData(
    node,
    callBack,
    getChildrenKeys,
    {},
  );

  return returnedNode;
};

/*
  callBack = (node, { parent, level }) => boolean
 */
const filterTreeWithRecursiveData = (
  node,
  callBack,
  getChildrenKeys,
  { parent = null, level = 0 },
) => {
  if (!node || !callBack(node, { parent, level })) {
    return [undefined];
  }

  const childrenKeys = getChildrenKeys(node);
  if (!Array.isArray(childrenKeys) && childrenKeys.length === 0) {
    return [undefined];
  }

  let returnedNode = node;
  childrenKeys.forEach((childrenKey) => {
    const children = returnedNode[childrenKey];
    if (Array.isArray(children)) {
      returnedNode = {
        ...returnedNode,
        [childrenKey]: children
          .map((child) => {
            const [childNode] = filterTreeWithRecursiveData(
              child,
              callBack,
              getChildrenKeys,
              {
                parent: node,
                level: level + 1,
              },
            );

            return childNode;
          })
          .filter((child) => typeof child !== 'undefined'),
      };
    }
  });

  return [returnedNode];
};

/*
  callBack = (node, { parent, level }) => boolean
 */
export const filterTree = (
  node,
  callBack,
  getChildrenKeys = (node) => ['children'],
) => {
  if (typeof callBack !== 'function') {
    throw new Error('callBack is not a function in filterTree');
  }

  const [returnedNode] = filterTreeWithRecursiveData(
    node,
    callBack,
    getChildrenKeys,
    {},
  );

  return returnedNode;
};

/*
 * return tree node where callback return true
 * similar to Array.find but for tree
 *
 * callBack = (node, { parent, level }) => boolean
 */
const findInTreeWithRecursiveData = (
  node,
  callBack,
  getChildrenKeys,
  { parent = null, level = 0 },
) => {
  if (callBack(node, { parent, level })) {
    return node;
  }

  const childrenKeys = getChildrenKeys(node);
  if (!Array.isArray(childrenKeys) || childrenKeys.length === 0) {
    return undefined;
  }

  for (let i = 0; i < childrenKeys.length; i += 1) {
    const childrenKey = childrenKeys[i];
    const children = node[childrenKey];

    if (Array.isArray(children)) {
      const foundResultInChildren = children.find((child) => {
        return findInTreeWithRecursiveData(child, callBack, getChildrenKeys, {
          parent: node,
          level: level + 1,
        });
      });
      if (foundResultInChildren !== undefined) {
        return foundResultInChildren;
      }
    }
  }

  return undefined;
};

/**
 * return tree node where callback return true
 * similar to Array.find but for tree
 *
 * callBack = (node, { parent, level }) => boolean
 **/
export const findInTree = (
  node,
  callBack,
  getChildrenKeys = (node) => ['children'],
) => {
  if (typeof callBack !== 'function') {
    throw new Error('callBack is not a function in findInTree');
  }

  return findInTreeWithRecursiveData(node, callBack, getChildrenKeys, {});
};

/*
callback = (value, key, originalObject) => someValuae
 */
export const mapObject = (object, callBack) => {
  if (typeof object !== 'object' || object === null || Array.isArray(object)) {
    throw new Error('mapObject only work with object');
  }

  if (typeof callBack !== 'function') {
    throw new Error('mapObject only work with callBack of type function');
  }

  return Object.keys(object).reduce(
    (result, key) =>
      Object.assign(result, {
        [key]: callBack(object[key], key, object),
      }),
    {},
  );
};

export const renameObjectKey = (object, oldKey, newKey) => {
  if ([null, undefined].includes(object)) {
    return object;
  }

  if (typeof object !== 'object') {
    throw Error(`renameObjectKey only work with object, you give ${object}`);
  }

  const { [oldKey]: keyValue, ...rest } = object;
  return {
    ...rest,
    [newKey]: keyValue,
  };
};

export const renameObjectKeys = (object, renameKeyMap = {}) => {
  if ([null, undefined].includes(renameKeyMap)) {
    return object;
  }

  if (typeof renameKeyMap !== 'object') {
    throw Error(
      `renameObjectKeys only work with renameKeyMap of type object, you give ${renameKeyMap}`,
    );
  }

  return Object.keys(renameKeyMap).reduce(
    (result, key) => renameObjectKey(result, key, renameKeyMap[key]),
    {},
  );
};

/**
 Check if an object has any attribute that is non-empty AND the attribute is in keys
 values = {a: 1, b:2}
 objectHasAnyKeyInArray(values, ['a']) is true,
 objectHasAnyKeyInArray(values, ['c']) is false,
 */
export const objectHasAnyKeyInArray = (values, keys) => {
  let x = false;

  if (!keys.length) return false;

  for (const i in keys) {
    if (values[keys[i]]) {
      if (typeof values[keys[i]] === 'object') {
        if (values[keys[i]].length) x = true;
      } else x = true;
    }
  }

  return x;
};

/**
 *
 * @param oldObj
 * @param newObj
 * @param shallow boolean : use shallow or deep equal
 * @return {{deleted: {}, added: {}, updated: {}}}
 */
export const diffObjects = (oldObj, newObj, shallow) => {
  const oldObjectKeys =
    (oldObj && typeof oldObj === 'object' && Object.keys(oldObj)) || [];
  const newObjectKeys =
    (newObj && typeof newObj === 'object' && Object.keys(newObj)) || [];

  const deletedKeys = oldObjectKeys.filter(
    (key) => !newObjectKeys.includes(key),
  );
  const addedKeys = newObjectKeys.filter((key) => !oldObjectKeys.includes(key));
  const updatedKeys = newObjectKeys.filter(
    (key) =>
      oldObjectKeys.includes(key) &&
      (shallow
        ? oldObj[key] !== newObj[key]
        : !isEqual(oldObj[key], newObj[key])),
  );

  return {
    deleted: deletedKeys.reduce(
      (result, key) => ({
        ...result,
        [key]: oldObj[key],
      }),
      {},
    ),
    added: addedKeys.reduce(
      (result, key) => ({
        ...result,
        [key]: newObj[key],
      }),
      {},
    ),
    updated: updatedKeys.reduce(
      (result, key) => ({
        ...result,
        [key]: newObj[key],
      }),
      {},
    ),
  };
};

/**
 *
 * @param oldObj
 * @param newObj
 * @param shallow boolean : use shallow or deep equal
 * @return {{deleted: {}, added: {}, updated: {}}}
 */
export const recursiveDiffObjects = (oldObj, newObj, shallow) => {
  const { deleted, added, updated } = diffObjects(oldObj, newObj, shallow);

  return {
    deleted,
    added,
    updated: mapObject(updated, (v, key) => {
      return recursiveDiffObjects(oldObj[key], newObj[key], shallow);
    }),
  };
};

const setWithPathAsArray = (object, parts, value) => {
  if (object == null) return object;
  if (parts.length === 0) return value;

  const firstPart = parts[0];
  return Object.assign(Array.isArray(object) ? [] : {}, object, {
    [firstPart]: setWithPathAsArray(
      object[firstPart] || {},
      parts.slice(1),
      value,
    ),
  });
};

/**
 *
 */
export const set = (object, path, value) => {
  if (object == null) return object;

  let parts = [];
  if (Array.isArray(path)) {
    parts = path;
  } else if (typeof path === 'string') {
    parts = path
      .split(/(\.|\[|\]| )/)
      .filter((item) => !['.', '[', ']', ' ', ''].includes(item));
  }

  return setWithPathAsArray(object, parts, value);
};

export const get = lodashGet;

export const isEqualIgnoreFunction = (object, another) =>
  isEqualWith(object, another, (val1, val2) => {
    if (typeof val1 === 'function' || typeof val2 === 'function') {
      return true;
    }
  });
