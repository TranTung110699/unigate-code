import React from 'react';
import lodashGet from 'lodash.get';
import { numberQuestionTypes } from 'configs/constants';
import Radio from './radio';
import Text from './text';

class NumberQuestion extends React.Component {
  render() {
    const { question } = this.props;

    switch (lodashGet(question, 'number_question_type')) {
      case numberQuestionTypes.NUMBER_QUESTION_TYPE_RADIO:
        return <Radio {...this.props} />;
      case numberQuestionTypes.NUMBER_QUESTION_TYPE_TEXT:
      default:
        return <Text {...this.props} />;
    }
  }
}

export default NumberQuestion;
