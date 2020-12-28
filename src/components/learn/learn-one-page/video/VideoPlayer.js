import React from 'react';
import { connect } from 'react-redux';
import HtmlContent from 'components/common/html';
import { getMediaPlayerId } from 'components/common/media-player/common';
import VideoPlayer from 'components/common/media-player/video';
import { getTimeInSeconds } from 'common/utils/Date';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 27/04/2017
 * */
class VideoLecture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPropsVideoViewer = () => {
    const { item, vid } = this.props;
    const playerId = getMediaPlayerId(vid || (item && item.iid));
    const props = { playerId };
    let youTubeId = '';
    let vimeoId = '';
    let startTime = '';
    let endTime = '';

    if (!item) return props;

    if (item.youtube && item.youtube.id) {
      [youTubeId, startTime, endTime] = [
        item.youtube.id,
        item.youtube.st,
        item.youtube.et,
      ];
    } else if (item.vimeo && item.vimeo.id) {
      [vimeoId, startTime, endTime] = [
        item.vimeo.id,
        item.vimeo.st,
        item.vimeo.et,
      ];
    } else if (item.svid || item.vid || item.vid_gb || item.vid_us) {
      // Work with old database
      const videoId = item.svid || item.vid || item.vid_gb || item.vid_us;
      [youTubeId, startTime, endTime] = [videoId, item.st, item.et];
    } else {
      const videoId =
        item.vimeo_svid ||
        item.vimeo_vid ||
        item.vimeo_vid_gb ||
        item.vimeo_vid_us;
      [vimeoId, startTime, endTime] = [videoId, item.st, item.et];
    }
    startTime = getTimeInSeconds(startTime) || 0;
    endTime = getTimeInSeconds(endTime);

    if (youTubeId) {
      props.youTubeId = youTubeId;
    } else if (vimeoId) {
      props.vimeoId = vimeoId;
    }
    props.startTime = startTime;
    if (endTime) {
      props.endTime = endTime;
    }
    return props;
  };

  render() {
    const { item, itemNumber } = this.props;
    const propsVideoViewer = this.getPropsVideoViewer();
    return (
      <div className="ui-video-panel ">
        {item && (
          <div>
            <div className="video-name">
              {itemNumber}. {item.name}
            </div>
            <div className="center-block-panel video-container">
              <VideoPlayer
                width="100%"
                height={250}
                controls
                {...propsVideoViewer}
              />
            </div>

            <HtmlContent content={item.content} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const nodes = state.tree;
  const { itemIid } = props;
  const item = nodes[itemIid];
  return {
    item,
  };
};

export default connect(mapStateToProps)(VideoLecture);
