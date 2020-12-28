import React from 'react';
import {
  enrolmentPlanUserAddedMethod,
  enrolmentPlanUserAddedMethodToText,
  fromUserRtToText,
  enrolmentPlanRejectReasonTypes,
  fromEnrolmentPlanRejectReasonTypeToText,
} from 'configs/constants/enrolmentPlan';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import allUserRts from 'configs/constants/group-members-relationship-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import DetailOnDialog from 'components/common/detail-on-dialog';

/**
 * @param relations
 * the object in category_user collection after being expanded by Category_Service_UserRelationExpander
 *
 * @returns {*}
 * @constructor
 */
export const DisplayHowMemberWasAddedToEnrolmentPlanGivenRelationsWithExpandedData = ({
  relations,
}) => {
  let relationWithInfoAboutHowMemberWasAdded = null;
  let latestTs = 0;
  (lodashGet(relations, '__expand.r') || []).forEach((r) => {
    let ts = lodashGet(r, 'ts');
    const method = lodashGet(r, 'x.method');
    if (typeof method !== 'undefined' && ts > latestTs) {
      latestTs = ts;
      relationWithInfoAboutHowMemberWasAdded = r;
    }
  });

  const method = lodashGet(relationWithInfoAboutHowMemberWasAdded, 'x.method');

  switch (method) {
    case enrolmentPlanUserAddedMethod.REQUEST:
      return (
        <div>
          {t1('request_to_learn')}:
          <ul style={{ margin: 0 }}>
            {lodashGet(
              relationWithInfoAboutHowMemberWasAdded,
              'x.requests',
              [],
            ).map((req) => (
              <li>
                {lodashGet(
                  req,
                  '__expand.request_data.register_credit_syllabus.credit_syllabus.name',
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return enrolmentPlanUserAddedMethodToText(method);
  }
};

export const getRelationRByCondition = (relations, condition) =>
  (lodashGet(relations, 'r') || []).find((r) =>
    typeof condition === 'function' ? condition(r) : false,
  );

export const getActiveRelationR = (relations) =>
  getRelationRByCondition(
    relations,
    (r) =>
      lodashGet(r, 'stt') &&
      Object.values(allUserRts).includes(lodashGet(r, 'rt')),
  );

/**
 * @param relations
 * the category_user object after being expanded by Category_Service_UserRelationExpander
 *
 * @returns {*}
 * @constructor
 */
export const EnrolmentPlanMemberStatusGivenRelationsWithExpandedData = ({
  relations,
}) => {
  const fromUserRtToStyle = (rt) =>
    rt === allUserRts.USER_RT_CURRENT
      ? { color: 'green' }
      : rt === allUserRts.USER_RT_REJECTED
      ? { color: 'red' }
      : { color: 'grey' };

  const r = getActiveRelationR(relations);
  const rt = lodashGet(r, 'rt');

  return (
    <div>
      <div
        style={fromUserRtToStyle(rt)}
        title={
          lodashGet(r, 'u.name')
            ? t1('by_%s_at_%s', [
                lodashGet(r, 'u.name'),
                timestampToDateTimeString(lodashGet(r, 'ts')),
              ])
            : timestampToDateTimeString(lodashGet(r, 'ts'))
        }
      >
        {fromUserRtToText(rt)}
      </div>
    </div>
  );
};

/**
 * @param relations
 * the category_user object after being expanded by Category_Service_UserRelationExpander
 *
 * @returns {*}
 * @constructor
 */
export const EnrolmentPlanMemberRejectionReasonGivenRelationsWithExpandedData = ({
  relations,
}) => {
  const r = getRelationRByCondition(
    relations,
    (r) => lodashGet(r, 'rt') === allUserRts.USER_RT_REJECTED,
  );

  const rejectReasonType = lodashGet(r, 'x.reject_reason_type');
  const rejectReasonDetail = lodashGet(r, 'x.reject_reason_detail');

  let textPreview = fromEnrolmentPlanRejectReasonTypeToText(rejectReasonType);
  if (rejectReasonType === enrolmentPlanRejectReasonTypes.OTHER) {
    textPreview = rejectReasonDetail;
  }

  return (
    <DetailOnDialog textPreview={textPreview} textFull={rejectReasonDetail} />
  );
};
