/* eslint-disable quotes */
import lodashGet from 'lodash.get';
import questionTypesOptions, {
  types as questionTypes,
} from 'components/admin/question/schema/question-types';
import { createSelectorWithExtraParams } from 'utils/selector';
import {
  approvalFlowDefault,
  categoryTypes,
  ntype as allNtypes,
  programSubTypes,
  schoolTypes,
  UsedFor,
  userGroupSubTypes,
} from 'configs/constants';
import { enrolmentPlanTypes } from 'configs/constants/enrolmentPlan';
import { getCurrentUnixTimestamp } from 'common/utils/Date';

import { t, t1 } from 'translate';
import { ntype as allNtype } from '../../../configs/constants';

const questionTypeInText = (type) => {
  let ret = '';
  questionTypesOptions.forEach((t) => {
    if (t.value === type) {
      ret = t.label;
    }
  });
  return ret;
};

export const tabTitle = (ntype, subType) => {
  if (ntype === 'question') {
    const s = questionTypeInText(subType);
    return `${t1('add_new')} ${t('question')} - ${s}`;
  } else if (ntype === 'path') {
    if (subType === 'program') return `${t1('add_new_program_module')}`;
    else if (subType === 'program-module') {
      return `${t1('add_new_program_module')}`;
    }
  } else if (ntype === 'video') {
    return `${t1(`add_new_${subType}_lecture`)}`;
  }

  if (subType) return `${t1('add_new')} ${t(subType)}`;

  return `${t1('add_new')} ${ntype ? t(ntype) : ''}`;
};

const getNodeChildrenKeys = (node) => {
  if (!node) {
    return [];
  }
  let result = ['children'];
  if (node.ntype === allNtypes.SKILL) {
    result = result.concat(['scaled_children']);
  }
  if (node.ntype === allNtypes.VIDEO) {
    result = result.concat(['questions']);
  }
  return result;
};

export const getNode = (iid, pIid, nodes, depth = 0) => {
  let node = nodes[iid];
  if (!node) {
    return undefined;
  }

  if (typeof pIid !== 'undefined' && pIid !== null) {
    node = {
      ...node,
      pid: pIid,
    };
  }
  const parent = nodes[pIid];

  const nodeIidAsInt = parseInt(node.iid, 10);
  if (String(node.iid) === String(nodeIidAsInt)) {
    node.iid = nodeIidAsInt;
  }

  if (parent && parent.metadata && parent.metadata.length) {
    parent.metadata.forEach((item) => {
      if (item.iid === node.iid) {
        node = {
          ...node,
          ...item,
          name: node.name,
        };
      }
    });
  }

  if (node.metadata && node.metadata.length) {
    node = {
      ...node,
      metadata: node.metadata.map((item) => {
        if (nodes[item.iid]) {
          return Object.assign({}, nodes[item.iid], item, {
            name: nodes[item.iid].name,
            pid: node.iid,
          });
          // item's name always overrides metadata's name
          // other fields like 'duration', 'percent' follow metadata
        }
        return Object.assign({}, item, { pid: node.iid });
      }),
    };
  }

  const childrenKeys = getNodeChildrenKeys(node);
  if (Array.isArray(childrenKeys) && childrenKeys.length > 0) {
    childrenKeys.forEach((key) => {
      const children = node[key];
      if (Array.isArray(children)) {
        node = {
          ...node,
          [key]: children
            .map((child) => getNode(child, node.iid, nodes, depth - 1))
            .filter((child) => typeof child !== 'undefined'),
        };
      }
    });
  }

  return node;
};

// // check if the node's children progress is weighted|averaged
// export const isWeighted = (node) => {
//   let weighted = false;
//   if (node && node.metadata && node.metadata.length) {
//     node.metadata.forEach((item) => {
//       if (item.weighted === 0 || (item.weighted && item.weighted !== '- - -' && item.weighted != '---')) {
//         weighted = true;
//       }
//     });
//   }

//   return weighted;
// };

export const getNodeSelector = createSelectorWithExtraParams(
  (state) => state.tree,
  3,
  (nodes) => (iid, pIid, depth = 0) => getNode(iid, pIid, nodes, depth),
);

export const isNodeFreeze = (node) => node && node.freeze;

export const isNodeDataEnough = (nodes, nodeToCheck, depth = -1) => {
  let fullNodeToCheck = nodeToCheck;
  if (['number', 'string'].includes(typeof fullNodeToCheck) && nodes) {
    fullNodeToCheck = nodes[nodeToCheck];
  }
  if (typeof fullNodeToCheck !== 'object') {
    return false;
  }

  if (fullNodeToCheck.isMetadata) {
    return false;
  }

  if (
    depth !== 0 &&
    fullNodeToCheck.children &&
    fullNodeToCheck.children.length
  ) {
    for (let i = 0; i < fullNodeToCheck.children.length; i += 1) {
      const isChildNodeDataEnough = isNodeDataEnough(
        nodes,
        fullNodeToCheck.children[i],
        depth - 1,
      );
      if (!isChildNodeDataEnough) {
        return false;
      }
    }
  }

  return true;
};

export const getAllNtypesFromNode = (node, depth = -1, nodes) => {
  let localNode = node;
  if (typeof localNode !== 'object' && nodes) {
    localNode = nodes[localNode];
  }
  if (!localNode || typeof localNode !== 'object') {
    return [];
  }
  let ntypesToReturn = [localNode.ntype];
  if (depth !== 0 && localNode.children) {
    localNode.children.forEach((child) => {
      const childNtypesToReturn = getAllNtypesFromNode(child, depth - 1, nodes);
      ntypesToReturn = ntypesToReturn.concat(childNtypesToReturn);
    });
  }
  return ntypesToReturn
    .filter((ntype) => ntype)
    .filter((ntype, index, arr) => arr.indexOf(ntype) === index);
};

export const getAllNtypesFromNodeSelector = createSelectorWithExtraParams(
  getNodeSelector,
  2,
  (getNode) => (iid, depth = -1) => {
    const node = getNode(iid, null, depth);
    return getAllNtypesFromNode(node);
  },
);

export const canHaveRubric = (node) =>
  // TODO: add more thing here
  node &&
  node.ntype === allNtypes.QUESTION &&
  node.type === questionTypes.TYPE_OPEN_ENDED;

export const isRubric = (node) =>
  node &&
  node.ntype === allNtypes.SKILL &&
  ['rubric', 'pmd_rubric'].includes(node.type);

export const canAddLearningItems = (node) =>
  node && node.ntype === allNtypes.SKILL && node.sub_type !== 'attendance';

export const isNodeDescendantsCanBeSkillLearningItems = (node) =>
  node &&
  [
    allNtypes.PATH,
    allNtypes.SYLLABUS,
    allNtypes.COURSE,
    allNtypes.SCO,
    allNtypes.VIDEO,
    allNtypes.EXERCISE,
    allNtypes.VOCABSET,
    allNtypes.VOCAB,
  ].includes(node.ntype);

export const isItemPassedSelector = createSelectorWithExtraParams(
  (state) => state.trackerProgress,
  1,
  (trackerProgress) => (iid) =>
    trackerProgress && trackerProgress[iid] && trackerProgress[iid].pf,
);
export const isOrganizationWithOrgTypes = (node, orgTypes) => {
  if (
    node.type === categoryTypes.CATEGORY_ORGANIZATION &&
    orgTypes &&
    Array.isArray(orgTypes) &&
    orgTypes.map((t) => String(t)).includes(String(node.sub_type))
  ) {
    return true;
  }

  return false;
};

export const isEnrolmentPlanGroup = (node) =>
  node &&
  node.type === categoryTypes.CATEGORY_USER_GROUP &&
  node.sub_type === userGroupSubTypes.ENROLMENT_PLAN_GROUP;

export const getGroupOfEnrolmentPlan = (enrolmentPlan) => ({
  iid: enrolmentPlan && enrolmentPlan.group_iid,
  organizations: enrolmentPlan && enrolmentPlan.organizations,
  type: categoryTypes.CATEGORY_USER_GROUP,
  sub_type: userGroupSubTypes.ENROLMENT_PLAN_GROUP,
});

export const getEnrolmentPlanIidOfEnrolmentPlanProgram = (node) =>
  lodashGet(node, 'enrolment_plan_iid');

export const isCreditSyllabus = (node) =>
  node && node.ntype === allNtypes.SYLLABUS && node.type === 'credit';

export const isProgramModule = (node) =>
  !!(
    node.type &&
    [allNtype.PROGRAM_MODULE, allNtype.SPECIALIZATION_PROGRAM].includes(
      node.type,
    )
  );

export const isProgram = (node) =>
  node && node.ntype === allNtypes.PATH && node.type === allNtypes.PROGRAM;

export const isEnrolmentPlanProgram = (node) =>
  node &&
  node.ntype === allNtypes.PATH &&
  node.type === allNtypes.PROGRAM &&
  node.sub_type === programSubTypes.ENROLMENT_PLAN;

export const isEnrolmentPlanCourse = (node) =>
  Boolean(node && node.ntype === 'course' && node.enrolment_plans);

export const isEnrolmentPlan = (node) =>
  node && node.ntype === allNtypes.ENROLMENT_PLAN;

export const isItemUserOldEnrolmentSessionToInvite = (item, themeConfig) => {
  if (themeConfig && themeConfig.type === schoolTypes.SIS) {
    return false;
  }

  if (isEnrolmentPlanCourse(item)) {
    return false;
  }

  return true;
};

export const isSurvey = (node) => node && node.ntype === allNtypes.SURVEY;

export const isQuestionUsedForSurvey = (
  node,
  usedForSurveyOnly = false,
  checkNType = true,
) =>
  (!checkNType || lodashGet(node, 'ntype') === allNtypes.QUESTION) &&
  (lodashGet(node, 'used_for') || []).includes(UsedFor.SURVEY) &&
  (!usedForSurveyOnly || lodashGet(node, 'used_for').length === 1);

export const getNextStatusInAprovalFlowSelector = (state) => (oldStatus) => {
  const approvalFlow =
    lodashGet(state, 'domainInfo.school.approval_flow') || approvalFlowDefault;

  return lodashGet(approvalFlow, `${oldStatus}.approval`);
};

export const isSmartGroupEnrolmentPlan = (enrolmenPlan) =>
  lodashGet(enrolmenPlan, 'type') === enrolmentPlanTypes.SMART_GROUP;

export const getSmartGroupAttachedToEnrolmentPlan = (enrolmenPlan) =>
  lodashGet(enrolmenPlan, 'smart_group');

export const isCourseEnded = (course) => {
  const endDate = lodashGet(course, 'end_date');
  return endDate && endDate < getCurrentUnixTimestamp();
};
