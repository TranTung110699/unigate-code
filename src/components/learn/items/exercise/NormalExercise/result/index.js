import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import './NormalExerciseResult.scss';
import Detail from './Detail';
import withSchoolConfig from 'common/hoc/withSchoolConfigs';
import NormalExerciseResultWithSkillAnalysis from './result-with-skill-analysis';
import lodashGet from 'lodash.get';
import Warning from 'components/common/Warning';

const cssClass = 'normal-exercise-result';

const NormalExerciseResult = ({
  exercise = null,
  onNextButtonClick = null,
  onRedoButtonClick = null,
  onReviewButtonClick = null,
  options = null,
  positionOfCurrentItem = null,
  detailActionProps = null,
  result = null,
  onResumeButtonClick = null,
  shouldShowDetail = false,
  hasAction,
  isPixelz,
  courseIid,
}) => {
  const canReview = lodashGet(options, 'can_review');
  const canResume = lodashGet(options, 'can_resume');
  const numberOfTimesUserCanDoExercise = lodashGet(options, 'can_do');
  const canRedo =
    !numberOfTimesUserCanDoExercise || numberOfTimesUserCanDoExercise > 1;
  const shouldDisplaySkillAnalysisWhenDisplayExerciseResult = lodashGet(
    options,
    'show_result_by_skills',
  );

  return (
    <div className="test-result-wrapper learn-content-border">
      <div
        className={`quiz-content text-center ${cssClass} ${
          shouldDisplaySkillAnalysisWhenDisplayExerciseResult
            ? 'result-with-skills'
            : ''
        }`}
      >
        <Icon icon="start_exam" className="icon" />
        <h3>{t1('result')}</h3>
        <span>
          <Icon icon="result" className="icon result" />
          <b>{result}</b>/100
        </span>
        {shouldShowDetail ? (
          <Detail
            actionProps={detailActionProps}
            exercise={exercise}
            className={`${cssClass}__detail`}
          />
        ) : null}
        {hasAction ? (
          <React.Fragment>
            {canReview && typeof onReviewButtonClick === 'function' ? (
              <button className="btn btn-filled" onClick={onReviewButtonClick}>
                {t1('review')}
              </button>
            ) : null}
            {canResume && typeof onResumeButtonClick === 'function' ? (
              <button
                className="btn btn-primary m-t-20"
                onClick={onResumeButtonClick}
              >
                {t1('continue')}
              </button>
            ) : null}
            {canRedo && typeof onRedoButtonClick === 'function' ? (
              <div>
                <button className="btn btn-filled" onClick={onRedoButtonClick}>
                  {t1('redo')}
                </button>
                <Warning>
                  {t1('if_you_redo_exercise_progress_will_be_reset')}
                </Warning>
              </div>
            ) : null}
          </React.Fragment>
        ) : null}
        {(isPixelz || window.isGoJapan) &&
        (!positionOfCurrentItem || positionOfCurrentItem !== 'last') &&
        typeof onNextButtonClick === 'function' ? (
          <button className="btn btn-primary" onClick={onNextButtonClick}>
            {t1('learn_continue')}
          </button>
        ) : null}
        {shouldDisplaySkillAnalysisWhenDisplayExerciseResult ? (
          [
            <hr />,
            <NormalExerciseResultWithSkillAnalysis
              exercise={exercise}
              onNextButtonClick={onNextButtonClick}
              onRedoButtonClick={onRedoButtonClick}
              onReviewButtonClick={onReviewButtonClick}
              options={options}
              positionOfCurrentItem={positionOfCurrentItem}
              detailActionProps={detailActionProps}
              result={result}
              onResumeButtonClick={onResumeButtonClick}
              shouldShowDetail={shouldShowDetail}
              hasAction={hasAction}
              isPixelz={isPixelz}
              courseIid={courseIid}
            />,
          ]
        ) : (
          <p>{t1('you_have_finished_the_exercise')}</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  positionOfCurrentItem: state.learn.positionOfCurrentItem,
});

export default withSchoolConfig(connect(mapStateToProps)(NormalExerciseResult));
