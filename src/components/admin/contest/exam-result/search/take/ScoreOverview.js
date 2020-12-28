import React, { Component } from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import ExerciseScore from './ScoreOverviewForOneExercise';
import Warning from 'components/common/Warning';
import SuccessAlert from 'components/common/SuccessAlert';
import FinishMarkingStatus from './marking/FinishMarkingStatus';

// import Icon from 'components/common/Icon';
// import RaisedButton from 'components/common/mui/RaisedButton';
// import exportOpenEndedAnswers from './exportOpenEnded';

const getPartScore = (scoreDetail, exerciseIid) => {
  const filtered = scoreDetail
    ? scoreDetail.find((part) => part && part.iid == exerciseIid)
    : {};
  return getLodash(filtered, 'weighted');
};

class ScoreOverview extends Component {
  render() {
    const { take, readOnly } = this.props;
    const answers = getLodash(take, 'answers');

    const paperTreeView = getLodash(take, 'paper_detail.tree_view');
    const scoreDetail = getLodash(take, 'score_detail');

    if (!paperTreeView || !paperTreeView.children)
      return (
        <Warning>
          {t1('something_went_wrong_because_the_paper_is_empty')}
        </Warning>
      );

    return (
      <div>
        <h1>
          {t1('score')}:{' '}
          <SuccessAlert inline>
            <b>{getLodash(take, 'score')}</b>
          </SuccessAlert>{' '}
          / {getLodash(take, 'total_score')}
        </h1>
        <h2>
          {t1('exam_paper')}: {getLodash(take, 'paper_detail.name')}
        </h2>

        <FinishMarkingStatus take={take} />

        {/*
        <b>{t1('export_answers_for_marking')}</b>

        <RaisedButton
          name="export"
          id="export"
          label={t1('export')}
          className="m-l-10"
          primary
          icon={<Icon icon={'export'} />}
          onClick={() => {
            exportOpenEndedAnswers(this.props.take);
          }}
        />
           */}
        <div>
          {paperTreeView.children.map((exercise, index) => {
            return (
              <div key={`score-${exercise.id}`}>
                <h2>
                  {exercise.name}{' '}
                  <SuccessAlert inline>
                    ({t1('score')} : {getPartScore(scoreDetail, exercise.iid)})
                  </SuccessAlert>
                </h2>
                <div className="whitebox">
                  <ExerciseScore
                    exercise={exercise}
                    answers={answers}
                    takeId={take.id}
                    readOnly={readOnly}
                    onManualMarkingQuestion={() => {
                      this.props.handleRefetch();
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ScoreOverview;
