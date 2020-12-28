import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors/index';
import Helmet from 'react-helmet';
import sagaActions from 'actions/saga-creators';
import Links from 'routes/links/index';
import CourseStatus from './course-status/CourseStatus';

import CourseTitle from 'components/learn/viewer/course-title/index';
import { isScormSyllabus } from 'components/admin/scorm/scorm';
import { t1 } from 'translate/index';
import UserOverview from './UserOverview';

import '../../stylesheet.scss';
import DefaultLearningMaterialAvatar from 'common/images/default-learning-material-avatar.png';

class TopBanner extends Component {
  componentDidMount() {
    const { courseIid, isPreview } = this.props;
    if (!isPreview) {
      this.fetchProgress(courseIid);
    }
  }

  fetchProgress = (iid) => {
    const { dispatch, viewUserIid } = this.props;

    const data = {
      tcos: iid,
      children: 1,
      depth: 1,
    };

    if (viewUserIid) {
      data.userIid = viewUserIid;
    }

    dispatch(sagaActions.trackerProgressGet(data));
  };

  render() {
    const {
      course,
      syllabus,
      rootPathIid,
      isPreview,
      navId,
      themeConfig,
      isReview,
      viewUserIid,
    } = this.props;
    let progress = this.props.progress || {};
    progress = progress.cp || 0;
    let startLink = '';
    let titleHelmet = '';
    if (course && course.iid) {
      startLink = Links.LearnCourseByPath(course, navId, {
        pathIid: rootPathIid,
        isPreview,
      });
      titleHelmet = course.name;
    }

    return (
      <div className="course-overview-wrapper">
        <Helmet title={titleHelmet} />
        {!!viewUserIid && (
          <div className="m-b-50">
            <UserOverview iid={viewUserIid} />
            <hr />
          </div>
        )}

        {course && (
          <div className="row m-b-40 m-t-30">
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12 mb-xs-24">
              <CourseTitle
                session={this.props.session}
                course={course}
                deadline={this.props.deadline}
                isPreview={isPreview}
                isReview={isReview}
                {...this.props}
              />
              <p
                className="course-overview-content"
                dangerouslySetInnerHTML={{ __html: course.overview }}
              />
              <CourseStatus
                {...this.props}
                progress={progress}
                startLink={startLink}
              />
              {isScormSyllabus(syllabus) && (
                <span className="text-muted">
                  {t1('this_course_is_a_scorm')}
                </span>
              )}
            </div>
            <div className="col-md-5 col-lg-5 col-xs-12 col-sm-12 chapter-list pull-right">
              <img
                width="100%"
                className="lazyloaded"
                alt={course.name}
                src={
                  course && course.avatar
                    ? course.avatar
                    : DefaultLearningMaterialAvatar
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { courseIid } = state.learn;
  return {
    progress: state.trackerProgress[courseIid],
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(TopBanner);
