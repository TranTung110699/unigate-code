import { t1 } from 'translate';
import allUserRts from './group-members-relationship-types';
import { remove } from 'common/utils/Array';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';
import { filterObjectKeys } from 'common/utils/object';

export const enrolmentPlanTypes = {
  MANUAL: 'manual',
  SMART_GROUP: 'smart_group',
};

export const enrolmentPlanTypeToText = (key) => {
  const map = {
    [enrolmentPlanTypes.MANUAL]: t1('manual_group'),
    [enrolmentPlanTypes.SMART_GROUP]: t1('smart_group'),
  };
  return map[key];
};

export const enrolmentPlanTypeOptions = () =>
  Object.values(enrolmentPlanTypes).map((value) => ({
    value,
    primaryText: enrolmentPlanTypeToText(value),
    label: enrolmentPlanTypeToText(value),
  }));

export const enrolmentPlanStatuses = {
  CREATED: 'created',
  APPROVED: 'approved',
  READY_TO_EXECUTE: 'ready_to_execute',
  EXECUTED: 'executed',
  STOPPED: 'stopped',
  DELETED: 'deleted',
};

export const activeEnrolmentPlanStatuses = filterObjectKeys(
  enrolmentPlanStatuses,
  ['STOPPED', 'DELETED'],
  false,
);

export const enrolmentPlanStatusToText = (key) => {
  const map = {
    [enrolmentPlanStatuses.CREATED]: t1('created'),
    [enrolmentPlanStatuses.APPROVED]: t1('approved'),
    [enrolmentPlanStatuses.READY_TO_EXECUTE]: t1('ready_to_execute'),
    [enrolmentPlanStatuses.EXECUTED]: t1('running'),
    [enrolmentPlanStatuses.STOPPED]: t1('stopped'),
    [enrolmentPlanStatuses.DELETED]: t1('deleted'),
  };
  if (map[key]) return map[key];
  return '';
};

/**
 * Lấy danh sách trạng thái của EP
 * @param forReportProgressMaster, với báo cáo report progress master sẽ không có EP với trạng thái vừa mới tạo
 * @returns {any[]}
 */
export const enrolmentPlanStatusOptions = (forReportProgressMaster = false) => {
  if (forReportProgressMaster) delete enrolmentPlanStatuses.CREATED;

  return Object.values(enrolmentPlanStatuses).map((value) => ({
    value,
    primaryText: enrolmentPlanStatusToText(value),
    label: enrolmentPlanStatusToText(value),
  }));
};

export const enrolmentPlanUserAddedMethod = {
  MANUAL: 'manual',
  GROUP: 'group',
  REQUEST: 'request',
  SMART_GROUP: 'smart_group',
};

export const enrolmentPlanUserAddedMethodToText = (key) => {
  const map = {
    [enrolmentPlanUserAddedMethod.MANUAL]: t1('manual'),
    [enrolmentPlanUserAddedMethod.GROUP]: t1('group'),
    [enrolmentPlanUserAddedMethod.REQUEST]: t1('request'),
    [enrolmentPlanUserAddedMethod.SMART_GROUP]: t1('smart_group'),
  };
  return map[key] || '';
};

export const enrolmentPlanMemeberRts = [
  allUserRts.USER_RT_CURRENT,
  allUserRts.USER_RT_PENDING,
  allUserRts.USER_RT_REJECTED,
  allUserRts.USER_RT_REMOVED,
];

export const fromUserRtToText = (rt) => {
  const map = {
    [allUserRts.USER_RT_CURRENT]: t1('approved'),
    [allUserRts.USER_RT_PENDING]: t1('planned'),
    [allUserRts.USER_RT_REJECTED]: t1('rejected'),
    [allUserRts.USER_RT_REMOVED]: t1('removed'),
  };
  return map[rt];
};

export const enrolmentPlanMemberRtOptions = (includeRemoved) =>
  convertListOfValuesIntoOptionsForFormElement(
    includeRemoved
      ? enrolmentPlanMemeberRts
      : remove(enrolmentPlanMemeberRts, allUserRts.USER_RT_REMOVED),
    fromUserRtToText,
  );

export const enrolmentPlanRejectReasonTypes = {
  AUTHORISED_ABSENCE: 'authorised_absence',
  UNAUTHORISED_ABSENCE: 'unauthorised_absence',
  OTHER: 'other',
};

export const fromEnrolmentPlanRejectReasonTypeToText = (type) => {
  const map = {
    [enrolmentPlanRejectReasonTypes.AUTHORISED_ABSENCE]: t1(
      'authorised_absence',
    ),
    [enrolmentPlanRejectReasonTypes.UNAUTHORISED_ABSENCE]: t1(
      'unauthorised_absence',
    ),
    [enrolmentPlanRejectReasonTypes.OTHER]: t1('other'),
  };
  return map[type];
};

export const enrolmentPlanRejectReasonTypeOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(enrolmentPlanRejectReasonTypes),
    fromEnrolmentPlanRejectReasonTypeToText,
  );
