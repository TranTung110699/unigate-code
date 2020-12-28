import React from 'react';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

const StartExam = (props) => {
  const { node, prompt, startExamAction, examInfo } = props;
  const ruleExam = node.options || {};
  const { regulation } = ruleExam;
  const duration =
    ruleExam.duration || (examInfo && examInfo.duration) || node.duration;
  const labelButton = props.labelButton || t1('take_exam');

  return (
    <div className="start-exam-wrapper learn-content-border">
      <div className="quiz-content text-center">
        <Icon icon="start_exam" className="icon" />
        <h3>{t1('exam')}</h3>
        {duration && (
          <span>
            <Icon icon="time" className="icon duration" />
            {duration}
          </span>
        )}
        <span className="mention">
          <Icon icon="mention" className="icon" />
          {t1('exam_regulations')}
        </span>
        {regulation && (
          <div
            className="exam-regulations"
            dangerouslySetInnerHTML={{ __html: regulation }}
          />
        )}
        <button
          className="btn btn-filled"
          onClick={() => {
            if (typeof startExamAction === 'function') {
              const examOrder = (examInfo && examInfo.nextExamOrder) || 1;
              startExamAction(examOrder);
            }
          }}
        >
          {labelButton}
        </button>
        {prompt && <span>{prompt}</span>}
      </div>
    </div>
  );
};

export default StartExam;
