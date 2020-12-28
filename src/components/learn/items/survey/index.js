import React from 'react';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { initSurvey as initSurveyAction } from 'actions/learn/exercise/normal/saga-creators';
import {
  buildExerciseStructureFromExerciseSelector,
  modes,
} from 'common/learn/exercise';
import {
  getLearnItemInfoSelector,
  getLearnCourseIidSelector,
} from 'common/learn';
import lodashGet from 'lodash.get';
import fetchSurvey from './fetchSurvey';
import SurveyContent from './content';

class Survey extends React.Component {
  componentWillMount() {
    const { onComponentWillMount } = this.props;
    if (typeof onComponentWillMount === 'function') {
      onComponentWillMount();
    }
  }

  render() {
    const { learnItemIid, onFinish, displayMaxHeight } = this.props;
    return (
      <SurveyContent
        learnItemIid={learnItemIid}
        displayMaxHeight={displayMaxHeight}
        onFinish={onFinish}
      />
    );
  }
}

const getQuestionUniqueId = (question) => question && question.iid;

const mapStateToFetchSurveyProps = (state, props) => {
  const surveyIid = props.surveyIid || lodashGet(state, 'learn.itemIid');
  const parentIid = props.parentIid || lodashGet(state, 'learn.parentIid');

  return {
    surveyIid,
    parentIid,
  };
};

const mapStateToProps = (
  state,
  { surveyIid, parentIid, item_iid, item_type, ...props },
) => {
  const survey = getNodeSelector(state)(surveyIid, parentIid);
  const surveyAppliedItemRelationId =
    lodashGet(survey, 'survey_applied_item_relation_id') ||
    props.surveyAppliedItemId;

  const courseIid = getLearnCourseIidSelector(state);
  const learnItemIid =
    surveyAppliedItemRelationId ||
    (courseIid ? `${surveyIid}_${courseIid}` : surveyIid);

  let learnInfo = getLearnItemInfoSelector(state)(learnItemIid);
  const isPreview = lodashGet(state, 'learn.isPreview') || props.isPreview;
  const previewContentOnly = props.previewContentOnly;

  const shouldInitSurvey =
    !learnInfo || (item_iid && learnInfo.item_iid !== item_iid);

  if (shouldInitSurvey) {
    learnInfo = {
      item_iid,
      item_type,
      survey_applied_item_relation_id: surveyAppliedItemRelationId,
      id: survey.id,
      iid: survey.iid,
      name: survey.name,
      overview: survey.overview,
      title: survey.title,
      mode: isPreview ? modes.PREVIEW : modes.NORMAL,
      calculate_rating_automatically: survey.calculate_rating_automatically,
      previewContentOnly,
    };

    const builtStructure = buildExerciseStructureFromExerciseSelector(state)(
      survey.iid,
      getQuestionUniqueId,
      learnInfo,
    );

    if (builtStructure) {
      learnInfo = {
        ...learnInfo,
        ...builtStructure,
      };
    }
  }

  return {
    learnItemIid,
    learnInfo,
    shouldInitSurvey,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initSurvey: (itemIid, info) => {
    dispatch(initSurveyAction(itemIid, info));
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const { learnInfo, shouldInitSurvey, learnItemIid } = stateProps;
  const { initSurvey } = dispatchProps;

  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    onComponentWillMount() {
      if (shouldInitSurvey) {
        initSurvey(learnItemIid, learnInfo);
      }
    },
  };
};

export default connect(mapStateToFetchSurveyProps)(
  fetchSurvey(
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
    )(Survey),
  ),
);
