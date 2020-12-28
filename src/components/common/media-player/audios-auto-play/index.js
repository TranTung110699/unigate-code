import React from 'react';
import PropTypes from 'prop-types';
import Audios, {
  displayModes as audiosDisplayModes,
} from 'components/common/media-player/audios';

// we use the same display mode as audios element because this element is pure logic
export const displayModes = audiosDisplayModes;

// display a list of audios, auto play one after another
class AudiosAutoPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingAudio: null,
    };
  }

  componentWillMount() {
    const { isPlaying, urls } = this.props;
    if (isPlaying && Array.isArray(urls)) {
      this.setState({
        playingAudio: 0,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { urls, isPlaying } = this.props;
    if (!isPlaying && nextProps.isPlaying && Array.isArray(urls)) {
      this.setState({
        playingAudio: 0,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { playingAudio } = this.state;
    const { urls } = this.props;
    if (playingAudio !== prevState.playingAudio) {
      if (!Array.isArray(urls) || urls.length <= playingAudio) {
        this.handleEnded();
      }
    }
  }

  handleEnded = () => {
    const { onEnded } = this.props;
    if (typeof onEnded === 'function') {
      onEnded();
    }
  };

  getPlayingAudioState = (index) => ({
    playingAudio: index,
  });

  handleAudioPlay = (audioIndex) => {
    const { onAudioPlay } = this.props;
    if (typeof onAudioPlay === 'function') {
      onAudioPlay(audioIndex);
    }
  };

  handleAudioEnded = (audioIndex) => {
    const { onAudioEnded } = this.props;
    if (typeof onAudioEnded === 'function') {
      onAudioEnded(audioIndex);
    }
    this.setState(Object.assign({}, this.getPlayingAudioState(audioIndex + 1)));
  };

  render() {
    const { playingAudio } = this.state;
    const {
      urls,
      playerId,
      className,
      isPlaying,
      controllable,
      shouldUseOneAudioElement,
      displayMode,
    } = this.props;

    return (
      <Audios
        controllable={controllable}
        isPlaying={isPlaying}
        className={className}
        shouldUseOneAudioElement={shouldUseOneAudioElement}
        playerId={playerId}
        playingAudio={playingAudio}
        urls={urls}
        onAudioEnded={this.handleAudioEnded}
        onAudioPlay={this.handleAudioPlay}
        displayMode={displayMode}
      />
    );
  }
}

AudiosAutoPlay.propTypes = {
  className: PropTypes.string,
  controllable: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onEnded: PropTypes.func,
  onAudioEnded: PropTypes.func,
  onAudioPlay: PropTypes.func,
  playerId: PropTypes.string,
  shouldUseOneAudioElement: PropTypes.bool,
  urls: PropTypes.arrayOf(PropTypes.string),
  displayMode: PropTypes.string,
};

AudiosAutoPlay.defaultProps = {
  className: '',
  controllable: true,
  isPlaying: false,
  onEnded: null,
  onAudioEnded: null,
  onAudioPlay: null,
  playerId: 'audio-list',
  shouldUseOneAudioElement: false,
  urls: [],
  displayMode: displayModes.DEFAULT,
};

export default AudiosAutoPlay;
