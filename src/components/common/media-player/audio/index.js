import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  onMediaPlayerStarted,
  onMediaPlayerStoped,
} from 'components/common/media-player/common/Controller';
import Control from 'components/common/media-player/common/display/control';
import AudioMinimalisticControl from '../common/display/audio-minimalistic-control';

export const displayModes = {
  DEFAULT: 'audio_display_default',
  MINIMALISTIC: 'audio_display_minimalistic',
};

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      bufferedTime: 0,
      isStarted: false,
    };
  }

  componentDidMount() {
    const { isPlaying, playAudioDelayTime } = this.props;
    if (isPlaying) {
      this.startAudio();
    } else if (playAudioDelayTime && typeof playAudioDelayTime === 'number') {
      setTimeout(() => this.startAudio(), playAudioDelayTime);
    }
  }

  componentDidUpdate(prevProps) {
    const { src, isPlaying } = this.props;
    if (src !== prevProps.src && isPlaying) {
      this.startAudio();
    }
    if (isPlaying !== prevProps.isPlaying) {
      if (isPlaying) {
        this.startAudio();
      } else {
        this.pauseAudio();
      }
    }
  }

  cssClass = 'media-audio';

  startAudio() {
    const audio = this.audio;
    if (audio) {
      audio.play();
    }
  }

  pauseAudio() {
    const audio = this.audio;
    if (audio) {
      audio.pause();
    }
  }

  handlePlay = () => {
    onMediaPlayerStarted(this);

    const { onPlay, onStart } = this.props;
    if (onPlay && typeof onPlay === 'function') {
      onPlay();
    }

    const { isStarted } = this.state;
    if (!isStarted) {
      this.setState(
        {
          isStarted: true,
        },
        () => {
          if (typeof onStart === 'function') {
            onStart();
          }
        },
      );
    }
  };

  handlePause = () => {
    onMediaPlayerStoped(this);

    const { onPause } = this.props;
    if (onPause && typeof onPause === 'function') {
      onPause();
    }
  };

  handleEnded = () => {
    onMediaPlayerStoped(this);

    const { onEnded } = this.props;
    if (onEnded && typeof onEnded === 'function') {
      onEnded();
    }
  };

  handlePlayButtonClick = () => {
    if (this.state.isPlaying) {
      this.pauseAudio();
    } else {
      this.startAudio();
    }
  };

  handleLoadedMetadata = () => {
    const audio = this.audio;
    const { onDuration } = this.props;
    const duration = audio.duration;
    this.setState(
      {
        duration,
      },
      () => {
        if (typeof onDuration === 'function') {
          onDuration(duration);
        }
      },
    );
  };

  handleTimeUpdate = () => {
    const audio = this.audio;
    const currentTime = audio.currentTime;
    const { onProgress } = this.props;

    const buffered = audio.buffered;
    let bufferedTime = 0;
    for (let i = 0; i < buffered.length; i += 1) {
      const end = buffered.end(i);
      if (end >= currentTime) {
        bufferedTime = end;
        break;
      }
    }

    this.setState(
      {
        currentTime,
        bufferedTime,
      },
      () => {
        if (typeof onProgress === 'function') {
          onProgress({ playedSeconds: currentTime });
        }
      },
    );
  };

  handleTrackingBarPositionChange = (newPosition) => {
    const audio = this.audio;
    if (audio) {
      audio.currentTime = newPosition;
    }
  };

  getControlComponent = () => {
    const { displayMode, ControlComponent } = this.props;

    if (ControlComponent) {
      return ControlComponent;
    }

    switch (displayMode) {
      case displayModes.MINIMALISTIC:
        return AudioMinimalisticControl;
      case displayModes.DEFAULT:
      default:
        return Control;
    }
  };

  render() {
    const { src, className, controllable, style } = this.props;
    const { currentTime, duration, bufferedTime, isPlaying } = this.state;

    const ControlComponent = this.getControlComponent();

    return (
      <>
        <ControlComponent
          style={style}
          isPlaying={isPlaying}
          className={className}
          disabled={!controllable}
          onPlayButtonClick={controllable ? this.handlePlayButtonClick : null}
          onChangeTrackingPosition={
            controllable ? this.handleTrackingBarPositionChange : null
          }
          currentTime={currentTime}
          duration={duration}
          bufferedTime={bufferedTime}
        />
        <audio
          onLoadedMetadata={this.handleLoadedMetadata}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleEnded}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          ref={(audio) => {
            this.audio = audio;
          }}
          src={src}
        />
      </>
    );
  }
}

Audio.propTypes = {
  className: PropTypes.string,
  controllable: PropTypes.bool,
  dispatch: PropTypes.func,
  isPlaying: PropTypes.bool,
  onDuration: PropTypes.func,
  onEnded: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onProgress: PropTypes.func,
  onStart: PropTypes.func,
  playerId: PropTypes.string,
  src: PropTypes.string,
  ControlComponent: PropTypes.elementType,
  displayMode: PropTypes.string,
};

Audio.defaultProps = {
  className: '',
  controllable: true,
  dispatch: () => {},
  isPlaying: false,
  onDuration: () => {},
  onEnded: () => {},
  onPause: () => {},
  onPlay: () => {},
  onProgress: () => {},
  onStart: () => {},
  playerId: null,
  src: null,
  ControlComponent: null,
  displayMode: displayModes.DEFAULT,
};

const mapStateToProps = (state, props) => {
  const mediaPlayerId = state.mediaPlayer.playingId;
  const mediaPlayIsPlaying = state.mediaPlayer.status;
  const playerId = props.playerId;

  const isPlaying = playerId === mediaPlayerId && mediaPlayIsPlaying;

  return {
    isPlaying,
  };
};

export default connect(mapStateToProps)(Audio);
