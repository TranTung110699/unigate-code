import { createSelectorWithExtraParams } from 'utils/selector';
import { getNode } from 'components/admin/node/utils';
import { ntype } from 'configs/constants';
import { templateTypes as templateTypesSco } from 'components/admin/sco/schema/tpl-types';
import get from 'lodash.get';
import { createSelector } from 'reselect';

export const statuses = {
  INIT: 'INIT',
  DOING: 'DOING',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
  RETAKE: 'RETAKE',
};

export const errorStatuses = {
  DO_TAKE_EXAM_PER_TWO_DEVICE: 'DO_TAKE_EXAM_PER_TWO_DEVICE',
};

export const learnInfoSelector = (state) => state.learn && state.learn.info;

export const getItemLearnInfo = (info, itemIid) => info && info[itemIid];

export const getLearnItemInfoSelector = createSelectorWithExtraParams(
  learnInfoSelector,
  1,
  (info) => (itemIid) => getItemLearnInfo(info, itemIid),
);

export const getLearnCourseIidSelector = createSelector(
  (state) => get(state, 'learn.courseIid'),
  (courseIid) => courseIid,
);

export const getLearnItemQuestionInfoSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  2,
  (getLearnItemInfo) => (itemIid, questionUniqueId) => {
    const info = getLearnItemInfo(itemIid);
    return info && info.questions && info.questions[questionUniqueId];
  },
);

export const isStandardSco = (node) =>
  node && node.ntype === 'sco' && node.tpl_type === 'standard';

export const isExam = (node) =>
  node &&
  ((node.ntype === 'sco' && node.tpl_type === 'exam') ||
    (node.ntype === 'exercise' && node.type === 'exam') ||
    (node.ntype === 'syllabus' && node.is_exam));

export const isExamTemplate = (node) =>
  ['question-bank', 'exam-template'].includes(node && node.ntype);

export const isExamShift = (node) =>
  node && node.ntype === 'course' && node.exam_type === 'EXAM_SHIFT';
export const isSkill = (node) => node && node.ntype === 'skill';

export const isOfflineExam = (node) =>
  node && node.ntype === 'course' && node.exam_type === 'OFFLINE_EXAM';
/**
 *Kiểm tra course có phải là course thi lại
 * @param node
 * @returns {*|boolean}
 */
export const isResitOfflineExam = (node) =>
  node &&
  node.ntype === 'course' &&
  node.exam_type === 'OFFLINE_EXAM' &&
  node.exam_sub_type == 'FINAL_RESIT';

export const isGroupAssignment = (node) =>
  node &&
  node.ntype === ntype.SCO &&
  node.tpl_type === templateTypesSco.TYPE_GROUP_ASSIGNMENT;

export const isAcademicScoreRubric = (node) =>
  node &&
  node.ntype === ntype.SKILL &&
  node.type === 'rubric' &&
  node.sub_type === 'academic_score';

export const isAttendanceScoreRubric = (node) =>
  node &&
  node.ntype === ntype.SKILL &&
  node.type === 'rubric' &&
  node.sub_type === 'attendance';

/**
 * result will be {
 *   isAccessible: true, false or null (no info)
 *   notLearntIids: array of iid that user need to learn to access this item => only meaningful if isAccessible === false
 *   navIdToRedirectTo: navId of the most recent item that user can learn
 */
export const getLearnItemAccessibilityInfo = (
  nodes,
  syllabusIid,
  trackingLine,
  isPreview,
  trackerProgress,
) => (navId) => {
  const syllabus = getNode(syllabusIid, null, nodes);

  if (isPreview) {
    return {
      isAccessible: true,
    };
  }

  if (!syllabus || !Array.isArray(trackingLine) || !navId) {
    return {
      isAccessible: null,
    };
  }

  const items = navId.split('-');
  const positionInTrackingLine = items[items.length - 1];
  const iid = items[items.length - 2];
  const pIid = items[items.length - 3];

  const nodeToCheckAccessibility = getNode(iid, null, nodes);
  const sequential =
    nodeToCheckAccessibility && nodeToCheckAccessibility.sequential;

  if (positionInTrackingLine >= trackingLine.length) {
    return {
      isAccessible: null,
    };
  }

  let isAccessible = true;
  let notLearntIids = [];
  let navIdToRedirectTo = null;
  let shouldFindItemToRedirectTo = false;
  let haveCandidateForItemToRedirectTo = false;
  let nodeFromThisWillAffectAccessibility = false;
  let currentScoIid = null;

  // start from 1 because the first element in trackingLine is syllabus
  for (let i = 1; i < positionInTrackingLine; i += 1) {
    const nodeIid = trackingLine[i];
    const node = getNode(nodeIid, null, nodes);
    if (
      node &&
      (!sequential ||
        !sequential.length ||
        (sequential &&
          String(node.iid) !== String(pIid) &&
          (sequential.includes(String(node.iid)) ||
            sequential.includes(String(node.pid)))))
    ) {
      const nodeNavId =
        node.ntype === ntype.SCO
          ? `${syllabusIid}-${nodeIid}-${i}`
          : `${currentScoIid}-${nodeIid}-${i}`;

      if (node.ntype === ntype.SCO) {
        currentScoIid = nodeIid;
        if (String(nodeIid) === String(pIid)) {
          nodeFromThisWillAffectAccessibility = true;
        } else if (node.weighted) {
          // if SCO has no weight, do not have to care about its children (next nodes in trackingLine)
          nodeFromThisWillAffectAccessibility = true;
        } else {
          nodeFromThisWillAffectAccessibility = false;
        }
      }

      let canBeItemToRedirectTo = false;
      let canAffectAccessibility = false;
      let shouldFinishChecking = false;
      if (sequential && sequential.length) {
        canAffectAccessibility = String(node.iid) !== String(pIid);
        canBeItemToRedirectTo = node.ntype !== ntype.SCO || isExam(node);
      } else {
        switch (syllabus.sequential_learning_type) {
          case 'sco': {
            canAffectAccessibility =
              nodeFromThisWillAffectAccessibility &&
              node.ntype === ntype.SCO &&
              String(node.iid) !== String(pIid);
            canBeItemToRedirectTo = node.ntype !== ntype.SCO || isExam(node);
            break;
          }
          case 'item': {
            canAffectAccessibility =
              nodeFromThisWillAffectAccessibility &&
              String(node.iid) !== String(pIid);
            canBeItemToRedirectTo = node.ntype !== ntype.SCO || isExam(node);
            break;
          }
          default: {
            shouldFinishChecking = true;
            break;
          }
        }
      }

      if (shouldFinishChecking) {
        break;
      }

      if (node.weighted || (sequential && sequential.length)) {
        const progress = trackerProgress[nodeIid];

        if (!progress || !progress.pf) {
          if (canAffectAccessibility) {
            isAccessible = false;
            notLearntIids = notLearntIids.concat([
              {
                iid: nodeIid,
                pid:
                  String(nodeIid) === String(currentScoIid)
                    ? syllabusIid
                    : currentScoIid,
              },
            ]);
            if (!navIdToRedirectTo) {
              shouldFindItemToRedirectTo = true;
            }
          }
          if (shouldFindItemToRedirectTo && canBeItemToRedirectTo) {
            navIdToRedirectTo = nodeNavId;
            shouldFindItemToRedirectTo = false;
          }
        }
      }

      if (
        shouldFindItemToRedirectTo &&
        !haveCandidateForItemToRedirectTo &&
        canBeItemToRedirectTo
      ) {
        // act as a candidate in case there are no node with weighted > 0 and progress < threshold
        navIdToRedirectTo = nodeNavId;
        haveCandidateForItemToRedirectTo = true;
      }
    }
  }

  return {
    isAccessible,
    notLearntIids,
    navIdToRedirectTo,
  };
};

export const getLearningItemUserIidSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  1,
  (getLearnItemInfo) => (itemIid) => {
    const learnItemInfo = getLearnItemInfo(itemIid);
    return learnItemInfo && learnItemInfo.userIid;
  },
);

export const getLearningItemModeSelector = createSelectorWithExtraParams(
  getLearnItemInfoSelector,
  1,
  (getLearnItemInfo) => (itemIid) => {
    const learnItemInfo = getLearnItemInfo(itemIid);
    return learnItemInfo && learnItemInfo.mode;
  },
);

export const isClassGroup = (node) =>
  node && node.ntype === 'path' && node.type === 'classgroup';
