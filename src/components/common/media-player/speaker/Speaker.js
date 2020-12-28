import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import {
  getMediaPlayerStatus,
  onMediaPlayerStarted,
  onMediaPlayerStoped,
} from 'components/common/media-player/common/Controller';

import './stylesheet.scss';

class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAudio: true };
    this.handlePlayAudio = this.handlePlayAudio.bind(this);
    this.handleStopAudio = this.handleStopAudio.bind(this);
    this.handleAudioButtonOnClick = this.handleAudioButtonOnClick.bind(this);
    this.onAudioEnded = this.onAudioEnded.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { mediaPlayerId, playerId } = nextProps;
    if (mediaPlayerId && playerId && playerId !== mediaPlayerId) {
      this.handleStopAudio(true);
    }
    if (this.props.url !== nextProps.url) {
      const { url, text } = nextProps;
      this.initAudioPlayer(url, text);
    }
  }

  componentDidMount() {
    const { url, text } = this.props;
    this.initAudioPlayer(url, text);
  }

  initAudioPlayer = (url, text) => {
    if (!url && !text) {
      return;
    }
    if (url) {
      let audioUrl = url;
      if (!audioUrl.startsWith('http') && !audioUrl.startsWith('https')) {
        audioUrl = `${window.APP_AUDIO_MEDIA_SERVER_URL}/${url}`;
      }

      this.setState({
        audioPlayer: new Audio(audioUrl),
        isAudio: true,
      });
    } else {
      this.setState({
        playText: text,
        isAudio: false,
      });
    }
  };

  handlePlayAudio() {
    const { url, text } = this.props;
    const { isAudio, audioPlayer, playText } = this.state;
    if (isAudio && audioPlayer) {
      const audioPlayPromise = audioPlayer.play();
      audioPlayPromise
        .then(() => {
          audioPlayer.onended = this.onAudioEnded;
          audioPlayer.onerror = this.onAudioEnded;
          onMediaPlayerStarted(this);
        })
        .catch(() => {
          alert(`${t1('sorry')} !... ${t1('the_audio_file_does_not_exist')}!`);
        });
    }
    if (
      !isAudio &&
      playText &&
      window.speechSynthesis &&
      SpeechSynthesisUtterance
    ) {
      window.speechSynthesis.cancel();
      const speechSynthesisUtterance = new SpeechSynthesisUtterance(playText);
      const audioPlayer = window.speechSynthesis.speak(
        speechSynthesisUtterance,
      );
      window.speechSynthesis.speak(speechSynthesisUtterance);
      speechSynthesisUtterance.onend = this.onAudioEnded;
      onMediaPlayerStarted(this);
    }
  }

  /**
   * auto call to onEnd to dispatch
   */
  handleStopAudio(notNotifyToStore) {
    const { isAudio, audioPlayer, speechSynthesisUtterance } = this.state;
    try {
      if (isAudio && audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        if (!notNotifyToStore) {
          onMediaPlayerStoped(this);
        }
      }
      if (!isAudio && speechSynthesisUtterance && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        if (!notNotifyToStore) {
          onMediaPlayerStoped(this);
        }
      }
    } catch (exception) {}
  }

  onAudioEnded() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    onMediaPlayerStoped(this);
  }

  handleAudioButtonOnClick() {
    const isPlaying = getMediaPlayerStatus(this);

    if (isPlaying) {
      this.handleStopAudio();
    } else {
      this.handlePlayAudio();
    }
  }

  render() {
    let { className } = this.props;
    let { iconClass } = this.props;
    const isPlaying = getMediaPlayerStatus(this);
    className = className ? `${className} ui-speaker ` : 'ui-speaker';
    iconClass = iconClass || '';
    return (
      <div className={className} onClick={this.handleAudioButtonOnClick}>
        <i
          className={
            !isPlaying
              ? `mi mi-volume-up ${iconClass}`
              : `mi mi-pause ${iconClass}`
          }
          aria-hidden="true"
        />
      </div>
    );
  }
}

const SelectPlaying = (state) => ({
  mediaPlayerId: state.mediaPlayer.playingId,
  isPlaying: state.mediaPlayer.status,
});

export default connect(SelectPlaying)(Speaker);
