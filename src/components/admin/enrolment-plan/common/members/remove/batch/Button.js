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
        label={t1('remove_selected_members')}
        dialogTitle={t1('remove_members')}
        formid={'remove_enrolment_plan_members_batch'}
        message={t1(
          'do_you_want_to_remove_these_%s_selected_members_from_enrolment_plan?',
          lodashGet(items, 'length'),
        )}
        mode={'remove'}
      />
    );
  }
}

export default BatchButton;
