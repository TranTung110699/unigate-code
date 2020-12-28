import React, { Component } from 'react';
import BatchButton from '../common-button/BatchButton';
import IconButton from 'material-ui/IconButton';

import { t1 } from 'translate';

class EnrolmentPlanMemberApproveButton extends Component {
  render() {
    const { node, user, requestSuccessful, searchFormId } = this.props;
    if (!node) return null;

    return (
      <BatchButton
        renderPreview={({ showFull }) => (
          <IconButton onClick={showFull} iconClassName={'mi mi-done'} />
        )}
        items={[
          {
            user_iid: user.iid,
            enrolment_plan_iid: node.iid,
          },
        ]}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
        label={t1('approve_member')}
        dialogTitle={t1('approve_member')}
        formid={'approve_enrolment_plan_member'}
        message={t1('do_you_want_to_approve_this_member?')}
        mode={'approve'}
      />
    );
  }
}

export default EnrolmentPlanMemberApproveButton;
