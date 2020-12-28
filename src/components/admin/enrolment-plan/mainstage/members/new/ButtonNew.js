import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { connect } from 'react-redux';
import ButtonNew from 'components/common/primary-button';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import AddMembers from './AddMembers';

class EnrolmentPlanMemberButtonNew extends React.Component {
  renderPreview = ({ showFull }) => (
    <ButtonNew
      icon={<Icon icon="plus" />}
      labelPosition="right"
      label={t1('add_new_students')}
      onClick={showFull}
    />
  );

  renderFull = ({ closeDialog }) => (
    <AddMembers
      enrolmentPlan={this.props.enrolmentPlan}
      closeDialog={closeDialog}
    />
  );

  handleClose = () => {
    const { dispatch, searchFormId } = this.props;
    dispatch(submit(searchFormId));
  };

  dialogOptionsProperties = {
    title: t1('add_new_students'),
    callbacks: {
      onCloseDialog: this.handleClose,
    },
    width: '80%',
    handleClose: true,
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

EnrolmentPlanMemberButtonNew.propTypes = {
  className: PropTypes.string,
};

EnrolmentPlanMemberButtonNew.defaultProps = {
  className: '',
};

export default connect()(EnrolmentPlanMemberButtonNew);
