import React, { Component } from 'react';
import { t1 } from 'translate';
import PrimaryButton from 'components/common/primary-button';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';
import Form from 'components/admin/survey/mainstage/applied-items/new/Form';
import { surveyAppliedItemTypes } from 'configs/constants/survey';

class ButtonNew extends Component {
  renderFull = ({}) => {
    const { node, searchFormId } = this.props;
    return (
      <Form
        mode="new"
        step="add_surveys_to_applied_item"
        appliedItem={node}
        appliedItemType={surveyAppliedItemTypes.CREDIT_SYLLABUS}
        searchFormId={searchFormId}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { label } = this.props;
    return (
      <PrimaryButton
        icon={<Icon icon="plus" />}
        label={label || t1('add_survey')}
        onClick={showFull}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default ButtonNew;
