import React, { Component } from 'react';
import BatchButtonCommon from '../../common-button/BatchButton';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

class BatchButton extends Component {
  render() {
    const { items } = this.props;
    return (
      <BatchButtonCommon
        {...this.props}
        label={t1('reject_selected_members')}
        dialogTitle={t1('reject_members')}
        formid={'reject_enrolment_plan_members_batch'}
        message={t1(
          'do_you_want_to_reject_these_%s_selected_enrolment_plan_members?',
          lodashGet(items, 'length'),
        )}
        mode={'reject'}
      />
    );
  }
}

export default BatchButton;
