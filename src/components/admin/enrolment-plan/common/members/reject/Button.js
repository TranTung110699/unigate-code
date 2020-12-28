import React, { Component } from 'react';
import BatchButton from '../common-button/BatchButton';
import IconButton from 'material-ui/IconButton';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

class EnrolmentPlanMemberRejectButton extends Component {
  render() {
    const { node, user, requestSuccessful, searchFormId } = this.props;
    return (
      <BatchButton
        renderPreview={({ showFull }) => (
          <IconButton onClick={showFull} iconClassName={'mi mi-delete'} />
        )}
        items={[
          {
            user_iid: user.iid,
            enrolment_plan_iid: lodashGet(node, 'iid'),
          },
        ]}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
        label={t1('reject_member')}
        dialogTitle={t1('reject_member')}
        formid={'reject_enrolment_plan_member'}
        message={t1('do_you_want_to_reject_this_member?')}
        mode={'reject'}
      />
    );
  }
}

export default EnrolmentPlanMemberRejectButton;
