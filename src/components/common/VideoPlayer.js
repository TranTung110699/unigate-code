import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { configs } from 'configs/constants';

class VideoPlayer extends Component {
  style = { zIndex: 1000, paddingTop: '24px' };

  render() {
    const { video, type } = this.props;
    const url =
      type === 'youtube'
        ? `${configs.YOUTUBE_URL}/watch?v=${video.id}`
        : `${configs.VIMEO_URL}/${video.id}`;

    return (
      <div style={this.style}>
        {
          <ReactPlayer
            className="learn-content"
            controls
            width="100%"
            url={url}
          />
        }
      </div>
    );
  }
}

export default VideoPlayer;
