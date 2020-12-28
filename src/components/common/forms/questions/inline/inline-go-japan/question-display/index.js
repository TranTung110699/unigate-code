import React from 'react';
import { inputId, parseInlineQuestionRawText } from 'common/learn/Question';
import DisplayHtml from 'components/common/html';
import InlineInputTemplate from './InlineInputTemplate';
import Portal from 'components/common/portal';

import './stylesheet.scss';

const cssClass = 'go-japan-inline-question-display';

const QuestionPlaceHolder = ({ question }) => {
  const parsed =
    (question &&
      question.content &&
      parseInlineQuestionRawText(question.content, question)) ||
    {};

  if (question.isVocabQuestion) {
    return (
      <div className={cssClass}>
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
    <div className={cssClass}>
      <DisplayHtml content={parsed.rawQuestion} />
    </div>
  );
};

const QuestionDisplay = ({
  question,
  disabled,
  onCheckAnswer,
  userAnswers,
  getHighlightsClass,
  onChange,
  onStartDoingPart,
  doingPartIndex,
}) => {
  const populateInlineContent = () => {
    const parsed =
      question &&
      question.content &&
      parseInlineQuestionRawText(question.content);

    if (parsed && parsed.correctAnswers) {
      return parsed.correctAnswers.map((questionPart, index) => {
        // inject element to DOM
        const id = inputId(index, question);

        return (
          <Portal key={id} id={id}>
            {
              <InlineInputTemplate
                getHighlightsClass={getHighlightsClass}
                userAnswers={userAnswers}
                disabled={disabled}
                onChange={onChange}
                onCheckAnswer={onCheckAnswer}
                questionPart={questionPart}
                index={index}
                question={question}
                onStartDoingPart={(part, partIndex) =>
                  onStartDoingPart(part, partIndex)
                }
                isDoing={doingPartIndex == index}
              />
            }
          </Portal>
        );
      });
    }

    return null;
  };

  return (
    <>
      <QuestionPlaceHolder question={question} />
      {populateInlineContent()}
    </>
  );
};

export default QuestionDisplay;
