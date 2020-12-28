import React from 'react';
import AnswerTextCommon from '../../mc-common/answer-text';

const AnswerText = ({
  handleChooseAnswer,
  meta,
  vertical,
  getHighlightsClass,
  getValueOfItem,
  multiple,
  withAudio,
  options,
  hintText,
  question,
  highlights,
  disabled,
  userAnswers,
}) => {
  const handleChange = React.useCallback(
    ({ selectedIndexes }) => {
      handleChooseAnswer(selectedIndexes);
    },
    [handleChooseAnswer],
  );

  const value = React.useMemo(
    () => ({
      selectedIndexes: userAnswers,
    }),
    [userAnswers],
  );

  return (
    <AnswerTextCommon
      onChange={handleChange}
      meta={meta}
      vertical={vertical}
      getHighlightsClass={getHighlightsClass}
      getValueOfItem={getValueOfItem}
      multiple={multiple}
      withAudio={withAudio}
      options={options}
      hintText={hintText}
      question={question}
      highlights={highlights}
      disabled={disabled}
      value={value}
    />
  );
};

export default AnswerText;
