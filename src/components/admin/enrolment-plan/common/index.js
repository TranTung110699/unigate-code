import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import lodashGet from 'lodash.get';
import lodashIntersection from 'lodash.intersection';
import nodeActions from 'actions/node/creators';
import Store from 'store';
import allUserRts from 'configs/constants/group-members-relationship-types';
import { checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf } from 'common/conf';

// currently, this logic is scattered in both client and server, in the future,
// we should improve it by using a better workflow mechanism
export const getOrderOfStatusesInEnrolmentPlanWorkflow = () => [
  enrolmentPlanStatuses.CREATED,
  enrolmentPlanStatuses.APPROVED,
  enrolmentPlanStatuses.READY_TO_EXECUTE,
  enrolmentPlanStatuses.EXECUTED,
  enrolmentPlanStatuses.STOPPED,
];

export const getPossibleNextStatusOfAnEnrolmentPlan = (enrolmentPlan) => {
  const orderOfStatusesInEnrolmentPlanWorkflow = getOrderOfStatusesInEnrolmentPlanWorkflow();
  return orderOfStatusesInEnrolmentPlanWorkflow[
    orderOfStatusesInEnrolmentPlanWorkflow.indexOf(
      lodashGet(enrolmentPlan, 'status'),
    ) + 1
  ];
};

export const getStatusesThatEnrolmentPlanHasAlreadyPassed = (enrolmentPlan) => {
  const orderOfStatusesInEnrolmentPlanWorkflow = getOrderOfStatusesInEnrolmentPlanWorkflow();
  return orderOfStatusesInEnrolmentPlanWorkflow.slice(
    0,
    orderOfStatusesInEnrolmentPlanWorkflow.indexOf(
      lodashGet(enrolmentPlan, 'status'),
    ) + 1,
  );
};

export const isEnrolmentPlanInStatusThatCanBeApproved = (enrolmentPlan) =>
  getPossibleNextStatusOfAnEnrolmentPlan(enrolmentPlan) ===
  enrolmentPlanStatuses.APPROVED;

export const isEnrolmentPlanInStatusThatCanBeUnApproved = (enrolmentPlan) =>
  lodashGet(enrolmentPlan, 'status') === enrolmentPlanStatuses.APPROVED;

export const isEnrolmentPlanApproved = (enrolmentPlan) =>
  getStatusesThatEnrolmentPlanHasAlreadyPassed(enrolmentPlan).includes(
    enrolmentPlanStatuses.APPROVED,
  );

export const canEnrolmentPlanInfoBeEdited = (enrolmentPlan) =>
  isEnrolmentPlanApproved(enrolmentPlan);

export const canEnrolmentPlanInfoBeExtended = (enrolmentPlan) => false;
// isEnrolmentPlanApproved(enrolmentPlan);

export const canEnrolmentPlanMembersBeApprovedAndRejected = (
  enrolmentPlan,
  memberRt,
) => [allUserRts.USER_RT_PENDING].includes(memberRt);

export const canEnrolmentPlanMembersBeApproved = (enrolmentPlan, memberRt) =>
  canEnrolmentPlanMembersBeApprovedAndRejected(enrolmentPlan, memberRt) ||
  [allUserRts.USER_RT_REJECTED].includes(memberRt);

export const canEnrolmentPlanMembersBeRejected = (enrolmentPlan, memberRt) =>
  canEnrolmentPlanMembersBeApprovedAndRejected(enrolmentPlan, memberRt) ||
  [allUserRts.USER_RT_CURRENT].includes(memberRt);

export const isEnrolmentPlanMembersApproved = (enrolmentPlan, memberRt) =>
  [allUserRts.USER_RT_CURRENT].includes(memberRt);

export const isEnrolmentPlanMembersRejected = (enrolmentPlan, memberRt) =>
  [allUserRts.USER_RT_REJECTED].includes(memberRt);

export const isEnrolmentPlanInStatusThatCanTurnIntoReadyToExecute = (
  enrolmentPlan,
) =>
  getPossibleNextStatusOfAnEnrolmentPlan(enrolmentPlan) ===
  enrolmentPlanStatuses.READY_TO_EXECUTE;

export const isEnrolmentPlanExecuted = (enrolmentPlan) =>
  lodashGet(enrolmentPlan, 'status') === enrolmentPlanStatuses.EXECUTED;

export const isEnrolmentPlanStopped = (enrolmentPlan) =>
  lodashGet(enrolmentPlan, 'status') === enrolmentPlanStatuses.STOPPED;

export const isEnrolmentPlanSharedFromAncestorOrganizations = (enrolmentPlan) =>
  lodashGet(enrolmentPlan, 'is_shared_from_ancestor_organizations');

// whether EP is created in the same org as user's org
export const isEnrolmentOrganizationMyOrganization = (user, enrolmentPlan) => {
  const intersected = lodashIntersection(
    lodashGet(user, 'user_organizations'),
    lodashGet(enrolmentPlan, 'organizations'),
  );
  return intersected.length > 0;
};

export const canUserEditChildrenOfEnrolmentPlanProgram = (
  enrolmentPlanProgram,
) => true;

export const canUserOnlyAddOnlineOnlyCreditToEnrolmentPlanProgram = (
  enrolmentPlanProgram,
) =>
  Boolean(lodashGet(enrolmentPlanProgram, 'can_only_add_online_only_credit'));

export const checkIfNeedToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses = (
  enrolmentPlan,
) =>
  lodashGet(
    enrolmentPlan,
    'settings.need_to_invite_all_members_to_all_credit_syllabuses',
  );

export const fetchEnrolmentPlanData = (enrolmentPlan) => {
  Store.dispatch(
    nodeActions.fetchNode({
      iid: enrolmentPlan && enrolmentPlan.iid,
      ntype: 'enrolment_plan',
    }),
  );

  Store.dispatch(
    nodeActions.fetchNode({
      iid: enrolmentPlan && enrolmentPlan.group_iid,
      ntype: 'category',
    }),
  );

  Store.dispatch(
    nodeActions.fetchNode({
      iid: enrolmentPlan && enrolmentPlan.program_iid,
      ntype: 'path',
    }),
  );
};

export const getSearchFormId = () => 'enrolment_plan_search';

export const isEnrolmentPlanHasTrainingPlan = (enrolmentPlan) =>
  enrolmentPlan && enrolmentPlan.training_plan_iid;

export const doesEnrolmentPlanMembersNeedApprovalGivenConf = (conf) => {
  return !checkIfAllCreditSyllabusesAreOnlineOnlyGivenConf(conf);
};

export const userRtWhenJoiningEnrolmentPlanGivenConf = (conf) => {
  return doesEnrolmentPlanMembersNeedApprovalGivenConf(conf)
    ? allUserRts.USER_RT_PENDING
    : allUserRts.USER_RT_CURRENT;
};
