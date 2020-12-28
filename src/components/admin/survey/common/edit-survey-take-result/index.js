import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

class EditSurveyTakeResult extends Component {
  renderFull = () => {
    const { questions, searchFormId, take } = this.props;
    return (
      <Form
        searchFormId={searchFormId}
        formid={`edit_survey_take_${lodashGet(take, 'id')}`}
        questions={questions}
        take={take}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { style, label } = this.props;
    return (
      <Icon
        style={{
          cursor: 'pointer',
          ...(style || {}),
        }}
        title={label || t1('update_survey_result')}
        onClick={showFull}
        icon="edit"
      />
    );
  };

  dialogOptionsProperties = () => {
    const { label } = this.props;
    return {
      title: label || t1('update_survey_result'),
    };
  };

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        dialogOptionsProperties={this.dialogOptionsProperties()}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
      />
    );
  }
}

export default EditSurveyTakeResult;
