import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

class SurveyFinished extends React.Component {
  render() {
    const { onOkButtonClick } = this.props;

    return (
      <div className="test-result-wrapper learn-content-border">
        <div className="quiz-content text-center">
          <Icon icon="survey" className="icon" />
          <h3>{t1('survey')}</h3>
          <p>{t1('you_have_already_completed_this_survey')}</p>
          {typeof onOkButtonClick === 'function' ? (
            <button className="btn btn-filled" onClick={onOkButtonClick}>
              {t1('continue_learning')}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

SurveyFinished.propTypes = {
  onOkButtonClick: PropTypes.func,
};

SurveyFinished.defaultProps = {
  onOkButtonClick: null,
};

export default SurveyFinished;
