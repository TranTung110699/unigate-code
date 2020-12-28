import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Audio, {
  displayModes as audioDisplayModes,
} from 'components/common/media-player/audio';
import {
  playerStart,
  playerStop,
} from 'components/common/media-player/actions';
import './stylesheet.scss';

export const displayModes = {
  DEFAULT: 'audios_display_default',
  MINIMALISTIC: 'audios_display_minimalistic',
};

class Audios extends React.Component {
  componentWillMount() {
    const { isPlaying, urls, dispatch, playerId } = this.props;
    if (isPlaying && Array.isArray(urls)) {
      dispatch(playerStart(playerId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { urls, isPlaying, dispatch, playerId } = this.props;
    if (!isPlaying && nextProps.isPlaying && Array.isArray(urls)) {
      dispatch(playerStart(playerId));
    }
    if (isPlaying !== nextProps.isPlaying) {
      if (nextProps.isPlaying) {
        dispatch(playerStart(playerId));
      } else {
        dispatch(playerStop(playerId));
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { playingAudio, isPlaying, dispatch, playerId } = this.props;
    if (playingAudio !== prevProps.playingAudio) {
      if (isPlaying) {
        dispatch(playerStart(playerId));
      }
    }
  }

  cssClass = 'media-audios';

  handleAudioPlay = (audioIndex) => {
    const { onAudioPlay } = this.props;
    if (onAudioPlay && typeof onAudioPlay === 'function') {
      onAudioPlay(audioIndex);
    }
  };

  handleAudioEnded = (audioIndex) => {
    const { onAudioEnded } = this.props;
    if (onAudioEnded && typeof onAudioEnded === 'function') {
      onAudioEnded(audioIndex);
    }
  };

  handleAudioPause = (audioIndex) => {
    const { onAudioPause } = this.props;
    if (onAudioPause && typeof onAudioPause === 'function') {
      onAudioPause(audioIndex);
    }
  };

  getAudioDisplayMode = () => {
    const { displayMode } = this.props;
    switch (displayMode) {
      case displayModes.MINIMALISTIC:
        return audioDisplayModes.MINIMALISTIC;
      case displayModes.DEFAULT:
      default:
        return audioDisplayModes.DEFAULT;
    }
  };

  render() {
    const {
      urls,
      playingAudio,
      shouldUseOneAudioElement,
      playerId,
      className,
      controllable,
    } = this.props;

    if (!Array.isArray(urls)) {
      return null;
    }

    const audioDisplayMode = this.getAudioDisplayMode();

    if (shouldUseOneAudioElement) {
      const url = urls[playingAudio];
      return (
        <div className={`${className || ''} ${this.cssClass}`}>
          {url && (
            <Audio
              displayMode={audioDisplayMode}
              controllable={controllable}
              className={`${this.cssClass}__audio`}
              playerId={playerId}
              onEnded={() => this.handleAudioEnded(playingAudio)}
              onPlay={() => this.handleAudioPlay(playingAudio)}
              onPause={() => this.handleAudioPause(playingAudio)}
              src={url}
            />
          )}
        </div>
      );
    }

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        {urls.map((src, index) => (
          <Audio
            displayMode={audioDisplayMode}
            controllable={controllable}
            key={`${playerId}--${index}`}
            className={`${this.cssClass}__audio`}
            playerId={
              index === playingAudio ? playerId : `${playerId}--${index}`
            }
            onEnded={() => this.handleAudioEnded(index)}
            onPlay={() => this.handleAudioPlay(index)}
            onPause={() => this.handleAudioPause(index)}
            src={src}
          />
        ))}
      </div>
    );
  }
}

Audios.propTypes = {
  className: PropTypes.string,
  controllable: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  onAudioEnded: PropTypes.func,
  onAudioPause: PropTypes.func,
  onAudioPlay: PropTypes.func,
  playerId: PropTypes.string,
  playingAudio: PropTypes.number,
  shouldUseOneAudioElement: PropTypes.bool,
  urls: PropTypes.arrayOf(PropTypes.string),
  displayMode: PropTypes.string,
};

Audios.defaultProps = {
  className: '',
  controllable: true,
  isPlaying: false,
  onAudioEnded: () => {},
  onAudioPause: () => {},
  onAudioPlay: () => {},
  playerId: null,
  playingAudio: null,
  shouldUseOneAudioElement: true,
  urls: [],
  displayMode: displayModes.DEFAULT,
};

export default connect()(Audios);
