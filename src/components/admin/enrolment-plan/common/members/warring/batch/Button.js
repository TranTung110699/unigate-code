import React, { Component } from 'react';
import BatchButtonCommon from '../Form/BatchButton';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
class BatchButton extends Component {
  render() {
    const { items, totalResult } = this.props;
    const numberOfItemSelected = lodashGet(items, 'length');
    let message = '';
    if (totalResult && numberOfItemSelected) {
      message = t1(
        'do_you_want_to_send_notify_warning_these_%s_result_members_or_%s_selected_members_from_enrolment_plan?',
        [totalResult, numberOfItemSelected],
      );
    } else if (!numberOfItemSelected && totalResult) {
      t1(
        'do_you_want_to_send_notify_warning_these_%s_result_members_from_enrolment_plan?',
        [totalResult],
      );
    } else if (numberOfItemSelected) {
      t1(
        'do_you_want_to_send_notify_warning_these_%s_selected_members_from_enrolment_plan?',
        [numberOfItemSelected],
      );
    }

    return (
      <BatchButtonCommon
        {...this.props}
        label={t1('notify_warning')}
        dialogTitle={t1('send_notify_warning')}
        formid={'notify_warning_enrolment_plan_members_batch'}
        message={message}
        mode={'notify_warning'}
      />
    );
  }
}
export default BatchButton;
