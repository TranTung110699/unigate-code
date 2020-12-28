import React from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/saga-creators';
import { Scrollbars } from 'react-custom-scrollbars';
import videoTypes from 'components/admin/video/schema/videoTypes';
import DisplayHtml from 'components/common/html';
import Loading from 'components/common/loading';
import { getNodeSelector } from 'components/admin/node/utils';
import UnderstoodButton from 'components/learn/common/UnderstoodButton';
import MediaLecture from './media-lecture';
import Pdf from './pdf';
import Ppt from './Ppt';
import Image from './Image';
import Swf from './Swf';

import './stylesheet.scss';

class LectureItem extends React.Component {
  componentDidMount() {
    const { lecture, learnItemIid } = this.props;
    if (
      [
        videoTypes.TYPE_SWF,
        videoTypes.TYPE_IMAGE,
        videoTypes.TYPE_TEXT,
      ].includes(lecture.type)
    ) {
      this.saveLearningProgress([
        {
          tco_iid: learnItemIid,
          p: 100,
        },
      ]);
    }
  }

  saveLearningProgress = (progress = []) => {
    const { courseIid, dispatch, isPreview, isReview } = this.props;
    if (isPreview || isReview) {
      return;
    }
    const data = {
      progress,
      ciid: courseIid,
    };
    dispatch(sagaActions.trackerProgressSave(data));
  };

  getContent(lecture, props, renderLectureItem) {
    return (
      <div className="learn-lecture">
        {renderLectureItem(lecture, props, 'learn-lecture__main')}
        {lecture.content &&
          lecture.type !== videoTypes.TYPE_VIDEO &&
          lecture.type !== videoTypes.TYPE_SWF &&
          lecture.type !== videoTypes.TYPE_PDF && (
            <div className="learn-lecture__content">
              <DisplayHtml content={lecture.content} />
            </div>
          )}
        {/* { */}
        {/* this.getButtons(lecture, 'learn-lecture__buttons') */}
        {/* } */}
      </div>
    );
  }

  renderLectureItem = (lecture, props, className) => {
    switch (lecture.type) {
      case videoTypes.TYPE_AUDIO: {
        return (
          <MediaLecture
            className={`${className} learn-content-border`}
            type="audio"
            {...props}
            saveLearningProgress={this.saveLearningProgress}
          />
        );
      }
      case videoTypes.TYPE_VIDEO: {
        return (
          <MediaLecture
            className={`${className} learn-content-border`}
            type="video"
            {...props}
            saveLearningProgress={this.saveLearningProgress}
          />
        );
      }
      case videoTypes.TYPE_IMAGE: {
        return (
          <Image className={`${className} learn-content-border`} {...props} />
        );
      }
      case videoTypes.TYPE_PPT: {
        return (
          <Ppt
            className={`${className} learn-content-border`}
            {...props}
            saveLearningProgress={this.saveLearningProgress}
          />
        );
      }
      case videoTypes.TYPE_PDF: {
        return (
          <Pdf
            className={className}
            {...props}
            saveLearningProgress={this.saveLearningProgress}
            notShowFullscreenButton
          />
        );
      }
      case videoTypes.TYPE_SWF: {
        return <Swf className={className} {...props} />;
      }
      default:
        return <div />;
    }
  };

  getButtons = (lecture, className) => {
    if (
      lecture &&
      [videoTypes.TYPE_IMAGE, videoTypes.TYPE_TEXT].includes(lecture.type)
    ) {
      const { progress } = this.props;
      const passed = progress && progress.pf;
      const { learnItemIid, courseIid, isPreview, isReview } = this.props;

      return (
        <UnderstoodButton
          passed={passed}
          learnItemIid={learnItemIid}
          courseIid={courseIid}
          isPreview={isPreview}
          isReview={isReview}
        />
      );
    }
    return null;
  };

  render() {
    const { disableScrollbarMode } = this.props;
    let { lecture } = this.props;

    if (!lecture) {
      return <Loading />;
    }

    if (!lecture.type) {
      lecture = Object.assign({}, lecture, { type: videoTypes.TYPE_VIDEO });
    }

    const props = {
      ...this.props,
      node: lecture,
    };

    if (
      disableScrollbarMode ||
      lecture.type === videoTypes.TYPE_PDF ||
      lecture.type === videoTypes.TYPE_VIDEO
    ) {
      return (
        <div
          className="learn-lecture-wrapper"
          style={{ height: 'unset !important' }}
        >
          {this.getContent(lecture, props, this.renderLectureItem)}
        </div>
      );
    }

    return (
      <React.Fragment>
        <div
          className="learn-lecture-wrapper learn-content-border"
          style={{ height: 'calc(100vh - 300px)' }}
        >
          <Scrollbars
            className="nav-scroll"
            style={{ minHeight: '450px', position: 'relative' }}
          >
            {this.getContent(lecture, props, this.renderLectureItem)}
          </Scrollbars>
        </div>
        {this.getButtons(lecture, 'learn-lecture__buttons')}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const lecture = props.lecture;
  if (lecture) {
    return { lecture };
  }
  const learnItemIid = state.learn.itemIid;
  const parentIid = state.learn.parentIid;
  const progress = state.trackerProgress && state.trackerProgress[learnItemIid];

  return {
    learnItemIid,
    progress,
    lecture: getNodeSelector(state)(learnItemIid, parentIid) || {},
    isPreview: state.learn.isPreview,
    isReview: state.learn.isReview,
  };
};

export default connect(mapStateToProps)(LectureItem);
