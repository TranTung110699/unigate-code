import React from 'react';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import lodashGet from 'lodash.get';
import schema from './schema';
import NodeNew from 'components/admin/node/new';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import NotArrangedMembers from 'components/admin/enrolment-plan/common/members/NotArrangedMembers';
import Warning from 'components/common/Warning';
import addProps from 'components/common/addProps';
import { checkIfNeedToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses } from 'components/admin/enrolment-plan/common';

const Form = ({
  node,
  executeOnSuccess,
  formidToSubmitOnSuccess,
  formid,
  dialogKey,
  isAnyEnrolmentPlanMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses,
  needToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses,
}) => {
  const enrolmentPlanIid = lodashGet(node, 'iid');

  if (
    needToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses &&
    isAnyEnrolmentPlanMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses
  ) {
    return (
      <Warning>
        <div>
          {t1(
            'you_cannot_notify_user_to_approve_members_of_enrolment_plan_because',
          )}
          :
        </div>
        <NotArrangedMembers node={node} />
      </Warning>
    );
  }

  return (
    <NodeNew
      closeModal
      dialogKey={dialogKey}
      formid={
        formid ||
        `submit_enrolment_plan_members_for_approval_${enrolmentPlanIid}`
      }
      searchFormId={formidToSubmitOnSuccess}
      schema={schema}
      submitLabels={{
        new: t1('notify'),
      }}
      requestSuccessful={executeOnSuccess}
      params={{
        enrolment_plan_iid: enrolmentPlanIid,
      }}
      alternativeApi={epApiUrls.submit_enrolment_plan_members_for_approval}
    />
  );
};

const addPropsNeedToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses = addProps(
  ({ node }) => ({
    needToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses: checkIfNeedToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses(
      node,
    ),
  }),
);

const checkIsAnyEnrolmentPlanMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses = fetchData(
  ({ node, needToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses }) => {
    const enrolmentPlanIid = lodashGet(node, 'iid');
    return {
      baseUrl:
        epApiUrls.is_any_enrolment_plan_member_not_assigned_to_all_enrolment_plan_credit_syllabuses,
      fetchCondition:
        needToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses &&
        enrolmentPlanIid,
      params: {
        enrolment_plan_iid: enrolmentPlanIid,
      },
      method: 'get',
      propKey:
        'isAnyEnrolmentPlanMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses',
      keyState: `is_any_enrolment_plan_member_not_assigned_to_all_enrolment_plan_credit_syllabuses_${enrolmentPlanIid}`,
      shouldRenderLoading: needToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses,
    };
  },
);

export default addPropsNeedToInviteAllEnrolmentPlanMembersToAllCreditSyllabuses(
  checkIsAnyEnrolmentPlanMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses(
    Form,
  ),
);
