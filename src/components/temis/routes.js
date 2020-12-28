import React from 'react';
import Bdtx from './bdtx';
// import TcnnList from './tcnn';
import TcnnEdit from './assessment/edit';
import Dashboard from './Dashboard';
import EditProfile from './profile/edit';
import CompleteProfileBeforeUsing from './profile/complete-before-using';
import Evidence from './evidence';
import Report from './report';
import MyAssessments from './assessment/my-assessment/Dashboard';
import ApproveAssessment from './assessment/approve-assessment';
import AssessmentsInOrganization from './assessment/assessments-in-organization/index';
import AssessMyPeers from './assessment/peers-assessment/';
import ReportAssessments from './assessment/organization-report/Report';

// edit user profile
export const editProfile = (id) => `/temis/profile/edit/${id}`;
export const completeProfileBeforeUsing = () =>
  `/temis/profile/complete-before-using`;
export const editBdtx = (userId, surveyIid) =>
  `/temis/bdtx/${userId}/${surveyIid}`;
export const editTcnn = (userIid, rubricIid) =>
  `/temis/tcnn/edit/${userIid}/${rubricIid}`;

export const temisDashboard = () => `/temis`;

export const temisEvidence = () => `/temis/evidence`;
export const temisReports = (type) =>
  type ? `/temis/report/${type}` : `/temis/report`;
export const temisAssessments = (type) => `/temis/assessment/${type}`;

const routes = () => [
  {
    path: '/temis',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/temis/tcnn/edit/:userIid/:rubricIid',
    component: TcnnEdit,
    exact: true,
  },
  {
    path: '/temis/bdtx/:userIid/:survey_iid',
    component: Bdtx,
    exact: true,
  },
  {
    path: '/temis/profile/complete-before-using',
    component: CompleteProfileBeforeUsing,
    exact: true,
  },
  {
    path: '/temis/profile/edit/:id',
    component: EditProfile,
    exact: true,
  },
  {
    path: '/temis/evidence',
    component: Evidence,
    exact: true,
  },
  {
    path: '/temis/report',
    component: Report,
    exact: true,
  },
  {
    path: '/temis/report/:type',
    component: ReportAssessments,
    exact: true,
  },
  {
    path: temisAssessments('self'),
    component: MyAssessments,
    exact: true,
  },
  {
    path: temisAssessments('assess_assessment'),
    component: ApproveAssessment,
    exact: true,
  },
  {
    path: temisAssessments('assessments-in-organization'),
    component: AssessmentsInOrganization,
    exact: true,
  },
  {
    path: temisAssessments('peers-assessment'),
    component: AssessMyPeers,
    exact: true,
  },
];

export default routes;
