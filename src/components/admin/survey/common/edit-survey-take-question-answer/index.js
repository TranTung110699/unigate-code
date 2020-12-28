import React, { Component } from 'react';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import lodashGet from 'lodash.get';
import Form from './Form';
import { isIntro } from 'common/learn/Question';
import { t1 } from 'translate';
import Popover from 'antd/lib/popover';

class Question extends Component {
  getAnswer = (questionIid) => {
    const { take } = this.props;
    return lodashGet(take, `answers.${questionIid}.answer`);
  };

  renderFull = () => {
    const { question, take, takeIdsToSaveAnswer, searchFormId } = this.props;
    return (
      <Form
        searchFormId={searchFormId}
        formid={`edit_survey_question_answer_${lodashGet(
          take,
          'id',
        )}_${lodashGet(question, 'iid')}`}
        question={question}
        answer={this.getAnswer(question.iid)}
        takeIdsToSaveAnswer={takeIdsToSaveAnswer || [lodashGet(take, 'id')]}
      />
    );
  };

  textPreview = () => {
    const { question } = this.props;
    let content = '';

    switch (question.type) {
      case questionTypes.TYPE_INTRODUCTION:
        content = t1('intro');
        break;
      case questionTypes.TYPE_NUMBER:
        content = lodashGet(this.getAnswer(question.iid), '[0]');
        break;
      case questionTypes.TYPE_MC:
        content = (lodashGet(question, 'mc_answers') || [])
          .filter((a, index) =>
            (this.getAnswer(question.iid) || []).includes(index),
          )
          .map((a) => lodashGet(a, 'text'))
          .join(', ');
        break;
    }

    return content || '...';
  };

  dialogOptionsProperties = () => {
    const { question } = this.props;

    return {
      title: isIntro(question) ? '' : t1('save_survey_question_answer'),
    };
  };

  render() {
    const { question } = this.props;
    return (
      <Popover
        content={this.renderFull()}
        trigger="click"
        placement="right"
        title={isIntro(question) ? '' : t1('save_survey_question_answer')}
      >
        <span style={{ cursor: 'pointer' }}>{this.textPreview()}</span>
      </Popover>
    );
  }
}

export default Question;
