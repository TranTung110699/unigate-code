import React from 'react';
import SelectText from './select-text';

const AnswerText = ({
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
  value,
  onChange,
}) => {
  question = question || {};
  let { mc_answers, answers } = question;
  mc_answers = mc_answers || answers;

  return (
    <SelectText
      meta={meta}
      vertical={vertical}
      getHighlightsClass={getHighlightsClass}
      getValueOfItem={getValueOfItem}
      multiple={multiple}
      withAudio={withAudio}
      options={options}
      hintText={hintText}
      disabled={disabled}
      highlights={highlights}
      onChange={onChange}
      valueKey="@index"
      data={mc_answers}
      value={value}
      id={question.iid}
    />
  );
};

export default AnswerText;
