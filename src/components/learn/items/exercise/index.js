import React from 'react';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { initExercise as initExerciseAction } from 'actions/learn/exercise/normal/saga-creators';
import {
  buildExerciseStructureFromExerciseSelector,
  modes,
  types,
} from 'common/learn/exercise';
import { getLearnItemInfoSelector } from 'common/learn';
import get from 'lodash.get';
import NormalExercise from './NormalExercise';
import RolePlay from './RolePlay';
import Dictation from './Dictation';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 10/05/2017
 * */
class ExerciseItem extends React.Component {
  componentWillMount() {
    const { onComponentWillMount } = this.props;
    if (typeof onComponentWillMount === 'function') {
      onComponentWillMount();
    }
  }

  render() {
    const { exercise, learnItemIid, courseIid, onFinish } = this.props;

    if (get(exercise, 'type') === 'dictation') {
      return <Dictation courseIid={courseIid} exerciseIid={exercise.iid} />;
    }

    return (
      exercise &&
      ((exercise.speaking_type === 'roleplay' && (
        <RolePlay courseIid={courseIid} exerciseIid={exercise.iid} />
      )) || (
        <NormalExercise
          learnItemIid={learnItemIid}
          courseIid={courseIid}
          onFinish={onFinish}
          displayMaxHeight={Infinity}
        />
      ))
    );
  }
}

const getQuestionUniqueId = (question) => question && question.iid;

const mapStateToProps = (state) => {
  const exerciseIid = state.learn.itemIid;
  const learnItemIid = exerciseIid;
  const parentIid = state.learn.parentIid;
  const exercise = getNodeSelector(state)(exerciseIid, parentIid) || {};
  let learnInfo = getLearnItemInfoSelector(state)(learnItemIid);
  const isPreview = state.learn.isPreview;
  const isReview = state.learn.isReview;

  const shouldInitExercise =
    exercise && exercise.speaking_type !== 'roleplay' && !learnInfo;

  if (shouldInitExercise) {
    learnInfo = {
      type: types.EXERCISE,
      id: exercise.id,
      iid: exercise.iid,
      name: exercise.name,
      description: exercise.description,
      duration: exercise.duration,
      options: exercise.options,
      exam_type: exercise.ntype,
      mode: isPreview ? modes.PREVIEW : isReview ? modes.REVIEW : modes.NORMAL,
      passing_scheme: exercise.passing_scheme,
      max_number_of_questions_per_try: exercise.max_number_of_questions_per_try,
    };

    const builtStructure = buildExerciseStructureFromExerciseSelector(state)(
      exercise.iid,
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
    exercise,
    learnInfo,
    shouldInitExercise,
    learnItemIid,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initExercise: (itemIid, info) => {
    dispatch(initExerciseAction(itemIid, info));
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const { learnInfo, shouldInitExercise, learnItemIid } = stateProps;
  const { initExercise } = dispatchProps;

  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    onComponentWillMount() {
      if (shouldInitExercise) {
        initExercise(learnItemIid, learnInfo);
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ExerciseItem);
