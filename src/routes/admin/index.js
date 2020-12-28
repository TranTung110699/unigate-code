// import Admin from 'components/admin/';
import React from 'react';
import { DefinedUrlParams, getUrl } from 'routes/links/common';
import { categoryTypeMapping } from 'configs/constants';
import SettingsRoutes from './settings';
import schoolStudent from './school-student';
import reportRoutes from './report';
import RequestSearchRequest from 'components/admin/req/search';
import ProcessingRequests from 'components/admin/req/search';
import SyllabusLayout from 'components/admin/syllabus/search/Layout';

import CourseSearch from 'components/admin/course/search/Layout';

import OfflineExamSearch from 'components/admin/offline-exam';

import StudentsInOfflineExamSearch from 'components/admin/offline-exam/search-students';

import AssignedCourses from 'components/admin/user/teacher-search/assigned-courses';

import CourseNew from 'components/admin/course/new/Layout';
import Ico from 'components/admin/ico/search/Layout';

import BudgetaryAllocations from 'components/admin/budgetary-allocations/Layout';
import Criteria from 'components/admin/budgetary-allocations/report/criteria/Layout';

import Semester from 'components/admin/semester/search/Layout';
import SkillLayout from 'components/admin/skill/skill/search/Layout';
import RelationLayout from 'components/admin/skill/relation/search/Layout';

import PathLayout from 'components/admin/path';

import ProgramLayout from 'components/admin/program/search/Layout';

import VenueLayout from 'components/admin/venue/search/Layout';
import NewVenueLayout from 'components/admin/venue/new/Layout';
import EditVenueLayout from 'components/admin/venue/edit/Layout';

import ProvinceLayout from 'components/admin/pds/pd/search/Layout';
import SchoolLayout from 'components/admin/pds/school/search/Layout';
import PageLayout from 'components/admin/cms/page/search/Layout';

import UpdatePageLayout from 'components/admin/cms/page/edit/Layout';
import AddPageLayout from 'components/admin/cms/page/new/Layout';
import BlogLayout from 'components/admin/cms/blog-category/search/Layout';
import RoleLayout from 'components/admin/school/role/search/Layout';
import TeacherLayout from 'components/admin/user/teacher-search/Layout';
import ParentLayout from 'components/admin/user/parent-search/Layout';
import AccountLayout from 'components/admin/user/account/account-search/Layout';
import AbnormalAccountLayout from 'components/admin/user/account/abnormal-account-search/Layout';
import NonLoggedIn from 'components/admin/user/account/non-login/Layout';
import ImportStudentsLayout from 'components/admin/user/import-student/Layout';
import HrmsLayout from 'components/admin/hrms-data/Layout';
import RolesMenuLayout from 'components/admin/school/roles-menu/index';

import NewOrganizationLayout from 'components/admin/organization/Layout';

import OrganizationImportLayout from 'components/admin/organization/import/Layout';
import MajorLayout from 'components/admin/major/Layout';
import CategoryLayout from 'components/admin/group/index';
import RoomLayout from 'components/admin/room/search/Layout';
import ContestLayout from 'components/admin/contest/contest/search/Layout';
import ContestantsLayout from 'components/admin/contest/contestants/contestant-search/Layout';
import TemplateLayout from 'components/admin/template/search/Layout';
import SupportPaymentLayout from 'components/admin/support-payment/search/Layout';
import SupportUnlockPath from 'components/admin/support-payment/unlock/index';
import UnlockCousePath from 'components/admin/support-payment/unlock/migrate';
import ReportExcelLayout from 'components/admin/report/excels/search/Layout';
import K12YearReport from 'components/admin/report-teacher/k12-year-report';

import ReportChartLayout from 'components/admin/report/charts/search/Layout';
import Dev from 'dev/';

import InviteSearch from 'components/admin/invite/search/Layout';

import TrainingPlan from 'components/admin/training-plan';

import EnrolmentPlan from 'components/admin/enrolment-plan';
import NewTaphuanSmartEnrolmentPlan from 'components/admin/enrolment-plan/new/new-for-taphuan-smart-enrolment-plan/Layout';

import Survey from 'components/admin/survey';

import Dashboard from 'components/admin/dashboard/';

import TransactionSearchLayout from 'components/admin/transaction/search/Layout';

import TransactionReportLayout from 'components/admin/transaction/report/Layout';

import Timetable from 'components/timetable';
import Bank from 'components/admin/bank/search/Layout';
import FAQ from 'components/admin/faq/search/Layout';
import Degree from 'components/admin/degree/search/Layout';
import Event from 'components/admin/event/search/Layout';
import Schedule from 'components/timetable/views/index';
import ScheduleOverview from 'components/timetable_v2/viewers/ScheduleOverview';
import JobPosition from 'components/admin/job-position/Layout';
import Goal from 'components/admin/goal/Layout';
import Passdef from 'components/admin/passdef/search/Layout';
import ReportStationeryLayout from 'components/admin/asset-manager/report/search/Layout';
import ReportEquipmentLayout from 'components/admin/asset-manager/report/search/LayoutEquipment';
import ReportFutureProjectionLayout from 'components/admin/asset-manager/report/search/LayoutProjection';

import ImportStationeryLayout from 'components/admin/asset-manager/stationery-manager/search/Layout';
import CheckInventoryLayout from 'components/admin/asset-manager/stationery-manager/search/LayoutCheckInventory';
import AssetLayout from 'components/admin/asset-manager/asset/search/Layout';
import NewAssetLayout from 'components/admin/asset-manager/asset/new/Layout';
import EditAssetLayout from 'components/admin/asset-manager/asset/edit/EditContainer';

import AssetCategoryLayout from 'components/admin/asset-manager/category/search/Layout';
import NewAssetCategoryLayout from 'components/admin/asset-manager/category/new/Layout';

import Financial from 'components/admin/financial/Layout';
import AssignmentsForMarking from 'components/admin/assignments-for-marking';
import NewUserMajor from 'components/admin/user_major/new';
import UserMajors from 'components/admin/user_major/index';
import RequestTypeManage from 'components/admin/req/search-req-type/Layout';
import MediaManagerLayout from 'components/admin/media-manager/Layout';
import UploadFileInLocalServerToCdn from 'components/admin/media-manager/UploadFileInLocalServerToCdn';

import FileManagerLayout from 'components/admin/file-manager/Layout';
import ImportRubricsLayout from 'components/admin/import-rubrics';
import Feedback from 'components/admin/feedback/search/Layout';
import TimeSheet from 'components/admin/time-sheet/specialized-work';
import AbstractRole from 'components/admin/abstract-role/Layout';
import AbstractRoleNew from 'components/admin/abstract-role/new/Layout';
import AbacRoleAction from 'components/admin/abac-role-action/Layout';
import AbacRoleModule from 'components/admin/abac-role-module/Layout';
import AbacRoleQuickAssign from 'components/admin/abac-role-quick-assign/Layout';
import LogSearch from 'components/admin/log/search/index';
import SystemJobSearch from 'components/admin/job/search/index';
import SchoolRole from 'components/admin/school-role/search/Layout';
import ExamTemplate from 'components/admin/exam-template/search/Layout';
import ExamTemplateEdit from 'components/admin/exam-template/edit/EditContainer';

import QuestionBank from 'components/admin/question-bank/search/Layout';
import QuestionBankEdit from 'components/admin/question-bank/edit/EditContainer';

import SchoolRoleNew from 'components/admin/school-role/new/Layout';
import MessageTemplates from 'components/admin/message-templates/search/Layout';
import SchoolMessageTemplates from 'components/admin/school-message-templates/search/Layout';

import Bus from 'components/admin/bus/search/Layout';

import LearningCourseReport from 'components/admin/report-teacher/learning-course/Layout';
import equivalentPosition from 'components/admin/top-equivalent-position/Layout';

import Help from 'components/admin/help';

import Settings from 'components/admin/settings';
import ItSupport from 'components/admin/it-support';

import StudentStatusReport from 'components/admin/report-teacher/ums-student-status-report/Layout';

import ListOfStudentFailedSubject from 'components/admin/report-teacher/list-of-student-failed-subject/Layout';

import GpaOfStudentBySemester from 'components/admin/report-teacher/gpa-of-student-by-semester/Layout';

import AmountCollectedAccordingToTheCashier from 'components/admin/report-teacher/financial/AmountCollectedAccordingToTheCashier';

import DebitFeesOfStudent from 'components/admin/report-teacher/financial/DebitFeesOfStudent';

import AttendanceReport from 'components/admin/report-teacher/attendance-report/Layout';
import TrainingHomework from 'components/admin/training-homework';
import AssessmentEvidenceTemplate from 'components/temis/evidence/assessment-evidence-template';
import Temis from 'components/temis/report/temis/index';
import Notifications from 'components/front-end/notifications';
import Order from 'components/admin/sales-order';
import CreateOrder from 'components/admin/sales-order/create-order';
import Package from 'components/admin/sales-package';
import SearchCardPackage from '../../components/admin/card/search-card-package/Layout';
import NewCardPackage from '../../components/admin/card/new-card-package/Layout';
import SearchCard from '../../components/admin/card/search-card/Layout';
import PackageDetail from '../../components/admin/card/package-detail/Layout';

const adminUrl = (rootUrl) => [
  // {
  //   componentId: 'Admin',
  //   path: `${rootUrl}`,
  //   layout: LayoutRegistered.admin,
  //   component: SubMainLayoutHelper,
  //   exact: true,
  // },
  // {
  //   componentId: 'AdminIndex',
  //   path: `${rootUrl}*`,
  //   component: () => <Layout layoutId="admin" />,
  //   exact: true,
  // },
  {
    componentId: 'ProcessingRequests',
    path: '/admin/request',
    component: ProcessingRequests,
    exact: true,
  },
  {
    componentId: 'RequestSearchRequest',
    path: '/admin/req',
    component: RequestSearchRequest,
    exact: true,
  },
  {
    componentId: 'Dashboard',
    path: `${rootUrl}`,
    component: Dashboard,
    exact: true,
  },
  {
    componentId: 'DashboardByRole',
    path: `${rootUrl}/dashboard/:role`,
    component: Dashboard,
    exact: true,
  },
  {
    componentId: 'exam-template',
    path: `${rootUrl}/exam-template`,
    component: ExamTemplate,
    exact: true,
  },
  {
    componentId: 'ExamTemplateEdit',
    path: `${rootUrl}/exam-template/:iid(\\d+)/:action`,
    component: ExamTemplateEdit,
    exact: true,
  },
  {
    componentId: 'question-bank',
    path: `${rootUrl}/question-bank`,
    component: QuestionBank,
    exact: true,
  },
  {
    componentId: 'question-bank-edit',
    path: `${rootUrl}/question-bank/:iid(\\d+)/:action`,
    component: QuestionBankEdit,
    exact: true,
  },
  {
    componentId: 'timetableOfClass',
    path: `${rootUrl}/timetable/class/:classIid`,
    component: Timetable,
    exact: true,
  },

  {
    componentId: 'Dev',
    path: getUrl('dev'),
    component: Dev,
  },
  {
    componentId: 'CourseSearch',
    path: '/admin/course:slash(|/):action(|new)',
    component: CourseSearch,
    exact: true,
  },
  {
    componentId: 'AssignedCourses',
    path: getUrl('assigned-course'),
    component: AssignedCourses,
    exact: true,
  },
  {
    componentId: 'OfflineExamSearch',
    path: getUrl('offline-exam:slash(|/):action(|new)'),
    component: OfflineExamSearch,
    exact: true,
  },
  {
    componentId: 'studentsTakingTheOfflineExam',
    path: getUrl('students-in-offline-exam'),
    component: StudentsInOfflineExamSearch,
    exact: true,
  },
  {
    componentId: 'NewUserMajor',
    path: '/admin/user-major/new',
    component: NewUserMajor,
    exact: true,
  },
  {
    componentId: 'UserMajors',
    path: '/admin/user-major',
    component: UserMajors,
    exact: true,
  },
  {
    componentId: 'RequestTypeManage',
    path: '/admin/req-type:slash(|/):action(|new)',
    component: RequestTypeManage,
    exact: true,
  },
  {
    componentId: 'OrganizationSearch',
    path: getUrl('organization'),
    component: NewOrganizationLayout,
    exact: true,
  },
  {
    componentId: 'OrganizationImport',
    path: getUrl('organization', { action: 'import' }),
    component: OrganizationImportLayout,
    exact: true,
  },
  {
    componentId: 'JobPositionLayout',
    path: getUrl('job-position'),
    component: JobPosition,
    exact: true,
  },
  {
    componentId: 'GoalLayout',
    path: getUrl('goal'),
    component: Goal,
    exact: true,
  },
  {
    componentId: 'MajorSearch',
    path: getUrl('major'),
    component: MajorLayout,
    exact: true,
  },
  {
    componentId: 'SyllabusLayout',
    path: getUrl('syllabus'),
    component: SyllabusLayout,
    exact: true,
  },
  {
    componentId: 'SyllabusExamLayout',
    path: getUrl('syllabus_exam'),
    component: SyllabusLayout,
    exact: true,
  },
  {
    componentId: 'CreditLayout',
    path: getUrl('credit:slash(|/):action(|new)'),
    component: SyllabusLayout,
    exact: true,
  },
  {
    componentId: 'CourseNew',
    path: getUrl('new', 'course'),
    component: CourseNew,
    exact: true,
  },
  {
    componentId: 'RoomLayout',
    path: getUrl('rooms'),
    component: RoomLayout,
    exact: true,
  },
  {
    componentId: 'RolesMenuLayout',
    path: getUrl('roles_menu'),
    component: RolesMenuLayout,
    extract: true,
  },
  {
    componentId: 'ContestLayout',
    path: getUrl('contest'),
    component: ContestLayout,
    exact: true,
  },
  {
    componentId: 'VenueLayout',
    path: getUrl('venue'),
    component: VenueLayout,
    exact: true,
  },
  {
    componentId: 'NewVenueLayout',
    path: getUrl('venue/new'),
    component: NewVenueLayout,
    exact: true,
  },
  {
    componentId: 'EditVenueLayout',
    path: getUrl(`venue/:${DefinedUrlParams.IID}(\\d+)`),
    component: EditVenueLayout,
    exact: true,
  },
  {
    componentId: 'PageLayout',
    path: getUrl('page'),
    component: PageLayout,
    exact: true,
  },
  {
    componentId: 'UpdatePageLayout',
    path: `/admin/page/:${DefinedUrlParams.IID}(\\d+)`,
    component: UpdatePageLayout,
    exact: true,
  },
  {
    componentId: 'AddPageLayout',
    path: '/admin/page/new',
    component: AddPageLayout,
    exact: true,
  },
  {
    componentId: 'BlogLayout',
    path: getUrl('blog-category'),
    component: BlogLayout,
    exact: true,
  },
  {
    componentId: 'SkillLayout',
    path: getUrl('skill:slash(|/):action(|new)'),
    component: SkillLayout,
    exact: true,
  },
  {
    componentId: 'RubricLayout',
    path: getUrl('rubric:slash(|/):action(|new)'),
    component: SkillLayout,
    exact: true,
  },
  {
    componentId: 'FileManagerV1Layout',
    path: getUrl('file-manager-v1'),
    component: MediaManagerLayout,
    exact: true,
  },
  {
    componentId: 'UploadFileInLocalServerToCdn',
    path: getUrl('upload-file-in-local-server-to-cdn'),
    component: UploadFileInLocalServerToCdn,
    exact: true,
  },
  {
    componentId: 'FileManagerLayout',
    path: getUrl('file-manager'),
    component: FileManagerLayout,
    exact: true,
  },
  {
    componentId: 'ImportRubricsLayout',
    path: '/admin/import-rubrics:slash(|/):importId(|[0-9a-zA-Z]{24})',
    component: ImportRubricsLayout,
    exact: true,
  },
  {
    componentId: 'RelationLayout',
    path: getUrl('relations'),
    component: RelationLayout,
    exact: true,
  },
  {
    componentId: 'PathLayout',
    path: getUrl('path'),
    component: PathLayout,
    exact: true,
  },
  {
    componentId: 'PathLayout',
    path: '/admin/:a(path|program|classgroup)/new',
    component: PathLayout,
    exact: true,
  },
  {
    componentId: 'ProgramLayout',
    path: getUrl('program'),
    component: ProgramLayout,
    exact: true,
  },
  {
    componentId: 'ClassGroupLayout',
    path: getUrl('classgroup'),
    component: PathLayout,
    exact: true,
  },
  {
    componentId: 'RoleLayout',
    path: getUrl('roles'),
    component: RoleLayout,
    exact: true,
  },
  {
    componentId: 'TeacherLayout',
    path: getUrl('school/teachers'),
    component: TeacherLayout,
    exact: true,
  },
  {
    componentId: 'ParentLayout',
    path: getUrl('school/parents'),
    component: ParentLayout,
    exact: true,
  },
  {
    componentId: 'AccountLayout',
    path: getUrl('school/accounts'),
    component: AccountLayout,
    exact: true,
  },
  {
    componentId: 'HrmsLayout',
    path: getUrl(`school/hrms-data/:${DefinedUrlParams.HRMS_TYPE}`),
    component: HrmsLayout,
    exact: true,
  },
  {
    componentId: 'AbnormalAccountLayout',
    path: getUrl('school/abnormal-accounts'),
    component: AbnormalAccountLayout,
    exact: true,
  },
  {
    componentId: 'nonLoggedIn',
    path: getUrl('school/non-login'),
    component: NonLoggedIn,
    exact: true,
  },
  schoolStudent,
  {
    componentId: 'ImportStudentsLayout',
    path: getUrl('school/import-students:slash(|/):importId(|[0-9a-zA-Z]{24})'),
    component: ImportStudentsLayout,
    exact: true,
  },
  {
    componentId: 'ContestantsLayout',
    path: getUrl('contestants'),
    component: ContestantsLayout,
    exact: true,
  },
  {
    componentId: 'CategoryLayout',
    path: getUrl(`:groupType(${Object.keys(categoryTypeMapping).join('|')})`),
    component: CategoryLayout,
    exact: true,
  },
  {
    componentId: 'TemplateLayout',
    path: getUrl('templates'),
    component: TemplateLayout,
    exact: true,
  },
  {
    componentId: 'SupportPaymentLayout',
    path: getUrl('support-payments'),
    component: SupportPaymentLayout,
    exact: true,
  },
  {
    componentId: 'SupportUnlockPath',
    path: getUrl('unlock-path-by-uiids'),
    component: SupportUnlockPath,
    exact: true,
  },
  {
    componentId: 'UnlockCousePath',
    path: getUrl('support-migrate-user-unlocked'),
    component: UnlockCousePath,
    exact: true,
  },
  {
    componentId: 'ProvinceLayout',
    path: getUrl('search_provinces_or_districts'),
    component: ProvinceLayout,
    exact: true,
  },
  {
    componentId: 'SchoolLayout',
    path: getUrl('search_schools'),
    component: SchoolLayout,
    exact: true,
  },
  {
    componentId: 'ReportExcelLayout',
    path: getUrl('report_excels'),
    component: ReportExcelLayout,
    exact: true,
  },
  {
    componentId: 'ReportChartLayout',
    path: getUrl('report_charts'),
    component: ReportChartLayout,
    exact: true,
  },
  {
    componentId: 'TransactionSearch',
    path: getUrl('transaction'),
    component: TransactionSearchLayout,
    exact: true,
  },
  {
    componentId: 'TransactionReport',
    path: getUrl('transaction/report'),
    component: TransactionReportLayout,
    exact: true,
  },
  {
    componentId: 'ico',
    path: getUrl('ico'),
    component: Ico,
    exact: true,
  },
  {
    componentId: 'budgetary-allocations',
    path: getUrl('budgetary-allocations'),
    component: BudgetaryAllocations,
    exact: true,
  },
  {
    componentId: 'budgetary-allocations-criteria',
    path: getUrl('budgetary-allocations/criteria'),
    component: Criteria,
    exact: true,
  },
  {
    componentId: 'semester',
    path: getUrl('semester'),
    component: Semester,
    exact: true,
  },
  {
    componentId: 'bank',
    path: `/admin/bank/:${DefinedUrlParams.NTYPE}/:${DefinedUrlParams.ACTION}?`,
    component: Bank,
    exact: true,
  },
  {
    componentId: 'invite-manage',
    path: getUrl('invite'),
    component: InviteSearch,
    exact: true,
  },
  {
    componentId: 'training-plan',
    path: getUrl('training-plan'),
    component: TrainingPlan,
    exact: true,
  },
  {
    componentId: 'enrolment-plan',
    path: getUrl('enrolment-plan'),
    component: EnrolmentPlan,
    exact: true,
  },
  {
    componentId: 'new-taphuan-smart-enrolment-plan',
    path: getUrl('enrolment-plan/new-taphuan-smart-enrolment-plan'),
    component: NewTaphuanSmartEnrolmentPlan,
    exact: true,
  },
  {
    componentId: 'survey',
    path: getUrl('survey'),
    component: Survey,
    exact: true,
  },
  {
    componentId: 'faq',
    path: `${rootUrl}/faq`,
    component: FAQ,
    exact: true,
  },
  {
    componentId: 'degree',
    path: `${rootUrl}/degree`,
    component: Degree,
    exact: true,
  },
  {
    componentId: 'event',
    path: `${rootUrl}/event`,
    component: Event,
    exact: true,
  },
  {
    componentId: 'schedule',
    path: `${rootUrl}/schedule/:${DefinedUrlParams.IID}(\\d+)`,
    component: Schedule,
    exact: true,
  },
  {
    componentId: 'timetable',
    path: `${rootUrl}/timetable`,
    component: Schedule,
    exact: true,
  },
  {
    componentId: 'schedule-overview',
    path: getUrl('schedule-overview'),
    component: ScheduleOverview,
    exact: true,
  },
  {
    componentId: 'passdef',
    path: `${rootUrl}/passdef`,
    component: Passdef,
    exact: true,
  },
  {
    componentId: 'report-stationery',
    path: getUrl('asset/report-stationery'),
    component: ReportStationeryLayout,
    exact: true,
  },
  {
    componentId: 'report-equipment',
    path: getUrl('asset/report-equipment'),
    component: ReportEquipmentLayout,
    exact: true,
  },
  {
    componentId: 'report-future-projection',
    path: getUrl('asset/report-future-projection'),
    component: ReportFutureProjectionLayout,
    exact: true,
  },
  {
    componentId: 'import-stationery',
    path: getUrl('asset/import-stationery'),
    component: ImportStationeryLayout,
    exact: true,
  },
  {
    componentId: 'check-inventory',
    path: getUrl('asset/check-inventory'),
    component: CheckInventoryLayout,
    exact: true,
  },
  {
    componentId: 'AssetLayout',
    path: getUrl('asset/items'),
    component: AssetLayout,
    exact: true,
  },
  {
    componentId: 'NewAssetLayout',
    path: getUrl('asset/new'),
    component: NewAssetLayout,
    exact: true,
  },
  {
    componentId: 'EditAssetLayout',
    path: getUrl(`asset/:${DefinedUrlParams.IID}(\\d+)`),
    component: EditAssetLayout,
    exact: true,
  },
  {
    componentId: 'AssetCategoryLayout',
    path: getUrl('asset/category'),
    component: AssetCategoryLayout,
    exact: true,
  },
  {
    componentId: 'NewAssetCategoryLayout',
    path: getUrl('asset/category/new'),
    component: NewAssetCategoryLayout,
    exact: true,
  },
  {
    componentId: 'financial',
    path: getUrl('financial'),
    component: Financial,
    exact: true,
  },
  {
    componentId: 'financial-action',
    path: getUrl('financial/:action'),
    component: Financial,
    exact: true,
  },
  {
    componentId: 'financial-subaction',
    path: getUrl('financial/:action/:subAction'),
    component: Financial,
    exact: true,
  },
  {
    componentId: 'financial-level3Action',
    path: getUrl('financial/:action/:subAction/:level3Action'),
    component: Financial,
    exact: true,
  },
  {
    componentId: 'assignments-for-marking',
    path: getUrl('assignments-for-marking'),
    component: AssignmentsForMarking,
    exact: true,
  },
  {
    componentId: 'feedback',
    path: getUrl('feedback/:type(student|teacher)'),
    component: Feedback,
    exact: true,
  },
  {
    componentId: 'time_sheet',
    path: getUrl('time-sheet/specialized-work'),
    component: TimeSheet,
    exact: true,
  },
  {
    componentId: 'log_search',
    path: getUrl('logs'),
    component: LogSearch,
    exact: true,
  },
  {
    componentId: 'jobs_search',
    path: getUrl('jobs'),
    component: SystemJobSearch,
    exact: true,
  },
  {
    componentId: 'abstract-role',
    path: getUrl('abstract-role'),
    component: AbstractRole,
    exact: true,
  },
  {
    componentId: 'abstract-role-new',
    path: getUrl('abstract-role/new'),
    component: AbstractRoleNew,
    exact: true,
  },
  {
    componentId: 'abac-role-quick-assign',
    path: getUrl('abac-role-quick-assign'),
    component: AbacRoleQuickAssign,
    exact: true,
  },
  {
    componentId: 'abac-role-action',
    path: getUrl('abac-role-action'),
    component: AbacRoleAction,
    exact: true,
  },
  {
    componentId: 'abac-role-module',
    path: getUrl('abac-role-module'),
    component: AbacRoleModule,
    exact: true,
  },
  {
    componentId: 'school_role',
    path: getUrl('school-roles'),
    component: SchoolRole,
    exact: true,
  },
  {
    componentId: 'school_role_new',
    path: getUrl('school-roles/new'),
    component: SchoolRoleNew,
    exact: true,
  },
  {
    componentId: 'report-learning-course',
    path: getUrl('report/learning-course'),
    component: LearningCourseReport,
    exact: true,
  },
  {
    componentId: 'message-templates',
    path: getUrl('message-templates'),
    component: MessageTemplates,
    exact: true,
  },
  {
    componentId: 'school-message-templates',
    path: getUrl('school-message-templates'),
    component: SchoolMessageTemplates,
    exact: true,
  },
  {
    componentId: 'bus',
    path: getUrl('bus'),
    component: Bus,
    exact: true,
  },
  {
    componentId: 'top-equivalent-position',
    path: getUrl('top-equivalent-position'),
    component: equivalentPosition,
    exact: true,
  },
  {
    componentId: 'k12-yearly-report',
    path: getUrl('report/year-report'),
    component: K12YearReport,
    exact: true,
  },
  {
    componentId: 'admin-help',
    path: getUrl('help'),
    component: Help,
    exact: true,
  },
  {
    componentId: 'admin-settings',
    path: '/admin/settings',
    component: Settings,
    exact: true,
  },
  {
    componentId: 'student-status-report',
    path: getUrl('report/student-status-report'),
    component: StudentStatusReport,
    exact: true,
  },
  {
    componentId: 'list-of-student-failed-subject',
    path: getUrl('report/list-of-student-failed-subject'),
    component: ListOfStudentFailedSubject,
    exact: true,
  },
  {
    componentId: 'gpa-of-student-by-semester',
    path: getUrl('report/gpa-of-student-by-semester'),
    component: GpaOfStudentBySemester,
    exact: true,
  },
  {
    componentId: 'amount-collected-according',
    path: getUrl('report/amount-collected-according'),
    component: AmountCollectedAccordingToTheCashier,
    exact: true,
  },
  {
    componentId: 'debit-fees-of-student',
    path: getUrl('report/debit-fees-of-student'),
    component: DebitFeesOfStudent,
    exact: true,
  },
  {
    componentId: 'attendance-report',
    path: getUrl('report/attendance-report'),
    component: AttendanceReport,
    exact: true,
  },
  {
    componentId: 'it-support',
    path: getUrl('it-support'),
    component: ItSupport,
    exact: true,
  },
  {
    componentId: 'training-homework',
    path: getUrl('training-homework'),
    component: TrainingHomework,
    exact: true,
  },
  {
    componentId: 'temis',
    path: getUrl('temis'),
    component: Temis,
  },
  {
    componentId: 'assessment_evidence_template',
    path: getUrl('assessment-evidence-template'),
    component: AssessmentEvidenceTemplate,
    exact: true,
  },
  {
    componentId: 'admin-notifications',
    path: getUrl('notifications'),
    component: Notifications,
    exact: true,
  },
  {
    componentId: 'sales-order',
    path: getUrl('sales-order'),
    component: Order,
    exact: true,
  },
  {
    componentId: 'sales-order',
    path: getUrl('sales-order/create'),
    component: CreateOrder,
    exact: true,
  },
  {
    componentId: 'sales-package',
    path: getUrl('sales-package'),
    component: Package,
    exact: true,
  },
  {
    componentId: 'SearchCardPackage',
    path: getUrl('card/card-package'),
    component: SearchCardPackage,
    exact: true,
  },
  {
    componentId: 'NewCardPackage',
    path: getUrl('card/new-package'),
    component: NewCardPackage,
    exact: true,
  },
  {
    componentId: 'SearchCard',
    path: getUrl('card/search-card'),
    component: SearchCard,
    exact: true,
  },
  {
    componentId: 'PackageDetail',
    path: `/admin/card/package-detail/:${DefinedUrlParams.IID}(\\d+)`,
    component: PackageDetail,
    exact: true,
  },
];

export default (rootUrl) => {
  return adminUrl(rootUrl)
    .concat(SettingsRoutes(rootUrl))
    .concat(reportRoutes);
};
