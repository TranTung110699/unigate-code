import React from 'react';
import { t1 } from 'translate';
import trim from 'lodash.trim';

class QuestionFeedback extends React.Component {
  render() {
    const { isCorrect, question } = this.props;

    return (
      <div>
        {(trim(question.feedback_true) !== '' ||
          trim(question.feedback_false) !== '') && (
          <div>
            <div>{t1('feedback')}</div>
            {isCorrect === true ? (
              <div>{question.feedback_true}</div>
            ) : (
              <div>{question.feedback_false}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default QuestionFeedback;
