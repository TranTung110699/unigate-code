import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getMediaPlayerStatus,
  onMediaPlayerStarted,
  onMediaPlayerStoped,
} from 'components/common/media-player/common/Controller';
import { addSpeedRecognitionResult } from 'components/common/media-player/actions';

import { getWebSpeechRecognition } from 'components/common/media-player/common';
import './stylesheet.scss';

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canAutoRecognition: true };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleStartSpeedRecognition = this.handleStartSpeedRecognition.bind(
      this,
    );
    this.onResultOfSpeechRecognition = this.onResultOfSpeechRecognition.bind(
      this,
    );
    this.onErrorOfSpeechRecognition = this.onErrorOfSpeechRecognition.bind(
      this,
    );
    this.onEndOfSpeechRecognition = this.onEndOfSpeechRecognition.bind(this);
    this.handleStopSpeedRecognition = this.handleStopSpeedRecognition.bind(
      this,
    );
  }

  componentDidMount() {
    const { autoCheckRecognitionOnMount } = this.props;
    if (autoCheckRecognitionOnMount) {
      this.handleOnClick({ timestamp: new Date().getTime() });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mediaPlayerId, playerId } = nextProps;
    if (mediaPlayerId && playerId && playerId !== mediaPlayerId) {
      this.handleStopSpeedRecognition(true);
    }
  }

  handleOnClick(event) {
    const { webSpeechRecognition } = this.state;
    if (!getMediaPlayerStatus(this)) {
      setTimeout(() => {
        this.handleStartSpeedRecognition(event);
      }, 100);

      return;
    }
    this.handleStopSpeedRecognition();
  }

  handleStopSpeedRecognition(dontNotificationtoStore) {
    const { webSpeechRecognition } = this.state;
    if (webSpeechRecognition) {
      webSpeechRecognition.stop();
    }
    if (!dontNotificationtoStore) {
      onMediaPlayerStoped(this);
    }
  }

  handleStartSpeedRecognition(event) {
    const WebSpeechRecognitionClass = getWebSpeechRecognition();
    const webSpeechRecognition = new WebSpeechRecognitionClass();
    webSpeechRecognition.start();
    webSpeechRecognition.continuous = true;
    webSpeechRecognition.interimResults = true;
    webSpeechRecognition.lang = 'en-US';
    webSpeechRecognition.onresult = this.onResultOfSpeechRecognition;
    webSpeechRecognition.onerror = this.onErrorOfSpeechRecognition;
    webSpeechRecognition.onend = this.onEndOfSpeechRecognition;
    onMediaPlayerStarted(this);
    this.setState({ timestamp: event.timestamp, webSpeechRecognition });
  }

  onResultOfSpeechRecognition(event) {
    const { dispatch, onResult, playerId } = this.props;
    let result = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        result += event.results[i][0].transcript;
      }
    }
    result.toLowerCase();
    result = result.replace('commander in chief', 'commander-in-chief');

    if (onResult) {
      onResult(result);
    }
    onMediaPlayerStoped(this);
    dispatch(addSpeedRecognitionResult(playerId, result));
  }

  onErrorOfSpeechRecognition(event) {
    const { dispatch } = this.props;
    // console.log(event.error);
    onMediaPlayerStoped(this);
  }

  onEndOfSpeechRecognition(event) {
    const { dispatch } = this.props;
    onMediaPlayerStoped(this);
  }

  render() {
    const showOuter = getMediaPlayerStatus(this);
    return (
      <div className="ui-recognition-recorder">
        <div className="recorder-container" onClick={this.handleOnClick}>
          <div className={showOuter ? 'outer' : 'hidden'} />
          <div className={showOuter ? 'outer' : 'hidden'} />
          <div className="icon-microphone">
            <i className="fa fa-microphone" aria-hidden="true" />
            <div className="xpeak-icon">xpeak</div>
          </div>
        </div>
      </div>
    );
  }
}

Recorder.childContextTypes = {
  history: PropTypes.object.isRequired,
};
const isRecognizing = (state) => ({
  mediaPlayerId: state.mediaPlayer.playingId,
  isPlaying: state.mediaPlayer.status,
});

export default connect(isRecognizing)(Recorder);
