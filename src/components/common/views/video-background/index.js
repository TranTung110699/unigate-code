import React from 'react';
import './stylesheet.scss';

const PropTypes = require('prop-types');

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 * */
class VideoBackGround extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { width, height, values } = this.props;
    return (
      <div
        className="ui-video-banner"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="video-panel">
          <video className="fullscreen" muted loop autoPlay>
            {values &&
              values.map((video, index) => (
                <source
                  key={`${index}-video`}
                  src={video.src}
                  type={video.type}
                />
              ))}
          </video>
        </div>
        <div
          className="text-panel"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default VideoBackGround;
