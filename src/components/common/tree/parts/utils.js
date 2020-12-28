import { remove } from 'common/utils/Array';

const cleanAllSelectedNodesInTreeData = (selectedNodes, treeData) => {
  let returnedSelectedNodes = selectedNodes;
  if (
    !Array.isArray(returnedSelectedNodes) ||
    returnedSelectedNodes.length === 0
  ) {
    return [];
  }
  if (!Array.isArray(treeData)) {
    return returnedSelectedNodes;
  }
  treeData.forEach((node) => {
    if (node) {
      returnedSelectedNodes = remove(returnedSelectedNodes, node.value);
      if (Array.isArray(node.children) && node.children.length > 0) {
        returnedSelectedNodes = cleanAllSelectedNodesInTreeData(
          returnedSelectedNodes,
          node.children,
        );
      }
    }
  });
  return returnedSelectedNodes;
};

export const filterSelectedNodesWhenCheckParentEqualCheckAllChildren = (
  selectedNodes,
  treeData,
  setValueIsChildrenOnly,
) => {
  let returnedSelectedNodes = selectedNodes;
  if (!Array.isArray(treeData) || setValueIsChildrenOnly) {
    return returnedSelectedNodes;
  }
  treeData.forEach((node) => {
    if (node && Array.isArray(node.children)) {
      const isNodeSelected =
        returnedSelectedNodes && returnedSelectedNodes.includes(node.value);
      if (isNodeSelected) {
        returnedSelectedNodes = cleanAllSelectedNodesInTreeData(
          returnedSelectedNodes,
          node.children,
        );
      } else {
        returnedSelectedNodes = filterSelectedNodesWhenCheckParentEqualCheckAllChildren(
          returnedSelectedNodes,
          node.children,
          setValueIsChildrenOnly,
        );
        const childrenValues = node.children.map((child) => child.value);
        if (
          childrenValues.length > 0 &&
          childrenValues.every((value) => returnedSelectedNodes.includes(value))
        ) {
          returnedSelectedNodes = returnedSelectedNodes
            .filter((value) => !childrenValues.includes(value))
            .concat([node.value]);
        }
      }
    }
  });
  return returnedSelectedNodes;
};

export const getNodesThatCanBeSelected = (
  treeData = [],
  checkParentEqualCheckAllChildren = false,
  selectedNodes = [],
  setValueIsChildrenOnly,
  doNotSelectChildrenWhenParentSelected,
) => {
  let result = selectedNodes;

  treeData.forEach((node) => {
    const newValue = node.value || node.key;
    if (
      !result.includes(newValue) &&
      !(
        setValueIsChildrenOnly &&
        Array.isArray(node.children) &&
        node.children.length
      )
    ) {
      result.push(node.value || node.key);
    }
    if (
      node.children &&
      Array.isArray(node.children) &&
      !doNotSelectChildrenWhenParentSelected &&
      !(checkParentEqualCheckAllChildren && !setValueIsChildrenOnly)
    ) {
      result = getNodesThatCanBeSelected(
        node.children,
        checkParentEqualCheckAllChildren,
        result,
        setValueIsChildrenOnly,
        doNotSelectChildrenWhenParentSelected,
      );
    }
    if (checkParentEqualCheckAllChildren) {
      result = filterSelectedNodesWhenCheckParentEqualCheckAllChildren(
        result,
        treeData,
        setValueIsChildrenOnly,
      );
    }
  });
  return result;
};

/**
 * from list of values and a treeData filter out only the values that treeData contains
 *
 * E.g:
 *  values = [1, 2, 3];
 *  treeData = [
 *    { value: 3 },
 *    { value: 4,
 *      children: [
 *        { value: 2 },
 *        { value: 5 },
 *      ]
 *    }
 *  ];
 *  => return [2, 3]
 *
 * */
export const filterValuesToKeepWhatTreeDataContains = (values, treeData) => {
  if (
    !Array.isArray(treeData) ||
    treeData.length === 0 ||
    !Array.isArray(values) ||
    values.length === 0
  ) {
    return [];
  }

  return treeData.reduce((result, node) => {
    let fullResult = result;

    if (!node) {
      return fullResult;
    }

    if (values.includes(node.value)) {
      fullResult = fullResult.concat([node.value]);
    }

    if (Array.isArray(node.children)) {
      fullResult = fullResult.concat(
        filterValuesToKeepWhatTreeDataContains(values, node.children),
      );
    }

    return fullResult;
  }, []);
};
