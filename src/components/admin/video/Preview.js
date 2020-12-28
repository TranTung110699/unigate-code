import React, { Component } from 'react';
import LectureItem from 'components/learn/items/lecture';

class VideoPreview extends Component {
  render() {
    const { node } = this.props;

    return (
      <div>
        <h1>
          {node.name} - {node.type}
        </h1>
        <LectureItem id={node.name} lecture={node} disableScrollbarMode />
      </div>
    );
  }
}

export default VideoPreview;
