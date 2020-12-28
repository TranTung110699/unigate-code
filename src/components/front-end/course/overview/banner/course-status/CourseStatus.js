import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors/index';
import { t1 } from 'translate/index';
import { Link } from 'react-router-dom';
import { handleInviteCourseRequest } from 'actions/learn/saga-creators';
import { isSmallScreen } from 'common/index';
import CourseProgress from 'components/front-end/course/progress/index';
import CourseScoreAndPassing from 'components/front-end/course/score-and-passing-overview';

class Overview extends Component {
  rejectCourse = (item) => {
    const { dispatch, getCourseInfo } = this.props;
    const params = { item: item.iid, act: 'reject' };

    const handleInviteCourseSuccessful = getCourseInfo;
    dispatch(handleInviteCourseRequest(params, handleInviteCourseSuccessful));
  };

  acceptCourse = (item) => {
    const { dispatch, getCourseInfo } = this.props;
    const params = { item: item.iid, act: 'accept' };

    const handleInviteCourseSuccessful = getCourseInfo;
    dispatch(handleInviteCourseRequest(params, handleInviteCourseSuccessful));
  };

  buttonStartSurvey = () => {
    const { surveyLink } = this.props;
    if (!surveyLink) {
      return null;
    }

    return (
      <Link to={surveyLink}>
        {t1(isSmallScreen ? 'rate' : 'rate_this_course')}
      </Link>
    );
  };

  getDefaultCourseStatus = (course, progress, startLink) => (
    <div>
      <CourseProgress course={course} progress={progress} thick />

      <div className="m-t-20">
        <CourseScoreAndPassing item={course} mode="overview" />
      </div>

      <div className="continue-course d-flex m-t-20">
        <Link to={startLink}>{t1('continue_course')}</Link>
        {/*{this.buttonStartSurvey()}*/}

        {/*

  buttonShowCourseScore = (course) => {
    if (!course) {
      return null;
    }
    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <Link to="#" onClick={showFull}>
            {t1('course_score')}
          </Link>
        )}
        renderFull={({ closeDialog }) => (
          <RubricScore itemIid={course.iid} itemNtype="course" />
        )}
      />
    );
  };

           */}
      </div>
    </div>
  );

  getCourseStatusElement = (course, progress, startLink) => {
    // const { themeConfig } = this.props;
    return this.getDefaultCourseStatus(course, progress, startLink);
  };

  render() {
    const { course, progress, startLink } = this.props;

    return (
      <div>{this.getCourseStatusElement(course, progress, startLink)}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeConfig: getThemeConfig(state),
    surveyLink: state.learn.surveyLink,
  };
};

export default connect(mapStateToProps)(Overview);
