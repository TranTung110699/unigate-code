import React, { Component } from 'react';
import withShowManageExamShiftWrapperFormHOC from './withShowManageExamShiftWrapperFormHOC';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/FlatButton';

class ShowManageExamShiftButton extends Component {
  showManageExamShiftDialog = () => {
    const { showManageExamShiftDialogFromHOC } = this.props;
    if (showManageExamShiftDialogFromHOC) {
      showManageExamShiftDialogFromHOC();
    }
  };

  render() {
    return (
      <FlatButton
        primary
        className={'action'}
        title={t1('manage_exam_shift')}
        icon={<Icon icon="edit" />}
        onClick={() => this.showManageExamShiftDialog()}
      />
    );
  }
}

export default withShowManageExamShiftWrapperFormHOC(ShowManageExamShiftButton);
