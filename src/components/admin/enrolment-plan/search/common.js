import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import { removeMultiple } from 'common/utils/Array';

export const defaultStatuses = removeMultiple(
  Object.values(enrolmentPlanStatuses),
  [enrolmentPlanStatuses.DELETED, enrolmentPlanStatuses.STOPPED],
);

export const defaultStatusesForReportProgressMaster = removeMultiple(
  Object.values(enrolmentPlanStatuses),
  [
    enrolmentPlanStatuses.CREATED,
    enrolmentPlanStatuses.DELETED,
    enrolmentPlanStatuses.STOPPED,
  ],
);
