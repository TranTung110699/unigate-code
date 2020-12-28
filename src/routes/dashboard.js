import React from 'react';
import lodashGet from 'lodash.get';
import { DefinedUrlParams, getDashboardUrl } from 'routes/links/common';

import OverviewCourses from 'components/front-end/dashboard/show-by-tab/courses/overview';

import ProgressReports from 'components/front-end/dashboard/show-by-tab/reports/index';

import RegisterCourses from 'components/front-end/dashboard/ums/course-registration/subjectAllowToRegisterByFormOfTraining';
import ShowTranscriptByVinSchool from 'components/front-end/dashboard/ums/transcript/ShowTranscriptByVinSchool';

import ViewChildrenOfParentProgressLayout from 'components/front-end/dashboard/show-by-tab/ViewChildrenOfParentProgressLayout';

import CompulsoryCourses from 'components/front-end/dashboard/show-by-tab/courses/compulsory';

import InProgressCourses from 'components/front-end/dashboard/show-by-tab/courses/in-progress';

import AssignedCourses from 'components/front-end/dashboard/show-by-tab/courses/assigned';

import RejectedCourses from 'components/front-end/dashboard/show-by-tab/courses/rejected';

import CompletedCourses from 'components/front-end/dashboard/show-by-tab/courses/completed';

import FailedCourses from 'components/front-end/dashboard/show-by-tab/courses/failed';

import PublicCourses from 'components/front-end/dashboard/show-by-tab/courses/public';

import MyPaths from 'components/front-end/dashboard/show-by-tab/path/my-paths';

import MyEnrolmentPlansList from 'components/front-end/dashboard/show-by-tab/enrolment-plans';
import CoursesOfEnrolmentPlans from 'components/front-end/dashboard/show-by-tab/enrolment-plans/courses-of-enrolment-plan';

import MySkills from 'components/front-end/dashboard/show-by-tab/skill';

import OverviewDashboard from 'components/front-end/dashboard/show-by-tab/main';

import CreditSyllabusesOfSkill from 'components/front-end/dashboard/show-by-tab/skill/detail/index';

import UpcomingContests from 'components/contest/dashboard/upcoming-contests';
import TakenContests from 'components/contest/dashboard/taken-contests';

import Timetable from 'components/timetable/views/index';

import Assignment from 'components/front-end/dashboard/assignments';

import OverviewTimetable from 'components/front-end/dashboard/ums/home';

import Attendance from 'components/admin/course/mainstage/attendance/Layout';

import Notifications from 'components/front-end/notifications';

import Locations from 'components/user/locations/index';

const GroupAssignments = (props) => (
  <Assignment {...props} mode={'group-assignments'} />
);

const PersonalAssignments = (props) => (
  <Assignment {...props} mode={'personal-assignments'} />
);

const MyEnrolmentPlans = ({ match }) => {
  const enrolmentPlanIid = lodashGet(match, 'params.iid');
  if (enrolmentPlanIid) {
    return <CoursesOfEnrolmentPlans enrolmentPlanIid={enrolmentPlanIid} />;
  }

  return <MyEnrolmentPlansList />;
};

const TimetableComponent = () => (
  <Timetable this_user_only={1} place="frontend" />
);
const RegisterCoursesComponent = () => (
  <RegisterCourses fetchCondition={true} />
);

export default (rootUrl) => [
  {
    path: getDashboardUrl('home'),
    component: OverviewCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('progress-reports'),
    component: ProgressReports,
    exact: true,
  },
  {
    path: getDashboardUrl('overview-courses'),
    component: OverviewCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('compulsory-courses', null, true),
    component: CompulsoryCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('in-progress-courses', null, true),
    component: InProgressCourses,
    exact: true,
  },
  {
    // path: '/dashboard/:id(assigned-courses)',
    path: getDashboardUrl('assigned-courses', null, true),
    component: AssignedCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('rejected-courses'),
    component: RejectedCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('completed-courses'),
    component: CompletedCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('failed-courses'),
    component: FailedCourses,
    exact: true,
  },
  {
    path: getDashboardUrl(window.isGoJapan ? 'courses' : 'public-courses'),
    component: PublicCourses,
    exact: true,
  },
  {
    path: getDashboardUrl('my-paths'),
    component: MyPaths,
    exact: true,
  },
  {
    path: getDashboardUrl('locations'),
    component: Locations,
    exact: true,
  },
  {
    path: getDashboardUrl('my-enrolment-plans', undefined, true),
    component: MyEnrolmentPlans,
    exact: true,
  },
  {
    path: getDashboardUrl('my-skills'),
    component: MySkills,
    exact: true,
  },
  {
    path: getDashboardUrl('overview-dashboard'),
    component: OverviewDashboard,
    exact: true,
  },
  {
    path: `${getDashboardUrl('my-skills')}/:${
      DefinedUrlParams.SKILL_IID
    }/credit-syllabuses`,
    component: CreditSyllabusesOfSkill,
    exact: true,
  },
  {
    path: getDashboardUrl('upcoming-contests'),
    component: (props) => <UpcomingContests mode="dashboard" />,
    exact: true,
  },
  {
    path: getDashboardUrl('taken-contests'),
    component: TakenContests,
    exact: true,
  },
  {
    path: getDashboardUrl('timetable'),
    component: TimetableComponent,
    exact: true,
  },
  {
    path: getDashboardUrl('register-courses'),
    component: RegisterCoursesComponent,
    exact: true,
  },
  {
    path: getDashboardUrl('transcripts'),
    component: ShowTranscriptByVinSchool,
    exact: true,
  },
  {
    path: getDashboardUrl('assignments'),
    component: Assignment,
    exact: true,
  },
  {
    path: getDashboardUrl('group-assignments'),
    component: GroupAssignments,
    exact: true,
  },
  {
    path: getDashboardUrl('personal-assignments'),
    component: PersonalAssignments,
    exact: true,
  },
  {
    path: getDashboardUrl('overview-timetable'),
    component: OverviewTimetable,
    exact: true,
  },
  {
    path: `${getDashboardUrl('timetable')}/:${DefinedUrlParams.COURSE_IID}-:${
      DefinedUrlParams.SESION_IID
    }/attendance`,
    component: Attendance,
    exact: true,
  },
  {
    path: getDashboardUrl('notifications'),
    component: Notifications,
    exact: true,
  },
  {
    componentId: 'ViewChildrenOfParentProgressLayout',
    path: '/dashboard/child/:iid/:action',
    component: ViewChildrenOfParentProgressLayout,
  },
];
