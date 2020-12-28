import React from 'react';
import PropTypes from 'prop-types';
import SearchEpMembers from './search';
import { connect } from 'react-redux';
import {
  getSmartGroupAttachedToEnrolmentPlan,
  isSmartGroupEnrolmentPlan,
} from 'components/admin/node/utils';
import { isEnrolmentPlanStopped } from 'components/admin/enrolment-plan/common';
import { t1 } from 'translate';
import Warning from 'components/common/Warning';

class EnrolmentPlanMembers extends React.Component {
  columnsNotToShow = [
    'enrolment_plan',
    'academic_categories',
    'from_to_date',
    'location',
    'oe_question',
    'action',
    'job_position',
  ];

  render() {
    const { node } = this.props;
    if (isSmartGroupEnrolmentPlan(node)) {
      const smartGroupAttachedToEnrolmentPlan = getSmartGroupAttachedToEnrolmentPlan(
        node,
      );
      if (!smartGroupAttachedToEnrolmentPlan) {
        return t1('please_attach_smart_group_to_enrolment_plan_first');
      }
    }

    return (
      <React.Fragment>
        {node && node.is_any_insert_relation_job_running ? (
          <Warning
            style={{
              fontSize: 16,
            }}
          >
            {t1(
              'some_users_are_being_added_to_enrolment_plan._if_you_cannot_find_some_members_please_come_back_later.',
            )}
          </Warning>
        ) : null}

        <SearchEpMembers
          columnsNotToShow={this.columnsNotToShow}
          enrolmentPlan={node}
          noActions={isEnrolmentPlanStopped(node)}
        />
      </React.Fragment>
    );
  }
}

EnrolmentPlanMembers.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanMembers.defaultProps = {
  className: '',
};

export default connect()(EnrolmentPlanMembers);
