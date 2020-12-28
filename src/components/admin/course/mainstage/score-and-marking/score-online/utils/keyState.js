/**
 * Created by vohung on 08/09/2017.
 */

export const getKeyStateNodeReport = (node = {}) =>
  `${node.ntype}-${node.iid}-report`;
export const getKeyStateInfoTheTest = (node = {}) =>
  `${node.ntype}-${node.iid}-info-the-test`;
export const getKeyStateTakeDetail = (userIid, nodeIid, item) =>
  `${userIid}-${nodeIid}-${item.iid}-take-detail`;
export const getKeyStateForRubricProgress = (userIid, nodeIid, item) =>
  `${userIid}-${nodeIid}-${item.iid}-rubric-progress`;
export const getKeyStateInformationReport = (node) =>
  `${node.ntype}-${node.iid}-information`;
