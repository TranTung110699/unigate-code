import React from 'react';
import PropTypes from 'prop-types';
import NormalExercise from 'components/learn/items/exercise/NormalExercise';
import { connect } from 'react-redux';
import { getNodeSelector } from 'components/admin/node/utils';
import { initExercise as initExerciseAction } from 'actions/learn/exercise/normal/saga-creators';
import {
  buildExerciseStructureFromExerciseSelector,
  modes,
  types,
} from 'common/learn/exercise';
import { t1 } from 'translate';
import './stylesheet.scss';

class LearnOnePageNormalExercise extends React.Component {
  componentWillMount() {
    const { onComponentWillMount } = this.props;
    if (typeof onComponentWillMount === 'function') {
      onComponentWillMount();
    }
  }

  cssClass = 'learn-one-page-normal-exercise';

  render() {
    const { exerciseIid } = this.props;
    return (
      <div className={this.cssClass}>
        <div className="title-block">{t1('exercise')}</div>
        <NormalExercise
          displayMaxHeight={Infinity}
          ref={(input) => {
            this.node = input;
          }}
          learnItemIid={exerciseIid}
          courseIid={exerciseIid}
          shouldFeedbackInstantly
          shouldShowQuestionHelpText={false}
          shouldShowControlQuestions={false}
        />
      </div>
    );
  }
}

LearnOnePageNormalExercise.propTypes = {
  exerciseIid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

LearnOnePageNormalExercise.defaultProps = {
  exerciseIid: null,
};

const getQuestionUniqueId = (question) => question && question.iid;

const mapStateToProps = (state, props) => {
  const { exerciseIid } = props;
  const exercise = getNodeSelector(state)(exerciseIid) || {};

  let exerciseInfo = {
    type: types.EXERCISE,
    id: exercise.id,
    iid: exercise.iid,
    name: exercise.name,
    description: exercise.description,
    exam_type: exercise.ntype,
    duration: exercise.duration,
    mode: modes.NORMAL,
  };

  const builtStructure = buildExerciseStructureFromExerciseSelector(state)(
    exercise.iid,
    getQuestionUniqueId,
    exerciseInfo,
  );

  if (builtStructure) {
    exerciseInfo = {
      ...exerciseInfo,
      ...builtStructure,
    };
  }

  return {
    exerciseIid,
    exerciseInfo,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initExercise: (itemIid, info) => {
    dispatch(initExerciseAction(itemIid, info));
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const { exerciseIid, exerciseInfo } = stateProps;
  const { initExercise } = dispatchProps;

  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    onComponentWillMount() {
      initExercise(exerciseIid, exerciseInfo);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(LearnOnePageNormalExercise);
