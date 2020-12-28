import React from 'react';
import PropTypes from 'prop-types';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';

import lodashGet from 'lodash.get';
import { enrolmentPlanStatuses } from 'configs/constants/enrolmentPlan';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import { fetchEnrolmentPlanData } from 'components/admin/enrolment-plan/common';
import NotApprovedCourses from './NotApprovedCourses';
import NotArrangedMembers from 'components/admin/enrolment-plan/common/members/NotArrangedMembers';
import PendingMembers from './PendingMembers';
import AutoCreateCoursesAndAddUsers from '../auto-create-courses-and-add-users/Button';
import { enrolmentPlanNotReadyToExecuteReasons } from './constants';

class Form extends React.PureComponent {
  render() {
    const { node, enrolmentPlanReadyForExecuteData } = this.props;

    const isEnrolmentPlanReadyForExecute = lodashGet(
      enrolmentPlanReadyForExecuteData,
      'ready_to_execute',
    );
    const notReadyToExecuteReasons =
      lodashGet(enrolmentPlanReadyForExecuteData, 'not_ready_reasons') || [];

    if (!isEnrolmentPlanReadyForExecute) {
      return (
        <React.Fragment>
          <div>
            {t1('this_enrolment_plan_is_not_ready_to_execute_because')}:
          </div>

          {notReadyToExecuteReasons.includes(
            enrolmentPlanNotReadyToExecuteReasons.SOME_COURSES_NOT_APPROVED,
          ) ? (
            <NotApprovedCourses node={node} />
          ) : null}

          {notReadyToExecuteReasons.includes(
            enrolmentPlanNotReadyToExecuteReasons.NOT_ALL_MEMBERS_ASSIGNED_TO_ALL_CREDIT_SYLLABUSES,
          ) ? (
            <NotArrangedMembers node={node} />
          ) : null}

          {notReadyToExecuteReasons.includes(
            enrolmentPlanNotReadyToExecuteReasons.SOME_MEMBERS_NOT_CONFIRMED,
          ) ? (
            <PendingMembers node={node} />
          ) : null}

          <AutoCreateCoursesAndAddUsers node={node} />
        </React.Fragment>
      );
    }

    return (
      <div>
        <div>
          {t1('do_you_want_to_mark_this_enrolment_plan_as_ready_to_execute?')}
        </div>
        <NodeNew
          closeModal
          formid="mark_enrolment_plan_as_ready_to_execute"
          schema={{}}
          mode="edit"
          ntype="enrolment_plan"
          step="mark_as_ready_to_execute"
          node={node}
          submitLabels={{
            edit: t1('submit'),
          }}
          requestSuccessful={() => fetchEnrolmentPlanData(node)}
          params={{
            status: enrolmentPlanStatuses.READY_TO_EXECUTE,
          }}
        />
      </div>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
};

Form.defaultProps = {
  className: '',
};

export default fetchData((props) => ({
  baseUrl: epApiUrls.is_enrolment_plan_ready_for_execute,
  fetchCondition: lodashGet(props, 'node.iid'),
  params: {
    enrolment_plan_iid: lodashGet(props, 'node.iid'),
  },
  method: 'get',
  propKey: 'enrolmentPlanReadyForExecuteData',
  keyState: 'check_if_enrolment_plan_is_ready_for_execute',
  shouldRenderLoading: true,
}))(Form);
