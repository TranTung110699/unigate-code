import React, { Component } from 'react';
import VideoPlayer from 'components/common/media-player/video';

class IntroVideo extends Component {
  render() {
    const { videoId, videoPlayerId, introVideoId } = this.props;
    return (
      <VideoPlayer
        className="video-container"
        key={introVideoId}
        width="100%"
        height="100%"
        playerId={introVideoId}
        controls
        vimeoId={`${introVideoId}`}
        autoPlay
      />
    );
  }
}

IntroVideo.propTypes = {};

export default IntroVideo;
