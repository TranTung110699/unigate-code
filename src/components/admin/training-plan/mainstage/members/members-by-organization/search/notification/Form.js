/* eslint-disable object-shorthand,react/prop-types */
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import schema from './schema';
import lodashGet from 'lodash.get';
import apiUrls from 'api-endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';
import fetchData from 'components/common/fetchData';
import { t1 } from 'translate';
import NotArrangedMembers from './NotArrangedMembers';

class Form extends Component {
  render() {
    const {
      searchFormId,
      mode,
      organization,
      step,
      node,
      isAnyMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses,
    } = this.props;

    if (isAnyMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses) {
      return (
        <div>
          <div>
            {t1(
              'you_cannot_notify_user_to_approve_members_of_training_plan_because_there_are_some_members_who_is_not_assigned_to_courses',
            )}
          </div>
          <NotArrangedMembers node={node} noMessage />
        </div>
      );
    }

    const formid =
      this.props.formid ||
      `training_plan_notification_for_approve_members_by_organization _${lodashGet(
        node,
        'iid',
      )}_${lodashGet(organization, 'iid')}`;

    return (
      <NodeNew
        schema={schema}
        formid={formid}
        mode={mode}
        step={step}
        hiddenFields={{
          training_plan_iid: lodashGet(node, 'iid'),
          organization_iid: lodashGet(organization, 'iid'),
        }}
        submitLabels={{
          new: t1('send'),
        }}
        closeModal
        searchFormId={searchFormId}
        alternativeApi={
          tpApiUrls.training_plan_notification_for_approve_members_by_organization
        }
      />
    );
  }
}

export default fetchData((props) => ({
  baseUrl:
    tpApiUrls.is_any_training_plan_member_not_assigned_to_all_enrolment_plan_credit_syllabuses,
  fetchCondition: lodashGet(props, 'node.iid'),
  params: {
    training_plan_iid: lodashGet(props, 'node.iid'),
  },
  method: 'get',
  propKey: 'isAnyMemberNotAssignedToAllEnrolmentPlanCreditSyllabuses',
  keyState: `is_any_training_plan_member_not_assigned_to_all_enrolment_plan_credit_syllabuses_${lodashGet(
    props,
    'node.iid',
  )}`,
}))(Form);
