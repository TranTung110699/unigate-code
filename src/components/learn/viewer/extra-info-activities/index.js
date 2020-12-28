/**
 * Created by vohung on 13/06/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import lodashGet from 'lodash.get';
import CommentSection from '../comment';
import { learningItemTypeViewers } from 'configs/constants';
import { t1 } from 'translate';
import Tabs from 'antd/lib/tabs';
import Icon from 'components/common/Icon';
import { getLectureContent } from '../utils';
import InfoLecture from 'components/learn/common/info-lecture/index';
import { isSmallScreen } from 'common';
import { ListAttachmentsToDownload } from 'components/common/attachment/DownloadAttachments';
import { checkLearnerCanDownloadAttachments } from 'common/conf';
import queryString from 'query-string';
import { isSurvey } from 'components/admin/node/utils';

class ExtraCourseInfoAndActivities extends React.Component {
  render() {
    const {
      typeViewer,
      course,
      learnItem,
      syllabusIid,
      replyCommentItem,
      isPreview,
    } = this.props;
    const lectureContent = getLectureContent(learnItem);

    let downloads = [];

    const attachments = lodashGet(learnItem, 'attachments');
    const downloadMaterials = lodashGet(learnItem, 'download_materials');

    if (Array.isArray(attachments) && attachments.length)
      downloads = downloads.concat(attachments);
    if (Array.isArray(downloadMaterials) && downloadMaterials.length)
      downloads = downloads.concat(downloadMaterials);

    const hasDownload =
      downloads.length > 0 && this.props.canLearnerDownloadAttachments;

    const hasComment =
      isPreview ||
      !isSurvey(learnItem) ||
      (course && (course.allow_comment || course.ntype === 'syllabus'));

    return lectureContent ? (
      <Tabs>
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <Icon icon="video-text" /> {t1('transcript')}
            </React.Fragment>
          }
          key="lecture"
        >
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <InfoLecture title={learnItem.name} content={lectureContent} />
          </div>
        </Tabs.TabPane>
      </Tabs>
    ) : null;

    return (
      <Tabs
      /*defaultActiveKey={
          replyCommentItem || !hasDownload ? 'comment' : 'download'
        }*/
      // tabBarExtraContent={
      //   <div>
      //     <Icon icon="like" antIcon />
      //     {'\t\t\t'}
      //     <Icon icon="dislike" antIcon />
      //   </div>
      // }
      >
        {/*{hasComment && (
          <Tabs.TabPane
            tab={
              <React.Fragment>
                <Icon icon="comment" /> {t1('q_&_a')}
              </React.Fragment>
            }
            key="comment"
          >
            <CommentSection
              course={course}
              isPreview={isPreview}
              learnItem={learnItem}
              syllabus={this.props.syllabus}
              syllabusIid={this.props.syllabusIid}
              doingItem={this.props.doingItem}
            />
          </Tabs.TabPane>
        )}*/}

        {lectureContent && (
          <Tabs.TabPane
            tab={
              <React.Fragment>
                <Icon icon="video-text" /> {t1('transcript')}
              </React.Fragment>
            }
            key="lecture"
          >
            <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
              <InfoLecture title={learnItem.name} content={lectureContent} />
            </div>
          </Tabs.TabPane>
        )}

        {/*
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <Icon icon="syllabus" />{' '}
              {t1(isSmallScreen ? 'description' : 'course_summary')}
            </React.Fragment>
          }
          key="course-summary"
        >
          {course &&
          course.iid &&
          courseIid !== syllabusIid &&
          typeViewer !== learningItemTypeViewers.SESSION_OFFLINE ? (
            <div>
              {course.content ? (
                <p
                  className="lead"
                  dangerouslySetInnerHTML={{ __html: course.content || '' }}
                />
              ) : (
                <p>{t1('no_course_description')}</p>
              )}
            </div>
          ) : null}
        </Tabs.TabPane>
           */}
        {/*
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <Icon icon="rate" /> {!isSmallScreen && t1('survey')}
            </React.Fragment>
          }
          key="survey"
        >
          <div className="p-t-20">
            <this.ButtonStartSurvey hideInSmallScreen />
          </div>
        </Tabs.TabPane>
           */}
      </Tabs>
    );
  }
}

const mapStateToProps = (state, props) => {
  const queryParams = queryString.parse(window.location.search);
  const replyCommentItem = lodashGet(queryParams, 'reply_comment_item');

  return {
    canLearnerDownloadAttachments: checkLearnerCanDownloadAttachments(
      lodashGet(state, 'domainInfo.conf'),
    ),
    replyCommentItem,
  };
};
export default connect(mapStateToProps)(ExtraCourseInfoAndActivities);
