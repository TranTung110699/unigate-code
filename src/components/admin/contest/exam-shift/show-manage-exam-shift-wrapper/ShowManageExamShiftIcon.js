import React, { Component } from 'react';
import withShowManageExamShiftWrapperFormHOC from './withShowManageExamShiftWrapperFormHOC';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

class ShowManageExamShiftIcon extends Component {
  showManageExamShiftDialog = () => {
    const { showManageExamShiftDialogFromHOC } = this.props;
    if (showManageExamShiftDialogFromHOC) {
      showManageExamShiftDialogFromHOC();
    }
  };

  render() {
    return (
      <Icon
        onClick={() => {
          this.showManageExamShiftDialog();
        }}
        icon={'edit'}
        className={'action'}
        title={t1('manage_exam_shift')}
      />
    );
  }
}

export default withShowManageExamShiftWrapperFormHOC(ShowManageExamShiftIcon);
