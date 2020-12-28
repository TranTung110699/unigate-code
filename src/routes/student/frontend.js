import { DefinedUrlParams, getCatalogueUrl } from 'routes/links/common';
import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const LearningNotAllowed = Loadable({
  loader: () => import('components/learn/errors/not-allowed'),
  loading: Loading,
});
const TeacherLayout = Loadable({
  loader: () => import('components/front-end/teacher/Layout'),
  loading: Loading,
});
const DashboardLayout = Loadable({
  loader: () => import('components/front-end/dashboard/Layout'),
  loading: Loading,
});
const ProgressReportsLayout = Loadable({
  loader: () => import('components/front-end/reports/student-detail'),
  loading: Loading,
});
const ProgressReportsByOrganization = Loadable({
  loader: () => import('components/front-end/reports/organization'),
  loading: Loading,
});
const PaymentLayout = Loadable({
  loader: () => import('components/front-end/payment/Layout'),
  loading: Loading,
});
const PathLayout = Loadable({
  loader: () => import('components/front-end/path'),
  loading: Loading,
});
const SearchCoursesLayout = Loadable({
  loader: () => import('components/front-end/course/search'),
  loading: Loading,
});
const HomePageLayout = Loadable({
  loader: () => import('components/front-end/homepage/Layout'),
  loading: Loading,
});
const FAQ = Loadable({
  loader: () => import('components/front-end/faq'),
  loading: Loading,
});
const TakeSurvey = Loadable({
  loader: () => import('components/front-end/dashboard/survey/take'),
  loading: Loading,
});
const TakeGlobalSurvey = Loadable({
  loader: () => import('components/front-end/dashboard/survey/GlobalSurvey'),
  loading: Loading,
});

const ListOfSurvey = Loadable({
  loader: () => import('components/front-end/dashboard/survey/ListOfSurvey'),
  loading: Loading,
});

const SurveyAppliedForItem = Loadable({
  loader: () =>
    import('components/front-end/dashboard/survey/SurveyAppliedForItem'),
  loading: Loading,
});

const Skills = Loadable({
  loader: () => import('components/front-end/skill'),
  loading: Loading,
});
const CategoriesCourses = Loadable({
  loader: () => import('components/front-end/homepage/evn/page/categories'),
  loading: Loading,
});
const TrainingPlanOrganizationDetail = Loadable({
  loader: () =>
    import('components/admin/training-plan/mainstage/members/members-by-organization/details'),
  loading: Loading,
});

export default (learnRootUrl) => {
  return [
    {
      componentId: 'Homepage',
      path: '/',
      component: HomePageLayout,
      exact: true,
    },
    {
      componentId: 'Reports',
      path: '/progress-reports',
      component: ProgressReportsLayout,
      exact: true,
    },
    {
      componentId: 'ProgressReportsByOrganization',
      path: '/progress-reports-by-organization',
      component: ProgressReportsByOrganization,
      exact: true,
    },
    {
      componentId: 'PathList',
      path: `${learnRootUrl}/course-list/:${DefinedUrlParams.PATH_IID}(\\d+)`,
      component: PathLayout,
      exact: true,
    },
    {
      componentId: 'SearchCourses',
      path: `${learnRootUrl}/course/search/:${DefinedUrlParams.SEARCH_KEY}`,
      component: SearchCoursesLayout,
      exact: true,
    },
    {
      componentId: 'LearnNotAllowed',
      path: '/not-allowed-to-learn',
      component: LearningNotAllowed,
      exact: true,
    },
    {
      componentId: 'Teachers',
      path: '/teachers/',
      component: TeacherLayout,
      exact: true,
    },
    {
      componentId: 'Payment',
      path: '/pay',
      component: PaymentLayout,
      exact: true,
    },

    // {
    //   componentId: 'ExamTesting',
    //   path: `/exam/:${DefinedUrlParams.EXAM_MODE}/:${
    //     DefinedUrlParams.COURSE_IID
    //   }/:${DefinedUrlParams.SLUG}.html`,
    //   component: ExamTesting,
    //   exact: true,
    // },
    // {
    //   componentId: 'ExamTestingWithPaper',
    //   path: `/exam/:${DefinedUrlParams.EXAM_MODE}/:${
    //     DefinedUrlParams.COURSE_IID
    //   }/:${DefinedUrlParams.PAPER_ID}/:${DefinedUrlParams.SLUG}.html`,
    //   component: ExamTesting,
    //   exact: true,
    // },
    {
      componentId: 'FAQ',
      path: '/faq',
      component: FAQ,
    },
    {
      componentId: 'SurveyAppliedForItem',
      path: '/survey/:appliedItemType/:itemIid/:surveyIid',
      component: SurveyAppliedForItem,
      exact: true,
    },
    {
      componentId: 'TakeSurvey',
      path: '/survey/:surveyIid-:semesterIid',
      component: TakeSurvey,
    },
    {
      componentId: 'ListOfSurvey',
      path: '/surveys',
      component: ListOfSurvey,
      exact: true,
    },
    {
      componentId: 'TakeGlobalSurvey',
      path: '/global-survey',
      component: TakeGlobalSurvey,
      exact: true,
    },
    {
      componentId: 'skills',
      path: '/skills',
      component: Skills,
    },

    {
      componentId: 'SubCategoriesDashboardPage',
      path: getCatalogueUrl('home-category'),
      component: HomePageLayout,
      exact: true,
    },
    {
      componentId: 'CategoriesCourses',
      path: getCatalogueUrl('home'),
      component: CategoriesCourses,
      exact: true,
    },
    {
      componentId: 'SubCategoriesCoursesPage',
      path: getCatalogueUrl('category-slug', null, true),
      component: CategoriesCourses,
      exact: true,
    },
    {
      componentId: 'CategoriesCoursesPage',
      path: getCatalogueUrl('category-courses', { page: 'catalogue' }, true),
      component: CategoriesCourses,
      exact: true,
    },
    {
      componentId: 'CategoriesBlogsPage',
      path: getCatalogueUrl('category-blog', { page: 'catalogue' }, true),
      component: CategoriesCourses,
      exact: true,
    },
    {
      componentId: 'AttendanceSession',
      path: `/teach/:${DefinedUrlParams.NTYPE}/:${
        DefinedUrlParams.COURSE_IID
      }-:${DefinedUrlParams.SESION_IID}/:${DefinedUrlParams.SUB_TYPE}`,
      component: DashboardLayout,
      exact: true,
    },
    {
      componentId: 'SubDashboardPageTimeTable',
      path: `/learn/timetable/:${DefinedUrlParams.NTYPE}`,
      component: DashboardLayout,
      exact: true,
    },
    {
      componentId: 'TrainingPlanOrganizationDetail',
      path:
        '/training-plan/:training_plan_iid/users-by-organization/:organization_iid',
      component: TrainingPlanOrganizationDetail,
    },
  ];
};
