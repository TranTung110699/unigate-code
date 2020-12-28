import React from 'react';
import ManageExamShiftWrapper from './ManageExamShiftWrapper';
import { t1 } from 'translate';
import actions from 'actions/node/creators';

/**
 * This is higher order component to common login to showManageExamShiftDialog, use on contest dashboard and manage exam shifts
 *
 * @param WrappedComponent
 * @returns {WithShowManageExamShiftWrapperFormHOC}
 */
const withShowManageExamShiftWrapperFormHOC = (WrappedComponent) => {
  class WithShowManageExamShiftWrapperFormHOC extends React.Component {
    showManageExamShiftDialog = () => {
      const {
        dispatch,
        contestIid,
        examShift,
        subAction,
        ...options
      } = this.props;

      const contentDialog = (
        <ManageExamShiftWrapper
          contestIid={contestIid}
          subAction={subAction}
          examShift={examShift}
          dispatch={dispatch}
          {...options}
        />
      );

      const optionsProperties = {
        modal: true,
        handleClose: true,
        width: '90%',
        title: `${t1('manage_exam_shift')} - ${examShift && examShift.name}`,
      };

      const dialogKey = `manage-exam-shift-${examShift && examShift.iid}`;
      dispatch(
        actions.handleOpenDialog(
          { contentDialog, optionsProperties },
          dialogKey,
        ),
      );
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          showManageExamShiftDialogFromHOC={this.showManageExamShiftDialog}
        />
      );
    }
  }

  return WithShowManageExamShiftWrapperFormHOC;
};

export default withShowManageExamShiftWrapperFormHOC;
