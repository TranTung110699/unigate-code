import React from 'react';

const InlineInputTemplate = ({
  onCheckAnswer,
  question,
  questionPart,
  index,
  onChange,
  getHighlightsClass,
  disabled,
  userAnswers,
  onStartDoingPart,
  isDoing,
}) => {
  const handleKeyPress = React.useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (onCheckAnswer && question.isVocabQuestion) {
          onCheckAnswer();
        }
      }
    },
    [onCheckAnswer, question],
  );

  const answer = (userAnswers && userAnswers[index]) || '';
  // TODO: render a TextField and Element component instead of input and select

  const handleMcPartClick = React.useCallback(
    () => {
      if (typeof onStartDoingPart === 'function') {
        onStartDoingPart(questionPart, index);
      }
    },
    [onStartDoingPart, index, questionPart],
  );

  const handleInputPartFocus = React.useCallback(
    () => {
      if (typeof onStartDoingPart === 'function') {
        onStartDoingPart(questionPart, index);
      }
    },
    [onStartDoingPart, index, questionPart],
  );

  return (
    <span>
      {questionPart.type === 'input' ? (
        <input
          onFocus={handleInputPartFocus}
          disabled={disabled}
          name={`text_${index}`}
          className={getHighlightsClass(index)}
          onChange={(event) => {
            onChange(event.target.value, index);
          }}
          onKeyPress={handleKeyPress}
          value={answer}
          style={{
            height: 40,
            minWidth: 52,
            background: 'white',
            border: 'solid 1px #c3c3c3',
          }}
          autoComplete="off"
        />
      ) : null}
      {questionPart.type === 'select' ? (
        <button
          onClick={handleMcPartClick}
          className={getHighlightsClass(index)}
          style={{
            height: 40,
            minWidth: 52,
            background: 'white',
            border: `solid 1px ${isDoing ? '#f7941d' : '#c3c3c3'}`,
            outline: 'none',
          }}
        >
          {answer || ' '}
        </button>
      ) : null}
    </span>
  );
};

export default InlineInputTemplate;
