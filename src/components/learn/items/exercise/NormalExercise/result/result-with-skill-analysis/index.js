import React from 'react';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import exerciseApiUrls from 'components/admin/exercise/endpoints';
import lodashGet from 'lodash.get';
import RadarChartView from './radar-chart-view';
import TableView from './table-view';

const cssClass = 'normal-exercise-result-with-skill-analysis';

const fetchExerciseSkillAnalysis = fetchData(({ exercise, courseIid }) => ({
  baseUrl: exerciseApiUrls.get_exercise_skill_analysis,
  params: {
    exercise_iid: lodashGet(exercise, 'iid'),
    course_iid: courseIid,
  },
  propKey: 'skillAnalysis',
}));

const NormalExerciseResultWithSkillAnalysis = ({
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
  skillAnalysis,
}) => {
  return (
    <div>
      <h3>{t1('skill_analysis')}</h3>
      {skillAnalysis && Object.values(skillAnalysis).length > 2 && (
        // because a radar chart with < 3 points is not possible
        <React.Fragment>
          {/*
            <h3>{t1('overview')}: </h3>
             */}
          <RadarChartView skillAnalysis={skillAnalysis} />
          {/*
            <h3>{t1('details')}: </h3>
             */}
        </React.Fragment>
        // TODO: implement case Object.values(skillAnalysis) <= 2
      )}

      <TableView skillAnalysis={skillAnalysis} />
    </div>
  );
};

export default fetchExerciseSkillAnalysis(
  NormalExerciseResultWithSkillAnalysis,
);
