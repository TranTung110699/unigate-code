import React from 'react';
import { connect } from 'react-redux';
import { t1, t4 } from 'translate';
import lodashGet from 'lodash.get';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import courseApiUrls from 'components/admin/course/endpoints';
import nodeSagaActions from 'actions/node/saga-creators';
import { downloadCertificate } from 'components/front-end/course/utils';
import sagaActions from 'actions/saga-creators';
import FeedbackUser from 'components/admin/feedback';
import actions from 'actions/node/creators';
import './NormalExerciseResult.scss';
import { commentTypes } from 'configs/constants/comment';

class CompleteCourse extends React.Component {
  componentWillMount() {
    this.getCourseInfo();
  }

  getCourseInfo = () => {
    const { dispatch, courseIid } = this.props;

    const courseConfig = {
      url: apiUrls.get_course_api,
      keyState: `completed-course-${courseIid}`,
    };

    const courseParams = {
      ciid: courseIid,
    };

    dispatch(nodeSagaActions.getDataRequest(courseConfig, courseParams));
  };

  rateCourse = () => {
    const { dispatch, course, userInfo } = this.props;

    const hiddenFields = {
      object: {
        iid: course && course.iid,
        id: course && course.id,
        ntype: 'course',
      },
      target: {
        id: userInfo && userInfo.id,
        iid: userInfo && userInfo.iid,
        name: userInfo && userInfo.name,
        avatar: userInfo && userInfo.avatar,
      },
      type: commentTypes.FEEDBACK_USER_FOR_COURSE,
    };

    const feedback = userInfo && userInfo.feedback;
    const node = {
      result__rating: feedback && feedback.rating,
      result__content: feedback && feedback.content,
    };

    const contentDialog = (
      <FeedbackUser
        node={node}
        hiddenFields={hiddenFields}
        requestSuccessful={() => {
          this.fetchSessions();
        }}
        searchFormId="session_search_user"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('feedback'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { course, courseIid, className } = this.props;

    return (
      <div className={`test-result-wrapper ${className}`}>
        <div className="quiz-content text-center finish-course">
          <Icon icon="result" className="icon" />
          <h3>{t1('congratulations_on_completing_your_course')}</h3>
          {course && course.p > 0 && (
            <p>{t1('your_progress_is_%s', [course.p])}%</p>
          )}
          {course && course.p > 0 && course.p >= course.percent_complete && (
            <p>
              {t1('you_can_download_course_certificate')}{' '}
              <a
                className="download-certificate"
                onClick={() => {
                  downloadCertificate(
                    courseIid,
                    lodashGet(this.props, 'userInfo.iid'),
                    this.props.dispatch,
                  );
                }}
              >
                {t4('here')}
              </a>
            </p>
          )}
          {/* 0 && course && course.allow_feedback ? (
            <RaisedButton
              primary
              label={t1('rate_and_feedback_this_course!')}
              onClick={this.rateCourse}
            />
          ) : (
            ''
          ) */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  userInfo: state.user.info,
  positionOfCurrentItem: state.learn.positionOfCurrentItem,
  course: state.dataApiResults[`completed-course-${props.courseIid}`],
});

export default connect(mapStateToProps)(CompleteCourse);
