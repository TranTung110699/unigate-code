import React from 'react';
import PropTypes from 'prop-types';
import { isIntroSticky } from 'common/learn/Question';
import lodashGet from 'lodash.get';
import styled from 'styled-components';
import { t1 } from 'translate';
import { isSmallScreen } from '../../../../../../common';

const QuestionNumber = styled.span`
  font-size: 12px;
`;

class QuestionNavigationsNumber extends React.Component {
  render() {
    const { currentQuestionUniqueId, title } = this.props;

    let { questions } = this.props;

    if (!Array.isArray(questions)) {
      return null;
    }

    // filter intro sticky questions out, we will not show them in control bar
    questions = questions.filter(
      (question) => question && !isIntroSticky(question),
    );

    const currentQuestionIndex = questions.findIndex(
      (item) => lodashGet(item, 'id') === currentQuestionUniqueId,
    );
    if (currentQuestionIndex === -1) {
      return null;
    }

    return (
      <div className={`m-b-10 ${!isSmallScreen && 'm-t-10'}`}>
        <QuestionNumber className="text-muted">
          {title || t1('question')}{' '}
          <strong>{`${currentQuestionIndex + 1}/${questions.length}`}</strong>
        </QuestionNumber>
      </div>
    );
  }
}

QuestionNavigationsNumber.propTypes = {
  currentQuestionUniqueId: PropTypes.string,
  title: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape()),
};

QuestionNavigationsNumber.defaultProps = {
  currentQuestionUniqueId: null,
  questions: [],
};

export default QuestionNavigationsNumber;
