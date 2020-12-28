import React from 'react';
import lodashGet from 'lodash.get';
import QuestionDisplay from './question-display';
import QuestionMcAnswer from './question-mc-answer';
import { parseInlineQuestionRawText } from 'common/learn/Question';
import { questionTemplateTypes } from 'components/admin/question/schema/question-template-types';
import { isKana, toKana } from 'wanakana';
import { shuffleArray } from 'common/utils/Array';
import isEqual from 'lodash.isequal';

const getQuestionPartFromQuestion = (question, index) => {
  const parsed =
    question &&
    question.content &&
    parseInlineQuestionRawText(question.content);
  return lodashGet(parsed, ['correctAnswers', index]);
};

const Inline = ({
  question,
  disabled,
  onCheckAnswer,
  userAnswers,
  resetHighlights,
  setUserAnswers,
  getHighlightsClass,
}) => {
  const [doingPartIndex, setDoingPartIndex] = React.useState(0);
  const doingPart = getQuestionPartFromQuestion(question, doingPartIndex);
  const answers = lodashGet(doingPart, 'answer', []);
  const [options, setOptions] = React.useState(answers);

  React.useEffect(
    () => {
      setOptions(shuffleArray(answers));
    },
    [question.iid],
  );

  const handleChange = (value, index) => {
    let userAnswerValue = value;
    if (
      question.tpl_type === questionTemplateTypes.TYPING &&
      !isKana(userAnswerValue)
    ) {
      userAnswerValue = toKana(userAnswerValue, {
        IMEMode: true,
      });
    }

    const newUserAnswer = Object.assign([], userAnswers, {
      [index]: userAnswerValue,
    });
    setUserAnswers(newUserAnswer);
    resetHighlights();
  };

  return (
    <div>
      <QuestionDisplay
        question={question}
        disabled={disabled}
        onCheckAnswer={onCheckAnswer}
        userAnswers={userAnswers}
        resetHighlights={resetHighlights}
        setUserAnswers={setUserAnswers}
        getHighlightsClass={getHighlightsClass}
        onChange={handleChange}
        onStartDoingPart={(part, partIndex) => {
          setDoingPartIndex(partIndex);
        }}
        doingPartIndex={doingPartIndex}
      />
      {doingPart && doingPart.type === 'select' ? (
        <div className="m-t-15">
          <QuestionMcAnswer
            mcPartIndex={doingPartIndex}
            userAnswerForPart={lodashGet(userAnswers, doingPartIndex)}
            setUserAnswerForPart={(value) => {
              handleChange(value, doingPartIndex);
            }}
            disabled={disabled}
            options={options}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Inline;
