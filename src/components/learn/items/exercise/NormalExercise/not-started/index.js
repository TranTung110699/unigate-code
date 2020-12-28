import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { steps } from 'common/learn/exercise';

const NormalExerciseNotStarted = ({
  step = '',
  onStartButtonClick = null,
  onResumeButtonClick = null,
  onRedoButtonClick = null,
}) => (
  <div className="test-result-wrapper learn-content-border">
    <div className="quiz-content text-center p-20">
      <Icon icon="start_exam" className="icon" />
      <h3>{t1('exercise')}</h3>
      {step === steps.NOT_STARTED && (
        <button className="btn-primary" onClick={onStartButtonClick}>
          {t1('take_exercise')}
        </button>
      )}
      {step === steps.NOT_CONTINUED && (
        <React.Fragment>
          <button className="btn-primary" onClick={onResumeButtonClick}>
            {t1('continue')}
          </button>
          <button className="btn btn-filled" onClick={onRedoButtonClick}>
            {t1('redo')}
          </button>
        </React.Fragment>
      )}
    </div>
  </div>
);

export default NormalExerciseNotStarted;
