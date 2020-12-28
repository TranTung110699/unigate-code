import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/NewButton';
import { fetchEnrolmentPlanData } from '../../../common';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import AttachSmartGroup from './AttachSmartGroup';

class EnrolmentPlanButtonAttachSmartGroup extends React.Component {
  renderPreview = ({ showFull }) => (
    <FlatButton
      icon={<Icon icon="plus" />}
      labelPosition="right"
      label={t1('attach_smart_group')}
      onClick={showFull}
    />
  );

  renderFull = ({ closeDialog }) => (
    <AttachSmartGroup
      onAddSuccessful={() => {
        fetchEnrolmentPlanData(this.props.enrolmentPlan);
        closeDialog();
      }}
      enrolmentPlan={this.props.enrolmentPlan}
    />
  );

  handleClose = () => {
    const { dispatch, searchFormId } = this.props;
    dispatch(submit(searchFormId));
  };

  dialogOptionsProperties = {
    callbacks: {
      onCloseDialog: this.handleClose,
    },
    width: '80%',
  };

  render() {
    return (
      <DetailOnDialog
        enrolmentPlan={this.props.enrolmentPlan}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

EnrolmentPlanButtonAttachSmartGroup.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanButtonAttachSmartGroup.defaultProps = {
  className: '',
};

export default connect()(EnrolmentPlanButtonAttachSmartGroup);
