import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

class Question extends Component {
  renderFull = () => {
    const {
      questions,
      userIid,
      targetIids,
      enrolmentPlan,
      searchFormId,
    } = this.props;
    return (
      <Form
        searchFormId={searchFormId}
        formid={`edit_survey_question_answer_${lodashGet(
          enrolmentPlan,
          'iid',
        )}_${userIid}`}
        targetIids={targetIids}
        questions={questions}
        enrolmentPlan={enrolmentPlan}
        userIid={userIid}
      />
    );
  };

  renderPreview = ({ showFull }) => {
    const { style } = this.props;
    return (
      <Icon
        style={{
          cursor: 'pointer',
          ...(style || {}),
        }}
        title={t1('update_survey_question_answers_in_this_row')}
        onClick={showFull}
        icon="edit"
      />
    );
  };

  dialogOptionsProperties = () => ({
    title: t1('update_survey_question_answers_in_this_row'),
  });

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

export default Question;
