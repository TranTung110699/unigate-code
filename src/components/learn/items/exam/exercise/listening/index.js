import React from 'react';
import PropTypes from 'prop-types';
import AudioList from 'components/common/media-player/audios-auto-play';
import { getQuestionAudios } from 'common/learn/Question';

class ExerciseExamListening extends React.Component {
  cssClass = 'exercise-exam-listening';

  render() {
    const {
      className,
      currentQuestion,
      onQuestionAudioPlay,
      onQuestionAudioEnded,
    } = this.props;
    const audios = getQuestionAudios(currentQuestion);
    if (audios.length > 0) {
      return (
        <AudioList
          shouldUseOneAudioElement
          onAudioPlay={onQuestionAudioPlay}
          onAudioEnded={onQuestionAudioEnded}
          className={`${className || ''} ${this.cssClass}`}
          controllable={false}
          key={`${currentQuestion.iid}-audio`}
          playerId={`${currentQuestion.iid}-audio`}
          urls={audios}
          isPlaying
        />
      );
    }
    return null;
  }
}

ExerciseExamListening.propTypes = {
  className: PropTypes.string,
  currentQuestion: PropTypes.shape(),
  onQuestionAudioEnded: PropTypes.func,
  onQuestionAudioPlay: PropTypes.func,
};

ExerciseExamListening.defaultProps = {
  className: '',
  currentQuestion: PropTypes.shape(),
  onQuestionAudioEnded: null,
  onQuestionAudioPlay: null,
};

export default ExerciseExamListening;
