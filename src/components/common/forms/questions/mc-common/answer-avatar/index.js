import React from 'react';
import SelectImage from 'schema-form/elements/select-image';
import SelectImageGoJapan from './select-image-go-japan';
import { t4 } from 'translate';
import './stylesheet.scss';

function AnswerAvatar(props) {
  const handleChooseAnswer = (indexes) => {
    const { handleChooseAnswer } = props;
    handleChooseAnswer(indexes);
  };

  let {
    question,
    highlights,
    disabled,
    userAnswers,
    hintText,
    meta,
    getHighlightsClass,
    getValueOfItem,
    multiple,
    withAudio,
    options,
  } = props;
  question = question || {};
  const { mc_answers } = question;

  if (window.isGoJapan) {
    return (
      <SelectImageGoJapan
        meta={meta}
        getHighlightsClass={getHighlightsClass}
        getValueOfItem={getValueOfItem}
        multiple={multiple}
        withAudio={withAudio}
        options={options}
        hintText={hintText}
        disabled={disabled}
        highlights={highlights}
        onChange={handleChooseAnswer}
        valueKey="@index"
        data={mc_answers}
        value={userAnswers}
        id={question.iid}
      />
    );
  }

  return (
    <div>
      <SelectImage
        {...props}
        saveAsArrayWhenMultipleIsFalse
        notBlurNonselectedImage
        disabled={disabled}
        highlights={highlights}
        value={userAnswers}
        onChange={handleChooseAnswer}
        valueKey="@index"
        itemsPerLine={2}
        height="150px"
        data={mc_answers}
        title={t4('text')}
      />
    </div>
  );
}

export default AnswerAvatar;
