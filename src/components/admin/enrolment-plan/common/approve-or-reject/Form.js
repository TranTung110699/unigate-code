import React from 'react';
import PropTypes from 'prop-types';
import fetchData from 'components/common/fetchData';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
// import apiUrls from 'api-endpoints';
import lodashGet from 'lodash.get';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import {
  fetchEnrolmentPlanData,
  isEnrolmentPlanApproved,
} from 'components/admin/enrolment-plan/common';

const Form = ({ node, statistics, dialogKey }) => {
  if (!lodashGet(statistics, 'number_of_credits')) {
    return (
      <div>
        {t1('you_cannot_approve_enrolment_plan_with_no_credit_syllabuses')}
      </div>
    );
  }

  return (
    <div>
      {!isEnrolmentPlanApproved(node) ? (
        <div>{t1('do_you_want_to_approve_this_enrolment_plan?')}</div>
      ) : (
        <div>{t1('do_you_want_to_unapprove_this_enrolment_plan?')}</div>
      )}
      <NodeNew
        closeModal={!!dialogKey}
        dialogKey={dialogKey}
        formid="approve_enrolment_plan"
        schema={{}}
        mode="edit"
        ntype="enrolment_plan"
        step="approval"
        node={node}
        submitLabels={{
          edit: t1('submit'),
        }}
        requestSuccessful={() => fetchEnrolmentPlanData(node)}
        params={{
          status: !isEnrolmentPlanApproved(node)
            ? enrolmentPlanStatuses.APPROVED
            : enrolmentPlanStatuses.CREATED,
        }}
      />
    </div>
  );
};

Form.propTypes = {
  className: PropTypes.string,
};

Form.defaultProps = {
  className: '',
};

export default fetchData((props) => ({
  baseUrl: epApiUrls.get_enrolment_plan_statistics,
  fetchCondition: lodashGet(props, 'node.iid'),
  params: {
    enrolment_plan_iid: lodashGet(props, 'node.iid'),
  },
  method: 'get',
  propKey: 'statistics',
  keyState: `enrolment_plan_statistics_${lodashGet(props, 'node.iid')}`,
}))(Form);
