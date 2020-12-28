import { t1 } from 'translate';
import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';

export const timeSheetTypes = {
  TEACHING: 'teaching',
  SPECIALIZED_WORK: 'specialized_work',
};

export const timeSheetStatuses = {
  QUEUED: 'queued',
  APPROVED: 'approved',
  DELETED: 'deleted',
};

export const timeSheetStatusToText = (key) => {
  const map = {
    [timeSheetStatuses.QUEUED]: t1('queued'),
    [timeSheetStatuses.APPROVED]: t1('approved'),
    [timeSheetStatuses.DELETED]: t1('deleted'),
  };
  return map[key];
};

export const timeSheetStatusOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(timeSheetStatuses),
    timeSheetStatusToText,
  );
