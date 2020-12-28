import React from 'react';
import { t1 } from 'translate';
import { statuses as examStatus } from 'common/learn';
import Icon from 'components/common/Icon';

class TestResult extends React.Component {
  getExamNote = (numberOfNextExamOrder) => {
    const { node, status } = this.props;
    const isCanRedo = status === examStatus.RETAKE;
    const examRules = node.options || {};
    let note = '';

    if (!examRules.can_do) {
      note = t1('you_can_take_exam_anytime');
    } else if (isCanRedo) {
      note = t1('you_can_take_exam_%s_more_times', [
        examRules.can_do - (numberOfNextExamOrder - 1),
      ]);
    } else {
      note = t1('you_cannot_take_exam_anymore');
    }

    return note;
  };

  render() {
    const { node, examInfo, redoExamAction, learnInfo, status } = this.props;
    const numberOfNextExamOrder = examInfo && examInfo.nextExamOrder;
    const note = this.getExamNote(numberOfNextExamOrder);
    const score = examInfo && examInfo.latestTake && examInfo.latestTake.score;
    const totalScore =
      (examInfo && examInfo.latestTake && examInfo.latestTake.total_score) ||
      100;
    const isCanRedo = status === examStatus.RETAKE;

    return (
      <div className="test-result-wrapper learn-content-border">
        <div className="quiz-content text-center">
          <Icon icon="start_exam" className="icon" />
          <h3>{t1('exam')}</h3>
          {typeof score !== 'undefined' && score !== null ? (
            <span>
              <Icon icon="result" className="icon result" />
              {score}/{totalScore}
            </span>
          ) : (
            <span>
              <Icon icon="result" className="icon result" />
              {t1('your_exam_is_still_being_graded')}
            </span>
          )}
          {isCanRedo && (
            <button
              className="btn btn-filled"
              onClick={() => redoExamAction(numberOfNextExamOrder)}
            >
              {t1('redo_exam')}
            </button>
          )}
          <p>{note}</p>
        </div>
      </div>
    );
  }
}

export default TestResult;
