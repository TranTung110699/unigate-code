import React, { Component } from 'react';

class InlineInputTemplate extends Component {
  handleKeyPress = (event) => {
    const { onCheckAnswer, question } = this.props;

    if (event.key === 'Enter') {
      if (onCheckAnswer && question.isVocabQuestion) {
        onCheckAnswer();
      }
    }
  };

  render() {
    const {
      e,
      i,
      onChange,
      getHighlightsClass,
      disabled,
      userAnswers,
    } = this.props;
    const userAnswer = (userAnswers && userAnswers[i]) || '';
    // TODO: render a TextField and Element component instead of input and select
    return (
      <span>
        {e.type === 'input' && (
          <input
            disabled={disabled}
            name={`text_${i}`}
            className={getHighlightsClass(i)}
            onChange={(event) => {
              onChange(event.target.value, i);
            }}
            onKeyPress={this.handleKeyPress}
            value={userAnswer}
          />
        )}
        {e.type === 'select' && (
          <select
            disabled={disabled}
            name={`select_${i}`}
            className={getHighlightsClass(i)}
            onChange={(event) => {
              onChange(event.target.value, i);
            }}
            value={userAnswer}
          >
            <option>---</option>
            {e.answer.map((option, index) => (
              <option key={index} value={option.text}>
                {option.text}
              </option>
            ))}
          </select>
        )}
      </span>
    );
  }
}

export default InlineInputTemplate;
