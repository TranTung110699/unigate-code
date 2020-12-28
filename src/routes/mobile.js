import React from 'react';
import { DefinedUrlParams } from 'routes/links/common';
import { Layout } from 'layouts/LayoutHelper';

import TeacherSchedule from 'components/front-end/dashboard/ums/teacher-schedule/index';
import Event from 'components/front-end/dashboard/ums/event/index';
import AttendanceManage from 'components/admin/course/mainstage/attendance/Layout';
import Assignments from 'components/front-end/dashboard/assignments';
import SignIn from 'components/user/auth/login/Login';
import SignUp from 'components/user/auth/register/Register';
import Dashboard from 'components/mobile/dashboard/index';
import ForgotPassword from 'components/user/forgot-password/Container';
import UpdateUser from 'components/user/update/Layout';
import SignInForWebview from 'components/mobile/sign-in-for-webview/index';
import SignOutForWebview from 'components/mobile/sign-out-for-webview/index';
import StudentSchedule from 'components/front-end/dashboard/ums/home/index';
import CourseRegister from 'components/front-end/dashboard/ums/course-registration/index';
import Attendance from 'components/front-end/dashboard/ums/attendance/index';

export default (rootUrl) => [
  {
    componentId: 'MobileIndex',
    path: `${rootUrl}*`,
    component: () => <Layout layoutId="mobile" />,
    exact: true,
  },
  {
    componentId: 'MobileDashboard',
    path: `${rootUrl}`,
    component: () => <Dashboard />,
    exact: true,
  },
  {
    componentId: 'MobileTeacherSchedule',
    path: `${rootUrl}/teacher-schedule`,
    component: TeacherSchedule,
    exact: true,
  },
  {
    componentId: 'MobileStudentSchedule',
    path: `${rootUrl}/student-schedule`,
    component: StudentSchedule,
    exact: true,
  },
  {
    componentId: 'MobileEvent',
    path: `${rootUrl}/event`,
    component: Event,
    exact: true,
  },
  {
    componentId: 'MobileAttendanceSession',
    path: `${rootUrl}/:${DefinedUrlParams.NTYPE}/:${
      DefinedUrlParams.COURSE_IID
    }-:${DefinedUrlParams.SESION_IID}/:${DefinedUrlParams.SUB_TYPE}`,
    component: AttendanceManage,
    exact: true,
  },
  {
    componentId: 'MobileAssignments',
    path: `${rootUrl}/assignments`,
    component: Assignments,
    exact: true,
  },
  {
    componentId: 'MobileSignIn',
    path: `${rootUrl}/sign-in`,
    component: SignIn,
    exact: true,
  },
  {
    componentId: 'MobileCourseRegister',
    path: `${rootUrl}/course-register`,
    component: CourseRegister,
    exact: true,
  },
  {
    componentId: 'MobileSignUp',
    path: `${rootUrl}/sign-up`,
    component: SignUp,
    exact: true,
  },
  {
    componentId: 'MobileForgotPassword',
    path: `${rootUrl}/forgot-password`,
    component: ForgotPassword,
    exact: true,
  },
  {
    componentId: 'MobileAttendance',
    path: `${rootUrl}/attendance`,
    component: Attendance,
    exact: true,
  },
  {
    componentId: 'MobileProfile',
    path: `${rootUrl}/profile`,
    component: () => <UpdateUser updateType="info" />,
    exact: true,
  },
  {
    componentId: 'MobileSignInForWebview',
    path: `${rootUrl}/sign-in-mobile-for-webview/:lname/:pass`,
    component: () => <SignInForWebview />,
    exact: true,
  },
  {
    componentId: 'MobileSignOutForWebview',
    path: `${rootUrl}/sign-out-mobile-for-webview`,
    component: () => <SignOutForWebview />,
    exact: true,
  },
];
