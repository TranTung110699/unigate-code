import React, { Component } from 'react';
import withShowManageExamShiftWrapperFormHOC from './withShowManageExamShiftWrapperFormHOC';

class ShowManageExamShiftButton extends Component {
  showManageExamShiftDialog = () => {
    const { showManageExamShiftDialogFromHOC } = this.props;
    if (showManageExamShiftDialogFromHOC) {
      showManageExamShiftDialogFromHOC();
    }
  };

  render() {
    const { examShift } = this.props;

    return (
      <div
        onClick={() => {
          this.showManageExamShiftDialog();
        }}
        style={{ cursor: 'pointer' }}
      >
        {examShift && examShift.name}
      </div>
    );
  }
}

export default withShowManageExamShiftWrapperFormHOC(ShowManageExamShiftButton);
