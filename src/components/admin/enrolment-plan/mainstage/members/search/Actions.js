import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  canEnrolmentPlanMembersBeApproved,
  canEnrolmentPlanMembersBeRejected,
} from 'components/admin/enrolment-plan/common';
import ApproveButton from 'components/admin/enrolment-plan/common/members/approve/Button';
import RejectButton from 'components/admin/enrolment-plan/common/members/reject/Button';

class Actions extends Component {
  render() {
    const { node, searchFormId, item, rt, requestSuccessful } = this.props;

    return (
      <React.Fragment>
        {canEnrolmentPlanMembersBeApproved(node, rt) && (
          <ApproveButton
            searchFormId={searchFormId}
            node={node}
            user={item}
            requestSuccessful={requestSuccessful}
          />
        )}
        {canEnrolmentPlanMembersBeRejected(node, rt) && (
          <RejectButton
            searchFormId={searchFormId}
            node={node}
            user={item}
            requestSuccessful={requestSuccessful}
          />
        )}
      </React.Fragment>
    );
  }
}

Actions.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Actions.defaultProps = {
  items: [],
  searchFormId: '',
};

export default Actions;
