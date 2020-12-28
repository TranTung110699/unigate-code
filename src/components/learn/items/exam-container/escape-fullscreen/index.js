import React from 'react';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

class EscapeFullScreen extends React.Component {
  render() {
    const { onContinue, learnInfo } = this.props;

    return (
      <div className="start-exam-wrapper">
        <div className="quiz-content text-center">
          <Icon icon="start_exam" className="icon" />
          <h3>{t1('exam')}</h3>
          <button className="btn btn-filled" onClick={onContinue}>
            {t1('continue')}
          </button>
          {learnInfo &&
            learnInfo.timeLeft &&
            (() => {
              const timeLeft = learnInfo.timeLeft;
              const timeLeftText = `${t1('time_remaining')}: ${timeLeft}`;
              return <p>{timeLeftText}</p>;
            })()}
        </div>
      </div>
    );
  }
}

export default EscapeFullScreen;
