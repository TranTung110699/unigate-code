import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'components/common/media-player/video';
import AudiosAutoPlay, {
  displayModes as audiosAutoPlayDisplayModes,
} from 'components/common/media-player/audios-auto-play';
import Audio, {
  displayModes as audioDisplayModes,
} from 'components/common/media-player/audio';
import DisplayHtml from 'components/common/html';
import { types } from 'components/admin/question/schema/question-types';
import { getQuestionAudios } from 'common/learn/Question';
import { questionDisplayTemplates } from 'configs/constants';
import './QuestionContent.scss';

export const questionContentAudioDisplayModes = {
  MINIMALISTIC: 'question_content_audio_display_minimalistic',
  DEFAULT: 'question_content_audio_display_default',
};

const getAudioDisplayMode = (questionContentAudioDisplayMode) => {
  switch (questionContentAudioDisplayMode) {
    case questionContentAudioDisplayModes.MINIMALISTIC:
      return audioDisplayModes.MINIMALISTIC;
    case questionContentAudioDisplayModes.DEFAULT:
    default:
      return audioDisplayModes.DEFAULT;
  }
};

const getAudiosAutoPlayDisplayMode = (questionContentAudioDisplayMode) => {
  switch (questionContentAudioDisplayMode) {
    case questionContentAudioDisplayModes.MINIMALISTIC:
      return audiosAutoPlayDisplayModes.MINIMALISTIC;
    case questionContentAudioDisplayModes.DEFAULT:
    default:
      return audiosAutoPlayDisplayModes.DEFAULT;
  }
};

const ControllableAudio = ({
  className,
  question,
  onAudioPlay,
  onAudioEnded,
  isAudioControllable,
  questionContentAudioDisplayMode,
}) => {
  const audios = getQuestionAudios(question);
  if (audios.length > 0) {
    if (question && typeof question.audiosReplacement !== 'undefined') {
      if (question.audiosReplacement) {
        return (
          <h3 className="question-content-audio-replacement">
            {question.audiosReplacement}
          </h3>
        );
      }
      return null;
    }
    return (
      <div
        className={`${className || ''}\
            question-content-audio-controllable`}
      >
        {audios.map((src, index) => {
          const controllable =
            typeof isAudioControllable === 'function' &&
            isAudioControllable(index);
          return (
            <Audio
              displayMode={getAudioDisplayMode(questionContentAudioDisplayMode)}
              controllable={controllable}
              className="question-content-audio-controllable__audio"
              key={`${question.iid}-audio-${index}`}
              playerId={`${question.iid}-audio-${index}`}
              onPlay={
                typeof onAudioPlay === 'function'
                  ? () => onAudioPlay(index)
                  : null
              }
              onEnded={
                typeof onAudioEnded === 'function'
                  ? () => onAudioEnded(index)
                  : null
              }
              src={src}
              playAudioDelayTime={1000}
            />
          );
        })}
      </div>
    );
  }
  return null;
};

const UncontrollableAudio = ({
  className,
  question,
  isAudiosPlaying,
  onAudiosEnded,
  questionContentAudioDisplayMode,
}) => {
  const audios = getQuestionAudios(question);
  if (audios.length > 0) {
    if (question && typeof question.audiosReplacement !== 'undefined') {
      if (question.audiosReplacement) {
        return (
          <h3 className="question-content-audio-replacement">
            {question.audiosReplacement}
          </h3>
        );
      }
      return null;
    }
    return (
      <AudiosAutoPlay
        controllable={false}
        key={`${question.iid}-audio`}
        playerId={`${question.iid}-audio`}
        urls={audios}
        isPlaying={isAudiosPlaying}
        onEnded={onAudiosEnded}
        className={`${className || ''}\
            question-content-audio-uncontrollable`}
        displayMode={getAudiosAutoPlayDisplayMode(
          questionContentAudioDisplayMode,
        )}
      />
    );
  }
  return null;
};

const QuestionAudio = ({
  className,
  question,
  isAudiosControllable,
  isAudiosPlaying,
  onAudiosEnded,
  onAudioPlay,
  onAudioEnded,
  isAudioControllable,
  questionContentAudioDisplayMode,
}) => {
  if (isAudiosControllable) {
    return (
      <ControllableAudio
        className={className}
        question={question}
        onAudioPlay={onAudioPlay}
        onAudioEnded={onAudioEnded}
        isAudioControllable={isAudioControllable}
        questionContentAudioDisplayMode={questionContentAudioDisplayMode}
      />
    );
  }
  return (
    <UncontrollableAudio
      className={className}
      question={question}
      isAudiosPlaying={isAudiosPlaying}
      onAudiosEnded={onAudiosEnded}
      questionContentAudioDisplayMode={questionContentAudioDisplayMode}
    />
  );
};

const QuestionVideo = ({ className, question }) =>
  question.vid ? (
    <VideoPlayer
      playerId={`${question.iid}-video`}
      controls
      youTubeId={question.vid}
      width="70%"
      className={className}
    />
  ) : null;

const QuestionImage = ({ className, question }) =>
  question.avatar ? (
    <img src={question.avatar} alt="" className={className} />
  ) : null;

export const QuestionContentText = ({ className, question }) => {
  return question.type !== types.TYPE_INLINE ? (
    <DisplayHtml content={question.content} className={className} />
  ) : null;
};

class QuestionContent extends React.Component {
  componentDidMount() {
    const { question, onAudiosEnded, isAudiosPlaying } = this.props;
    if (isAudiosPlaying && !this.hasAudio(question)) {
      if (typeof onAudiosEnded === 'function') {
        onAudiosEnded();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { question, onAudiosEnded } = this.props;
    if (
      !prevProps.isAudiosPlaying &&
      this.props.isAudiosPlaying &&
      !this.hasAudio(question)
    ) {
      if (typeof onAudiosEnded === 'function') {
        onAudiosEnded();
      }
    }
  }

  hasAudio = (question) => question && (question.audio || question.vid);

  render() {
    const question = this.props.question || {};
    const {
      isAudiosPlaying,
      isAudiosControllable,
      onAudiosEnded,
      onAudioPlay,
      onAudioEnded,
      isAudioControllable,
      displayTemplate,
      questionContentAudioDisplayMode,
      hideQuestionContentText,
    } = this.props;

    return (
      <div className="question-content">
        <QuestionVideo
          className={'question-content__video'}
          question={question}
        />
        <QuestionAudio
          className="question-content__audio"
          question={question}
          isAudiosControllable={isAudiosControllable}
          isAudiosPlaying={isAudiosPlaying}
          onAudiosEnded={onAudiosEnded}
          onAudioPlay={onAudioPlay}
          onAudioEnded={onAudioEnded}
          isAudioControllable={isAudioControllable}
          questionContentAudioDisplayMode={questionContentAudioDisplayMode}
        />
        <QuestionImage
          className={'question-content__image'}
          question={question}
        />
        {hideQuestionContentText ||
        displayTemplate ===
          questionDisplayTemplates.CONTENT_DISPLAYED_INSIDE_HEADER ? null : (
          <QuestionContentText
            className={'question-content__text'}
            question={question}
          />
        )}
      </div>
    );
  }
}

QuestionContent.propTypes = {
  isAudioControllable: PropTypes.func,
  isAudiosControllable: PropTypes.bool,
  isAudiosPlaying: PropTypes.bool,
  onAudioEnded: PropTypes.func,
  onAudioPlay: PropTypes.func,
  onAudiosEnded: PropTypes.func,
  question: PropTypes.shape(),
  hideQuestionContentText: PropTypes.bool,
};

QuestionContent.defaultProps = {
  isAudioControllable: () => true,
  isAudiosControllable: true,
  isAudiosPlaying: false,
  onAudioEnded: null,
  onAudioPlay: null,
  onAudiosEnded: null,
  question: null,
  hideQuestionContentText: false,
};

export default QuestionContent;
