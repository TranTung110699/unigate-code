import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import AnswerByStructure from 'components/common/forms/questions/open-ended/AnswerByStructure';
import ViewAnswer from 'components/common/forms/questions/open-ended/submission-area/viewAnswer';
import './viewOpenEndedAnswer.scss';

const cssClass = 'view-open-ended-answer';

const ViewOpenEndedAnswer = ({
  question,
  takeDetail,
  setRubricToShowMarking,
}) => {
  const structureAnswer = get(question, 'structure_answer');

  if (
    get(question, 'sub_type') === 'advanced' &&
    Array.isArray(structureAnswer)
  ) {
    return (
      <AnswerByStructure
        value={get(takeDetail, 'answer.content')}
        structureAnswer={structureAnswer}
        readOnly
        setRubricToShowMarking={setRubricToShowMarking}
      />
    );
  }

  const answer =
    get(takeDetail, 'answer.content.0') || get(takeDetail, 'answer');

  if (answer) {
    return <ViewAnswer answer={answer} />;
  }

  return <div>{t1('cannot_view_answer')}</div>;
};

export default ViewOpenEndedAnswer;
