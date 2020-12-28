import React, { Component } from 'react';
import CourseSummary from 'components/front-end/course/summary/index';
import lodashGet from 'lodash.get';
import TopBanner from './banner/index';
import ContentLayout from '../outline/index';
import SessionsList from '../session/List';
import ButtonFlat from 'components/front-end/common/button-flat';
import { t1 } from 'translate/index';
import '../stylesheet.scss';
import Links from 'routes/links';
import { getThemeConfig } from 'utils/selectors';
import { connect } from 'react-redux';
import { layouts } from 'configs/constants';
import { Redirect } from 'react-router-dom';

class CourseOverview extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      course,
      courseIid,
      syllabusIid,
      rootPathIid,
      isPreview,
      navId,
      themeConfig,
    } = this.props;

    const link = Links.LearnCourseByPath(course, navId, {
      pathIid: rootPathIid,
      isPreview,
    });

    if (themeConfig.layout === layouts.GJ && link && link !== 'error') {
      return <Redirect to={link} />;
    }

    return (
      <div>
        <div className="container course-outline-wrapper">
          <TopBanner {...this.props} />

          <h2>{t1('course_outline')}</h2>
          <ContentLayout {...this.props} />

          {lodashGet(course, 'counter.sessions') ? (
            <div className="m-t-30">
              <h2>{t1('offline_sessions')}</h2>
              <SessionsList {...this.props} />
            </div>
          ) : null}

          {course && course.iid && courseIid !== syllabusIid && (
            <div className="m-t-30">
              <CourseSummary course={course} />
            </div>
          )}

          <div className="m-t-20 m-b-30 text-center">
            <ButtonFlat to="/dashboard" label={t1('discover_other_courses')} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(CourseOverview);
