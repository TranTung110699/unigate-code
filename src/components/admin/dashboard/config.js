import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import Timetable from 'components/timetable/views/index';
import AssignmentsForMarking from 'components/admin/assignments-for-marking';
import WorkNote from 'components/admin/work-note';
import AssignedCourses from 'components/admin/user/teacher-search/assigned-courses/index';
import UmsLearningCourse from 'components/admin/report-teacher/learning-course/Layout';
import Overview from './widget/headmaster-overview-content/Overview';
import NumberOfLearnersByTime from './widget/number-of-learners-by-time';
import UsefulLinksWidget from './widget/useful-links';
import EnrolmentInfo from './widget/enrolment-info';
import OngoingContests from './widget/ongoing-contests';
import UpcomingContests from './widget/upcoming-contests';
import FluctuatingGroups from './widget/fluctuating-groups';
import UserOrganizations from './widget/user-organizations';
import InformationLearningItems from './widget/learning-materials';
import NoOfCreditSyllabuses from './widget/learning-reports/no-of-credit-syllabuses';
import LearningProgress from './widget/learning-reports/learning-progress';
import RatingStars from './widget/learning-reports/rating-stars';
import LearningTimeSpent from './widget/learning-reports/learning-time-spent';
import Request from './widget/request';
import OverallLearningProgress from './widget/enterprise-reports/overall-learning-progress';
import OverallRatingStars from './widget/enterprise-reports/overall-rating-stars';
import OverallPassedFailedRatio from './widget/enterprise-reports/overall-passed-failed-ratio';
// import OverallStatistics from './widget/enterprise-reports/overall-statistics';
import SurveyReport from './widget/survey-report';

const configs = () => [
  {
    id: 'compare-organizations-no-of-credit-syllabuses',
    label: t1("compare_organizations'_number_of_credit_syllabuses"),
    href: 'admin/credit',
    component: (props) => <NoOfCreditSyllabuses {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'compare-organizations-learning-progress',
    label: t1("compare_organizations'_learning_progress"),
    component: (props) => <LearningProgress {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'compare-organizations-rating-stars',
    label: t1("compare_organizations'_members_ratings"),
    component: (props) => <RatingStars {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'compare-organizations-average-learning-time-spent',
    label: t1("compare_organizations'_average_learning_time_spent"),
    component: (props) => <LearningTimeSpent {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'overall-learning-progress',
    label: t1('overall_learning_progress'),
    component: (props) => <OverallLearningProgress {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'overall-rating-stars',
    label: t1('overall_rating_stars'),
    component: (props) => <OverallRatingStars {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'overall-passed-failed-ratio',
    label: t1('overall_passed_failed_ratio'),
    component: (props) => <OverallPassedFailedRatio {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  // {
  //   id: 'overall-statistics',
  //   label: t1('overall_statistics'),
  //   component: (props) => <OverallStatistics {...props} />,
  //   minWidth: 4,
  //   minHeight: 3,
  // },
  {
    id: 'survey-report',
    label: t1('survey_report'),
    component: (props) => <SurveyReport {...props} />,
    minWidth: 8,
    minHeight: 8,
  },
  // {
  //   id: 'user-organizations',
  //   label: t1('your_organizations_and_roles'),
  //   expand: true,
  //   component: (props) => <UserOrganizations {...props} />,
  //   height: 6,
  //   width: 8,
  //   minHeight: 3,
  //   minWidth: 4,
  // },
  {
    id: 'timetable',
    component: <Timetable this_user_only hasAdminMainstate={false} />,
    label: t1('timetable'),
    componentStyle: { padding: 8 },
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'assignments-for-marking',
    component: <AssignmentsForMarking hasAdminMainstate={false} />,
    label: t1('assignments_for_marking'),
    componentStyle: { padding: 8 },
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'work-note',
    component: <WorkNote hideTitle />,
    label: t1('work_note'),
    minWidth: 4,
    minHeight: 3,
    componentStyle: { padding: 8 },
  },
  {
    id: 'assigned-course',
    component: <AssignedCourses hideTitle />,
    label: t1('assigned_courses'),
    componentStyle: { padding: 8 },
  },
  {
    id: 'school-dashboard-overview-statistics',
    label: t1('school_dashboard_overview_statistics'),
    component: <Overview hideTitle />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'number-of-learners-by-time',
    label: t1('number_of_learners_by_time'),
    component: <NumberOfLearnersByTime hideTitle />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'useful-link',
    label: t1('useful_links'),
    component: <UsefulLinksWidget />,
    minWidth: 4,
    minHeight: 3,
    width: 4,
    height: 3,
  },
  {
    id: 'enrolment-info',
    label: t1('course_enrolments'),
    href: '/admin/invite',
    expand: true,
    component: (props) => <EnrolmentInfo {...props} />,
    width: 4,
    height: 3,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'ongoing-contests',
    label: t1('ongoing_contests'),
    href: '/admin/invite',
    expand: true,
    component: (props) => <OngoingContests {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'fluctuating-groups',
    label: t1('fluctuating_groups'),
    href: '/admin/group',
    expand: true,
    component: (props) => <FluctuatingGroups {...props} />,
    menuOptions: {
      title: t1('filter'),
      icon: 'settings',
      menus: [
        {
          id: 'last_updated',
          label: t1('last_updated_time'),
          params: {
            sort: 'last_updated',
          },
        },
        {
          id: 'name',
          label: t1('sort_allow_group_name'),
          params: {
            sort: 'name',
          },
        },
        {
          id: 'current_members',
          label: t1('sort_allow_current_members'),
          params: {
            sort: 'current_members',
          },
        },
        {
          id: 'pending_members',
          label: t1('sort_allow_pending_members'),
          params: {
            sort: 'pending_members',
          },
        },
        {
          id: 'redundant_members',
          label: t1('sort_allow_redundant_members'),
          params: {
            sort: 'redundant_members',
          },
        },
      ],
    },
    height: 3,
    width: 4,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'upcoming-contests',
    label: t1('upcoming_contests'),
    href: '/admin/contest',
    expand: true,
    component: (props) => <UpcomingContests {...props} />,
    minWidth: 4,
    minHeight: 3,
    height: 3,
  },
  {
    id: 'learning-materials',
    label: t1('learning_materials'),
    href: '/admin/bank',
    component: (props) => <InformationLearningItems {...props} />,
    minWidth: 4,
    minHeight: 3,
  },
  {
    id: 'request',
    label: t1('request'),
    href: '/admin/bank',
    component: (props) => <Request {...props} />,
    height: 6,
    width: 8,
    minHeight: 3,
    minWidth: 4,
  },
  {
    id: 'learning-course',
    label: t1('learning_course'),
    component: () => <UmsLearningCourse isWidget />,
    minWidth: 4,
    minHeight: 3,
  },
];

const getEnabledWidgets = (widgetEnables) => {
  if (!widgetEnables) return null;

  const widgets = [];
  widgetEnables.forEach((widget) => {
    if (widget && widget.display) {
      widgets.push(configs().find((config) => config.id === widget.id));
    }
  });

  return widgets;
};

const getOriginationWidgets = () => {
  const widgetEnables = [
    {
      id: 'compare-organizations-no-of-credit-syllabuses',
      display: 1,
    },
    {
      id: 'compare-organizations-learning-progress',
      display: 1,
    },
    {
      id: 'compare-organizations-rating-stars',
      display: 1,
    },
    {
      id: 'compare-organizations-average-learning-time-spent',
      display: 1,
    },
    {
      id: 'overall-learning-progress',
      display: 1,
    },
    {
      id: 'overall-rating-stars',
      display: 1,
    },
    {
      id: 'overall-passed-failed-ratio',
      display: 1,
    },
    {
      id: 'survey-report',
      display: 1,
    },
  ];
  return getEnabledWidgets(widgetEnables);
};

export const getWidgets = (widgetByWorkingModeEnables, node) => {
  if (node && node.iid) {
    return getOriginationWidgets();
  }

  return configs()
    .map((item) => {
      if (!item || !widgetByWorkingModeEnables) {
        return null;
      }

      if (get(widgetByWorkingModeEnables, `[${item.id}]`)) {
        return item;
      }

      return null;
    })
    .filter(Boolean);
};
