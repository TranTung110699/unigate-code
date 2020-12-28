import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';

import PropTypes from 'prop-types';
import UserInfoOnTopLeftMenu from './leftmenu-overview/UserInfoOnTopLeftMenu';
import { getParams } from 'common';
import actions from 'actions/creators';
import { getThemeConfig } from 'utils/selectors';
import { userMajorStatus } from 'configs/constants';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import SubLeftMenuContext from 'common/context/menu/SubMenuLeft';

// import getEditingItemSelector from 'components/admin/syllabus/edit/selectors/edit-item';
import withNodeEditContainer from 'components/admin/node/edit/withNodeEditContainer';
import { formatUserData } from 'components/admin/node/schema/format';
import Loading from 'components/common/loading';
import EditAvatar from 'components/admin/node/edit/EditAvatar';
import Form from 'components/admin/user/new/Form';
import OverviewCourses from 'components/front-end/dashboard/show-by-tab/courses/overview';
import InProgressCourses from 'components/front-end/dashboard/show-by-tab/courses/in-progress';
import AssignedCourses from 'components/front-end/dashboard/show-by-tab/courses/assigned';
import CompulsoryCourses from 'components/front-end/dashboard/show-by-tab/courses/compulsory';
import CompletedCourses from 'components/front-end/dashboard/show-by-tab/courses/completed';
import FailedCourses from 'components/front-end/dashboard/show-by-tab/courses/failed';
import PublicCourses from 'components/front-end/dashboard/show-by-tab/courses/public';
import RejectedCourses from 'components/front-end/dashboard/show-by-tab/courses/rejected/index';
import Other from 'components/admin/user/user-in-school/edit/other/index';
// import MySkills from 'components/front-end/dashboard/show-by-tab/skill';
import UserGoals from 'components/admin/user_goals';
import UserGoal from 'components/admin/user_goal';
import MyPaths from 'components/front-end/dashboard/show-by-tab/path/my-paths/index';
import MyEnrolmentPlans from 'components/front-end/dashboard/show-by-tab/enrolment-plans';
import UserMajor from 'components/admin/user_major/search/Layout';

import UpcomingContests from 'components/contest/dashboard/upcoming-contests';
import TakenContests from 'components/contest/dashboard/taken-contests/index';

import TeacherRoles from 'components/admin/user/user-in-school/view/teacher/teacher-roles/Layout';

import MySkills from './skills-progress-by-credit-syllabuses';
import UnlockPath from './unlock-path';
import ViewUserDashboard from '../view/';
import AddContractLayout from '../../teacher-search/edit/contract/new/Layout';
import AddTeachingExperienceLayout from '../../teacher-search/edit/teaching-experience/new/Layout';
import TeachingExperiencesLayout from '../../teacher-search/edit/teaching-experience/search/Layout';
import EditAcademicRankInfo from '../../new/Layout';
import RoleEditor from '../../../user-abac-role/role-editor/Form';
import { menuItems } from './sub-left-menu-configs';
import UserFeedback from './feedback';
import ReportAttendance from './report-attendance/Layout';
import InfoV2 from './info/InfoV2';
import teachingInformation from './teaching-information';
import LearningProgress from './learning-progress';
import Paper from 'components/common/paper';
import Title from 'schema-form/field-set/Title';
import AccountAndStaffStatus from './status';
import ResetPassword from 'components/admin/user/user-in-school/edit/reset-password';
import Widget from 'components/common/Widget';
import styled from 'styled-components';

const UserInfoTopLeft = styled.div`
  @media screen and (min-width: 991px) {
    position: sticky;
    top: 70px;
  }
`;

class EditUserContainer extends Component {
  /*
  //Remove set title edit user
  componentWillReceiveProps(nextProps) {
    const { node } = nextProps;
    if (
      node &&
      node.iid > 0 &&
      node.iid !== (this.props.node && this.props.node.iid)
    ) {
      this.setLayoutSegments(node);
    }
  }

  setLayoutSegments = (node) => {
    const label = `${node.name} - ${node.code || node.iid}`;

    // const elementTitle = <TopNavigate items={items} />;
    this.props.dispatch(actions.setTopMenuElement({ siteTitle: label }));
  };

  componentDidMount() {
    this.setLayoutSegments(this.props.node);
  }
  */
  getContentByAction = (action, user, node, roleUser, isHashbang) => {
    const domainInfo = this.props.domainInfo || {};
    const schoolType = domainInfo.school && domainInfo.school.type;
    // const schoolType = Store.getState().domainInfo.school.type;
    const formattedUser = formatUserData(user);

    let contentDisplay;
    switch (action) {
      case 'info': {
        contentDisplay = (
          <InfoV2
            roleUser={roleUser}
            user={user}
            formattedUser={formattedUser}
            schoolType={schoolType}
            domainInfo={domainInfo}
          />
        );
        break;
      }
      case 'teaching-information': {
        if (roleUser === 'teacher') {
          contentDisplay = teachingInformation({ user });
          break;
        }
      }
      /*
      case 'high-school-records': {
        return (
          <Form
            key={action}
            mode="edit"
            node={formattedUser}
            alternativeApi="/user/update"
            formid="edit_school_info"
            title={user.name}
            step="school_info"
          />
        );
      }
      case 'contact': {
        return (
          <Form
            key={action}
            mode="edit"
            node={formattedUser}
            alternativeApi="/user/update"
            formid="edit_contact"
            title={user.name}
            step="contact"
          />
        );
      }
      */

      case 'admission-status': {
        contentDisplay = (
          <Form
            key={action}
            mode="edit"
            node={formattedUser}
            alternativeApi="/user/update"
            formid="edit_admission_status"
            title={user.name}
            step="admission_status"
          />
        );
        break;
      }
      case 'edit': {
        if (schoolType === 'sis')
          contentDisplay = (
            <Form
              key={action}
              teacher={formattedUser}
              formid={'edit_academic_info'}
              mode={'edit'}
              step={'academic_info'}
            />
          );
        else
          contentDisplay = (
            <InfoV2
              roleUser={roleUser}
              user={user}
              formattedUser={formattedUser}
              schoolType={schoolType}
              domainInfo={domainInfo}
            />
          );

        break;
      }
      case 'majors': {
        if (schoolType === 'sis') {
          const hiddenFields = {
            user_iid: formattedUser && formattedUser.iid,
            status: Object.values(userMajorStatus),
          };
          contentDisplay = (
            <div>
              <UserMajor
                formid={`user_major_search_${formattedUser &&
                  formattedUser.iid}`}
                hiddenFields={hiddenFields}
                autoSearchWhenStart
                hidePagination
                hiddenQueryField
              />
            </div>
          );
        }
        break;
      }
      case 'view': {
        contentDisplay = (
          <ViewUserDashboard user={formattedUser} roleUser={roleUser} />
        );
        break;
      }
      case 'avatar': {
        contentDisplay = <EditAvatar node={{ ...user, ntype: 'user' }} />;
        break;
      }
      case 'change-password': {
        contentDisplay = (
          <div className="col-md-6">
            <Widget title={t1('reset_user_password')}>
              {/*<h1>{t1('reset_user_password')}</h1>*/}
              <ResetPassword node={user} action={action} />
            </Widget>
          </div>
        );
        break;
      }
      case 'change-ldap-username': {
        contentDisplay = (
          <Form
            key={action}
            mode="edit"
            node={user}
            alternativeApi="/user/update"
            formid="edit_change_ad_username"
            title={user.name}
            step="change_ad_username"
          />
        );
        break;
      }
      case 'status': {
        contentDisplay = <AccountAndStaffStatus node={user} />;
        break;
      }
      case 'unlock-path': {
        contentDisplay = <UnlockPath node={user} />;
        break;
      }
      case 'overview-courses': {
        contentDisplay = (
          <OverviewCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'in-progress-courses': {
        contentDisplay = (
          <InProgressCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'assigned-courses': {
        contentDisplay = (
          <AssignedCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'compulsory-courses': {
        contentDisplay = (
          <CompulsoryCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'completed-courses': {
        contentDisplay = (
          <CompletedCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'failed-courses': {
        contentDisplay = (
          <FailedCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'rejected-courses': {
        contentDisplay = (
          <RejectedCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'public-courses': {
        contentDisplay = (
          <PublicCourses node={user} viewUserIid={user && user.iid} />
        );
        break;
      }
      case 'other': {
        contentDisplay = <Other node={user} />;
        break;
      }
      case 'user-goal': {
        contentDisplay = <UserGoals node={user} />;
        break;
      }
      case 'my-skills': {
        contentDisplay = (
          <MySkills
            node={user}
            userInfo={user}
            rootUrl="admin"
            display="view-only"
          />
        );
        break;
      }
      case 'my-paths': {
        contentDisplay = (
          <MyPaths node={user} rootUrl="admin" display="view-only" />
        );
        break;
      }
      case 'my-enrolment-plans': {
        contentDisplay = <MyEnrolmentPlans user={user} viewOnly />;
        break;
      }
      case 'add-contract': {
        contentDisplay = (
          <AddContractLayout
            teacher={user}
            isSimpleContract={false}
            formid="add-contract"
          />
        );
        break;
      }
      case 'add-simple-contract': {
        contentDisplay = (
          <AddContractLayout
            teacher={user}
            isSimpleContract
            formid="add-simple-contract"
          />
        );
        break;
      }
      // case 'contracts': {
      //   contentDisplay =  <ManageContractsLayout teacher={user} />;
      //   break;
      // }
      case 'add-teaching-experience': {
        contentDisplay = <AddTeachingExperienceLayout teacher={user} />;
        break;
      }
      case 'teaching-experiences': {
        contentDisplay = <TeachingExperiencesLayout teacher={user} />;
        break;
      }
      case 'academic-rank-info': {
        contentDisplay = (
          <EditAcademicRankInfo
            teacher={user}
            formid={'edit_academic_rank_info'}
            mode={'edit'}
            step={'academic_rank_info'}
          />
        );
        break;
      }
      case 'change-roles': {
        contentDisplay = (
          <Form
            key={action}
            mode="edit"
            node={user}
            alternativeApi="/user/update"
            formid="edit_assign_roles"
            step="assign_roles"
          />
        );
        break;
      }
      case 'change-school-roles': {
        contentDisplay = (
          <RoleEditor
            searchFormId="edit_assign_school_roles"
            type={'school'}
            user={user}
          />
        );
        break;
      }
      case 'teacher-roles': {
        contentDisplay = <TeacherRoles node={user} />;
        break;
      }
      case 'contests': {
        contentDisplay = (
          <div>
            {/*<h1>{t1('student_tests_and_exams')}</h1>*/}
            <div className="m-b-10">
              <Paper className="p-10">
                <Title title={t1('contests')} className={'text-transform'} />
                <div>
                  <UpcomingContests
                    userIid={user.iid}
                    noTitle
                    noButton
                    mode="admin_view"
                  />
                </div>
              </Paper>
            </div>
            <div>
              <Paper className="p-10 m-t-10">
                <Title
                  title={t1('taken_contests')}
                  className={'text-transform'}
                />
                <div>
                  <TakenContests user={user} noTitle />
                </div>
              </Paper>
            </div>
          </div>
        );
        break;
      }
      case 'taken-contests': {
        contentDisplay = <TakenContests user={user} />;
        break;
      }
      case 'upcoming-contests': {
        contentDisplay = <UpcomingContests userIid={user.iid} />;
        break;
      }
      case 'learning-progress': {
        contentDisplay = (
          <LearningProgress node={user} display="view-only" {...this.props} />
        );
        break;
      }
      case 'feedback': {
        contentDisplay = (
          <div>
            <h1>{t1('feedbacks_on_student')}</h1>
            <UserFeedback node={formattedUser} />
          </div>
        );
        break;
      }
      case 'report-attendance': {
        contentDisplay = (
          <div>
            <h1>{t1('student_attendance_report')}</h1>
            <ReportAttendance user={user} />
          </div>
        );
        break;
      }
      default: {
        if (node && node.ntype === 'userGoal') {
          contentDisplay = <UserGoal user={user} node={node} />;
        } else {
          contentDisplay = (
            <ViewUserDashboard user={formattedUser} roleUser={roleUser} />
          );
        }
        break;
      }
    }

    if (action === 'avatar' || isHashbang) return contentDisplay;

    const UserInfoTopLeft = styled.div`
      @media screen and (min-width: 991px) {
        position: sticky;
        top: 70px;
      }
    `;

    // full screen mode
    return (
      <div className="container-fluid">
        <div className="row">
          <UserInfoTopLeft className="col-md-3 p-r-0 p-l-0">
            <UserInfoOnTopLeftMenu user={node} roleUser={roleUser} />
          </UserInfoTopLeft>
          <div className="col-md-9">{contentDisplay}</div>
        </div>
      </div>
    );
  };

  render() {
    const { action, node, roleUser, isHashbang } = this.props;

    if (!node) return <Loading />;

    // const user = ancestors.length > 1 ? ancestors[0] : node;
    const user = node;
    return [
      !this.props.isHashbang && [
        <SubTopMenuContext
          lastBreadcrumbName={node.name || node.lname}
          isSmallSize
        />,
        <SubLeftMenuContext node={node} schema={menuItems(this.props)} />,
      ],
      this.getContentByAction(action, user, node, roleUser, isHashbang),
    ];
  }
}

EditUserContainer.propTypes = {
  action: PropTypes.string,
  node: PropTypes.shape(),
};

EditUserContainer.defaultProps = {
  action: '',
  dispatch: () => {},
  node: null,
  itemAncestors: [],
};

const mapStateToProps = (state, props) => {
  const params = getParams(props);

  return {
    // ...getEditingItemSelector(state),
    roleUser: (params && params.type) || 'user',
    domainInfo: state.domainInfo,
    themeConfig: getThemeConfig(state),
  };
};

export default withNodeEditContainer(
  connect(mapStateToProps)(EditUserContainer),
);
