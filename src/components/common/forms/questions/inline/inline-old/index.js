import React from 'react';
import { inputId, parseInlineQuestionRawText } from 'common/learn/Question';
import { render } from 'react-dom';
import DisplayHtml from 'components/common/html';
import InlineInputTemplate from './InlineInputTemplate';

import './stylesheet.scss';

class Inline extends React.Component {
  componentDidMount() {
    this.populateInlineContent();
  }

  componentDidUpdate() {
    this.populateInlineContent();
  }

  populateInlineContent = () => {
    const { question, disabled, onCheckAnswer } = this.props;

    const parsed =
      question &&
      question.content &&
      parseInlineQuestionRawText(question.content);

    if (parsed && parsed.correctAnswers) {
      parsed.correctAnswers.forEach((e, i) => {
        // inject element to DOM
        render(
          <InlineInputTemplate
            {...this.props}
            disabled={disabled}
            onChange={this.handleChange}
            onCheckAnswer={onCheckAnswer}
            e={e}
            i={i}
            question={question}
          />,
          document.getElementById(inputId(i, question)),
        );
      });
    }
  };

  handleChange = (value, index) => {
    const { userAnswers, resetHighlights, setUserAnswers } = this.props;

    const newUserAnswer = Object.assign([], userAnswers, { [index]: value });

    setUserAnswers(newUserAnswer);
    resetHighlights();
  };

  render() {
    const { question } = this.props;

    const parsed =
      (question &&
        question.content &&
        parseInlineQuestionRawText(question.content, question)) ||
      {};

    if (question.isVocabQuestion) {
      return (
        <div className="inline-question">
          {question.inlineText && (
            <div className="inline-text">{question.inlineText}</div>
          )}
          <div className="text-center vocab-input">
            <DisplayHtml content={parsed.rawQuestion} />
          </div>
        </div>
      );
    }

    return (
      <div className="inline-question">
        <DisplayHtml content={parsed.rawQuestion} />
      </div>
    );
  }
}

export default Inline;
