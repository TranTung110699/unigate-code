import React, { Component } from 'react';
import Question from 'components/common/forms/questions';
import makeReduxFormCompatible from 'components/common/makeReduxFormCompatible';

class Form extends Component {
  render() {
    const { question, onChange, value } = this.props;
    return (
      <Question
        {...this.props}
        defaultAnswers={value}
        onChange={onChange}
        question={question}
      />
    );
  }
}

export default makeReduxFormCompatible({})(Form);
