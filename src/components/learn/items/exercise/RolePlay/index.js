import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sagaActions from 'actions/saga-creators';
import { getNodeSelector } from 'components/admin/node/utils';
import RolePlayIntro from './intro';
import RolePlayMain from './main';
import RolePlayFinish from './finish';
import './stylelsheet.scss';

const RolePlayStage = {
  INTRO: 'intro',
  ROLE_PLAY: 'role-play',
  FINISH: 'finish',
};

export class RolePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: RolePlayStage.ROLE_PLAY,
      score: null,
    };
  }

  handleIntroStartButtonClick = () => {
    this.setState({
      stage: RolePlayStage.ROLE_PLAY,
    });
  };

  handleRolePlayingFinish = (score) => {
    const { onResult, isPreview } = this.props;
    this.setState(
      {
        // stage: RolePlayStage.FINISH,
        score,
      },
      () => {
        if (onResult && !isPreview) {
          onResult(score);
        }
      },
    );
  };

  handleFinishRedoButtonClick = () => {
    this.setState({
      stage: RolePlayStage.ROLE_PLAY,
      score: null,
    });
  };

  isVocabValid = (vocab) => vocab && vocab.name && vocab.player;

  getRolePlayDataFromVocabset = (vocabset) => {
    const rolePlayData =
      (vocabset &&
        vocabset.children &&
        Array.isArray(vocabset.children) &&
        vocabset.children.map((vocab) => {
          const isValid = this.isVocabValid(vocab);
          const speaker =
            vocab.speaker && typeof vocab.speaker === 'object'
              ? vocab.speaker
              : vocab.u;
          return isValid
            ? {
                u: speaker,
                vocab,
              }
            : null;
        })) ||
      [];

    return rolePlayData.every((data) => data) ? rolePlayData : [];
  };

  getRolePlayDataFromExercise = (exercise) => {
    const rolePlayData =
      (exercise &&
        exercise.children &&
        Array.isArray(exercise.children) &&
        exercise.children.map((vocabSets) => {
          const vocab =
            vocabSets.children &&
            Array.isArray(vocabSets.children) &&
            vocabSets.children[0];
          const isValid = this.isVocabValid(vocab);
          const speaker =
            vocabSets.speaker && typeof vocabSets.speaker === 'object'
              ? vocabSets.speaker
              : vocabSets.u;
          return isValid
            ? {
                u: speaker,
                vocab,
              }
            : null;
        })) ||
      [];

    return rolePlayData.every((data) => data) ? rolePlayData : [];
  };

  render() {
    const { stage, score } = this.state;
    const { fullData, exerciseIid } = this.props;
    const rolePlayData = exerciseIid
      ? this.getRolePlayDataFromExercise(fullData)
      : this.getRolePlayDataFromVocabset(fullData);
    if (rolePlayData.length === 0) {
      return null;
    }

    const id = fullData.id;

    return (
      <div className="role-play-exercise">
        {stage === RolePlayStage.INTRO && (
          <RolePlayIntro
            onStartButtonClick={this.handleIntroStartButtonClick}
            description={fullData.description}
          />
        )}
        {stage === RolePlayStage.ROLE_PLAY && (
          <RolePlayMain
            onRolePlayingFinish={this.handleRolePlayingFinish}
            rolePlayData={rolePlayData}
            id={id}
          />
        )}
        {stage === RolePlayStage.FINISH && (
          <RolePlayFinish
            score={score}
            onRedoButtonClick={this.handleFinishRedoButtonClick}
          />
        )}
      </div>
    );
  }
}

RolePlay.propTypes = {
  fullData: PropTypes.shape(),
  exerciseIid: PropTypes.string,
  onResult: PropTypes.func,
};

RolePlay.defaultProps = {
  fullData: null,
  exerciseIid: null,
  onResult: () => {},
};

const mapStateToProps = (state, props) => {
  const { exerciseIid, vocabsetIid } = props;
  const fullData =
    getNodeSelector(state)(exerciseIid || vocabsetIid, null, -1) || {};

  return {
    isPreview: state.learn.isPreview,
    fullData,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onResult(score) {
    const { exerciseIid, vocabsetIid, courseIid } = props;
    let p = {
      tco_iid: exerciseIid,
      p7: score,
    };
    if (vocabsetIid) {
      p = {
        tco_iid: exerciseIid,
        p: score,
      };
    }
    const data = {
      progress: [p],
      ciid: courseIid,
    };
    dispatch(sagaActions.trackerProgressSave(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RolePlay);
