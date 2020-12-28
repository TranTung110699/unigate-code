import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import './stylesheet.scss';
import OverviewCourses from 'components/front-end/dashboard/show-by-tab/courses/overview';
import InProgressCourses from 'components/front-end/dashboard/show-by-tab/courses/in-progress';
import AssignedCourses from 'components/front-end/dashboard/show-by-tab/courses/assigned';
import CompulsoryCourses from 'components/front-end/dashboard/show-by-tab/courses/compulsory';
import CompletedCourses from 'components/front-end/dashboard/show-by-tab/courses/completed';
import FailedCourses from 'components/front-end/dashboard/show-by-tab/courses/failed';
import PublicCourses from 'components/front-end/dashboard/show-by-tab/courses/public';
import RejectedCourses from 'components/front-end/dashboard/show-by-tab/courses/rejected/index';
import Other from 'components/admin/user/user-in-school/edit/other/index';
import UserGoals from 'components/admin/user_goals';
import MyEnrolmentPlans from 'components/front-end/dashboard/show-by-tab/enrolment-plans';
import UpcomingContests from 'components/contest/dashboard/upcoming-contests';
import TakenContests from 'components/contest/dashboard/taken-contests/Results';
import ReportAttendance from 'components/admin/user/user-in-school/edit/report-attendance/Layout';
import OverviewTimetable from 'components/front-end/dashboard/ums/home';
import Timetable from 'components/timetable/views';
import Assignment from 'components/front-end/dashboard/assignments';
import Feedback from 'components/admin/user/user-in-school/edit/feedback';
import apiUrls from 'api-endpoints';
import Avatar from 'components/common/avatar';
import { t1 } from 'translate';
import ShowTranscriptByVinSchool from 'components/front-end/dashboard/ums/transcript/ShowTranscriptByVinSchool';
import sagaActions from 'actions/node/saga-creators';
import lGet from 'lodash.get';

class ViewChildrenOfParentProgressLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { openMenu: false };
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
    this.getUserDetail();
  }

  getUserDetail = () => {
    const { dispatch, userIid } = this.props;
    const url = apiUrls.get_detail({ iid: userIid }, 'user');

    const params = {
      iid: userIid,
    };

    dispatch(
      sagaActions.getDataRequest({ url, keyState: 'user_detail' }, params),
    );
  };

  getContentByAction = (action, user, userIid) => {
    switch (action) {
      case 'overview-courses': {
        return <OverviewCourses node={user} display="view-only" />;
      }
      case 'overview-timetable': {
        return <OverviewTimetable userIid={userIid} display="view-only" />;
      }
      case 'timetable': {
        return <Timetable userIid={userIid} />;
      }
      case 'assignments': {
        return <Assignment userIid={userIid} display="view-only" />;
      }
      case 'in-progress-courses': {
        return <InProgressCourses node={user} display="view-only" />;
      }
      case 'assigned-courses': {
        return <AssignedCourses node={user} display="view-only" />;
      }
      case 'compulsory-courses': {
        return <CompulsoryCourses node={user} display="view-only" />;
      }
      case 'completed-courses': {
        return <CompletedCourses node={user} display="view-only" />;
      }
      case 'failed-courses': {
        return <FailedCourses node={user} display="view-only" />;
      }
      case 'rejected-courses': {
        return <RejectedCourses node={user} display="view-only" />;
      }
      case 'public-courses': {
        return <PublicCourses node={user} display="view-only" />;
      }
      case 'other': {
        return <Other node={user} />;
      }
      case 'user-goal': {
        return <UserGoals node={user} />;
      }
      case 'my-enrolment-plans': {
        return <MyEnrolmentPlans user={user} viewOnly />;
      }
      case 'upcoming-contests': {
        return <UpcomingContests mode="admin-edit-user" />;
      }
      case 'taken-contests': {
        return <TakenContests />;
      }
      case 'report-attendance': {
        return <ReportAttendance user={user} />;
      }
      case 'feedback': {
        return <Feedback key={user && user.iid} node={user} />;
      }
      case 'transcript': {
        return (
          <ShowTranscriptByVinSchool
            key={user && user.iid}
            user_iid={user && user.iid}
          />
        );
      }

      default:
        return <div />;
    }
  };

  render() {
    const { action, userDetail, userIid } = this.props;
    return (
      <div className="ggg-dashboard-wrapper">
        <div className="container">
          <div className="row">
            {/* <Breadcrumbs action={action} /> */}
            <h1>
              <Avatar user={userDetail} />
              &nbsp;
              {userDetail.name}
            </h1>
            <div className="dashboard-show-by-tab-wrapper m-t-25">
              <h3>{t1(action)}</h3>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 content">
                {this.getContentByAction(action, userDetail, userIid)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userDetail = state.dataApiResults.user_detail || [];
  let action = lGet(props, 'match.params.action');
  if (!action) {
    action = 'in-progress-courses';
  }
  return {
    userIid: lGet(props, 'match.params.iid'),
    action: action,
    userDetail: userDetail,
  };
};

export default connect(mapStateToProps)(ViewChildrenOfParentProgressLayout);
