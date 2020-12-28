import React from 'react';
import lodashGet from 'lodash.get';

import './stylesheet.scss';

const cssClass = 'go-japan-inline-question-mc-answer';

const styles = {
  checkBox: {
    marginBottom: 16,
  },
  icon: {
    fill: '#427bc9',
  },
};

const QuestionMcAnswer = ({
  disabled,
  mcPartIndex,
  setUserAnswerForPart,
  userAnswerForPart,
  options = [],
}) => {
  return options.map((option, index) => {
    const text = lodashGet(option, 'text');
    const isChecked = userAnswerForPart === text;

    const handleCheck = () => {
      if (disabled) {
        return;
      }

      if (typeof setUserAnswerForPart === 'function') {
        setUserAnswerForPart(text);
      }
    };

    return (
      <div
        key={`${mcPartIndex}-${index}`}
        style={styles.checkBox}
        onClick={handleCheck}
        className={`${cssClass}__answer-checkbox ${
          isChecked ? `${cssClass}__answer-checkbox--selected` : ''
        }`}
      >
        <div
          className={`${cssClass}__answer-text ${
            isChecked ? `${cssClass}__answer-text--selected` : ''
          }`}
        >
          {text}
        </div>
      </div>
    );
  });
};

export default QuestionMcAnswer;
