import React from 'react';
import { getUrl } from 'routes/links/common';

import TeachingHoursLayout from 'components/admin/report-teacher/search-teaching-hours/Layout';
import TeachingHoursOfTeachersLayout from 'components/admin/report-teacher/report-teaching-hours-of-teachers/Layout';
import ReportBySubject from 'components/admin/report-teacher/report-by-subject/Layout';
import ReportContestResult from 'components/admin/report-teacher/report-contest-result/Layout';
import StudentDetailProgress from 'components/admin/report-teacher/learn/student-detail-progress/Layout';
import OrganizationProgress from 'components/admin/report-teacher/organization-progress/Layout';
import ReportByOrganization from 'components/admin/report-teacher/report-by-organization/Layout';
import ReportByScholarship from 'components/admin/report-teacher/report-by-scholarship/Layout';
import ReportProgressMasterByAcademicCategorie from 'components/admin/report-teacher/report-progress-master-by-academic-categorie/Layout';
import ReportTeachersOfOrganization from 'components/admin/report-teacher/report-teachers-of-organization/Layout';
import ReportAverageSurveyResult from 'components/admin/report-teacher/report-average-survey-result/Layout';
import ReportProgressMasterBySkillLevel from 'components/admin/report-teacher/report-progress-master-by-skill-level/Layout';
import TeachersByFacultyLayout from 'components/admin/report-teacher/search-teachers-by-faculty/Layout';
import TeachersByCreditLayout from 'components/admin/report-teacher/search-teachers-by-credit/Layout';
import JobsToReportLayout from 'components/admin/report-teacher/jobs-to-report/Layout';
import RoomsCapacityLayout from 'components/admin/report-teacher/search-rooms-capacity/Layout';
import ScoresByFacultyLayout from 'components/admin/report-teacher/scores-by-course/faculty/Layout';
import ScoresByMajorLayout from 'components/admin/report-teacher/scores-by-course/major/Layout';
import ScoresBySemesterCreditLayout from 'components/admin/report-teacher/scores-by-semester-credit/Layout';

import CreditTransfertLayout from 'components/admin/report-teacher/credit-transfert/Layout';

import CompareOrganizations from 'components/admin/report-teacher/compare-organizations/Layout';
import CompareAcademicCategories from 'components/admin/report-teacher/compare-academic-categories/Layout';
import EnterpriseDashboard from 'components/admin/report-teacher/enterprise-dashboard/Layout';
import ProgressOfPathUser from 'components/admin/report-teacher/progress-of-path-user/Layout';

import UserLearnLayout from 'components/admin/report-teacher/search-user-learn/Layout';

import ReportDashboardLayout from 'components/admin/report-teacher/';
import StudentsForRequestStudyReport from 'components/admin/report-teacher/students-for-request-study/Layout';
import SearchReportByTP from 'components/admin/report-teacher/training-plan';

const reportUrls = [
  {
    componentId: 'UserLearnLayout',
    path: getUrl('report/user-learns'),
    component: UserLearnLayout,
    exact: true,
  },
  {
    componentId: 'ReportDashboardLayout',
    path: getUrl('report/dashboard'),
    component: ReportDashboardLayout,
    exact: true,
  },
  {
    componentId: 'TeachingHoursLayout',
    path: getUrl('report/teaching-hours'),
    component: TeachingHoursLayout,
    exact: true,
  },
  {
    componentId: 'TeachingHoursOfTeachersLayout',
    path: getUrl('report/teaching-hours-of-teachers'),
    component: TeachingHoursOfTeachersLayout,
    exact: true,
  },
  {
    componentId: 'ReportBySubject',
    path: getUrl('report/report-by-subject'),
    component: ReportBySubject,
    exact: true,
  },
  {
    componentId: 'ReportByOrganization',
    path: getUrl(
      'report/:report_type(report-by-organization|report-by-operating-capacity)',
    ),
    component: ReportByOrganization,
    exact: true,
  },
  {
    componentId: 'ReportByScholarship',
    path: getUrl('report/report-by-scholarship'),
    component: ReportByScholarship,
    exact: true,
  },
  {
    componentId: 'ReportProgressMasterByAcademicCategorie',
    path: getUrl('report/progress-master-by-academic-categorie'),
    component: ReportProgressMasterByAcademicCategorie,
    exact: true,
  },
  {
    componentId: 'ReportTeachersOfOrganization',
    path: getUrl('report/report-teachers-of-organization'),
    component: ReportTeachersOfOrganization,
    exact: true,
  },
  {
    componentId: 'reportAverageSurveyResult',
    path: getUrl('report/report-average-survey-result'),
    component: ReportAverageSurveyResult,
    exact: true,
  },
  {
    componentId: 'ReportProgressMasterBySkillLevel',
    path: getUrl('report/progress-master-by-skill-level'),
    component: ReportProgressMasterBySkillLevel,
    exact: true,
  },
  {
    componentId: 'ReportContestResult',
    path: getUrl('report/report-contest-result'),
    component: ReportContestResult,
    exact: true,
  },
  {
    componentId: 'StudentDetailProgress',
    path: getUrl('report/student-detail-progress'),
    component: StudentDetailProgress,
    exact: true,
  },
  {
    componentId: 'OrganizationProgress',
    path: getUrl('report/organization-progress'),
    component: OrganizationProgress,
    exact: true,
  },
  {
    componentId: 'TeachersByFacultyLayout',
    path: getUrl('report/teachers-by-faculty'),
    component: TeachersByFacultyLayout,
    exact: true,
  },
  {
    componentId: 'TeachersByCreditLayout',
    path: getUrl('report/teachers-by-credit'),
    component: TeachersByCreditLayout,
    exact: true,
  },
  {
    componentId: 'JobsToReportLayout',
    path: getUrl('report/jobs-to-report'),
    component: JobsToReportLayout,
    exact: true,
  },
  {
    componentId: 'RoomsCapacityLayout',
    path: getUrl('report/rooms-capacity'),
    component: RoomsCapacityLayout,
    exact: true,
  },
  {
    componentId: 'ScoresByFacultyLayout',
    path: getUrl('report/scores-by-faculty'),
    component: ScoresByFacultyLayout,
    exact: true,
  },
  {
    componentId: 'ScoresByMajorLayout',
    path: getUrl('report/scores-by-major'),
    component: ScoresByMajorLayout,
    exact: true,
  },
  {
    componentId: 'ScoresBySemesterCreditLayout',
    path: getUrl('report/scores-by-semester-credit'),
    component: ScoresBySemesterCreditLayout,
    exact: true,
  },
  {
    componentId: 'CreditTransfertLayout',
    path: getUrl('report/credit-transfert'),
    component: CreditTransfertLayout,
    exact: true,
  },
  {
    componentId: 'CompareOrganizations',
    path: getUrl('report/compare-organizations'),
    component: CompareOrganizations,
    exact: true,
  },
  {
    componentId: 'CompareAcademicCategories',
    path: getUrl('report/compare-academic-categories'),
    component: CompareAcademicCategories,
    exact: true,
  },
  {
    componentId: 'EnterpriseDashboard',
    path: getUrl('report/enterprise-dashboard'),
    component: EnterpriseDashboard,
    exact: true,
  },
  {
    componentId: 'ProgressOfPathUser',
    path: getUrl('report/progress-of-path-user'),
    component: ProgressOfPathUser,
    exact: true,
  },
  {
    componentId: 'StudentsForRequestStudyReport',
    path: getUrl('report/students-for-request-study'),
    component: StudentsForRequestStudyReport,
    exact: true,
  },
  {
    componentId: 'SearchReportByTP',
    path: getUrl('report/training-plan'),
    component: SearchReportByTP,
    exact: true,
  },
];

export default reportUrls;
