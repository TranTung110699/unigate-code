import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';

export const reportMenuIds = {
  STUDENT_PROGRESS: 'student-progress',
  ORGANIZATION_PROGRESS: 'organization-progress',
  ENTERPRISE_DASHBOARD: 'enterprise-dashboard',
  K12_STUDENT_YEAR_REPORT: 'k12-student-year-report',
  COMPARE_ORGANIZATIONS: 'compare-organizations',
  COMPARE_ACADEMIC_CATEGORIES: 'compare-academic-categories',
  PROGRESS_OF_PATH_USER: 'progress-of-path-user',
  USER_LEARN: 'user_learn',
  ROOMS_CAPACITY: 'rooms-capacity',
  TEACHING_HOURS: 'teaching-hours',
  TEACHING_HOURS_OF_TEACHERS: 'teaching-hours-of-teachers',
  TEACHERS_BY_FACULTY: 'teachers-by-faculty',
  TEACHERS_BY_CREDIT: 'teachers-by-credit',
  SCORES_BY_FACULTY: 'scores-by-faculty',
  SCORES_BY_MAJOR: 'scores-by-major',
  CREDIT_TRANSFERT: 'credit-transfert',
  SCORES_BY_SEMESTER_CREDIT: 'scores-by-semester-credit',
  STUDENTS_FOR_REQUEST_STUDY: 'students-for-request-study',
  LEARNING_COURSE: 'learning-course',
  REPORT_BY_SUBJECT: 'report-by-subject',
  REPORT_CONTEST_RESULT: 'report-contest-result',
  REPORT_BY_ORGANIZATION: 'report-by-organization',
  REPORT_BY_OPERATING_CAPACITY: 'report-by-operating-capacity',
  PROGRESS_MASTER_BY_ACADEMIC_CATEGORIE:
    'progress-master-by-academic-categorie',
  REPORT_TEACHERS_OF_ORGANIZATION: 'report-teachers-of-organization',
  REPORT_AVERAGE_SURVEY_RESULT: 'report-average-survey-result',
  PROGRESS_MASTER_BY_SKILL_LEVEL: 'progress-master-by-skill-level',
  REPORT_BY_SCHOLARSHIP: 'report-by-scholarship',
  STUDENT_STATUS_REPORT: 'student-status-report',
  LIST_OF_STUDENT_FAILED_SUBJECT: 'list-of-student-failed-subject',
  GPA_OF_STUDENT_BY_SEMESTER: 'gpa-of-student-by-semester',
  ATTENDANCE_REPORT: 'attendance-report',
  AMOUNT_COLLECTED_ACCORDING: 'amount-collected-according',
  DEBIT_FEES_OF_STUDENT: 'debit-fees-of-student',
  JOBS_TO_REPORT: 'jobs-to-report',
};

export const allMenuItems = ({ schoolType, isK12 = false } = {}) => [
  {
    id: reportMenuIds.STUDENT_PROGRESS,
    url: getUrl('report/student-detail-progress'),
    title: t1('student_detail_progress'),
    description: t1(
      'search_student_progress_and_their_assignments_by_province,_organization,_job_position,_or_training_plan,_or_course',
    ),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: reportMenuIds.ORGANIZATION_PROGRESS,
    url: getUrl('report/organization-progress'),
    title: t1('organization_progress'),
    description: t1('description_organization_progress'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: reportMenuIds.ENTERPRISE_DASHBOARD,
    url: getUrl('report/enterprise-dashboard'),
    title: t1('enterprise_dashboard'),
    description: t1('description_enterprise_dashboard'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: reportMenuIds.COMPARE_ORGANIZATIONS,
    url: getUrl('report/compare-organizations'),
    title: t1('compare_organizations'),
    description: t1('description_compare_organizations'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.COMPARE_ACADEMIC_CATEGORIES,
    url: getUrl('report/compare-academic-categories'),
    title: t1('compare_academic_categories'),
    description: t1('description_compare_academic_categories'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.PROGRESS_OF_PATH_USER,
    url: getUrl('report/progress-of-path-user'),
    title: t1('progress_of_path_user'),
    description: t1('description_progress_of_path_user'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.USER_LEARN,
    url: getUrl('report/user-learns'),
    title: t1('students_by_course'),
    description: t1('description_students_by_course'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.TEACHING_HOURS,
    url: getUrl('report/teaching-hours'),
    title: t1('teaching_hours'),
    description: t1('description_teaching_hours'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.TEACHING_HOURS_OF_TEACHERS,
    url: getUrl('report/teaching-hours-of-teachers'),
    title: t1('teaching_hours_of_teachers'),
    description: t1('description_teaching_hours_of_teachers'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.TEACHERS_BY_FACULTY,
    url: getUrl('report/teachers-by-faculty'),
    title: t1('teachers_by_faculty'),
    description: t1('description_teachers_by_faculty'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.TEACHERS_BY_CREDIT,
    url: getUrl('report/teachers-by-credit'),
    title: t1('teachers_by_credit'),
    description: t1('description_teachers_by_credit'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.SCORES_BY_FACULTY,
    url: getUrl('report/scores-by-faculty'),
    title: t1('scores_by_faculty'),
    description: t1('description_scores_by_faculty'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.SCORES_BY_MAJOR,
    url: getUrl('report/scores-by-major'),
    title: t1('scores_by_major'),
    description: t1('description_scores_by_major'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.STUDENTS_FOR_REQUEST_STUDY,
    url: getUrl('report/students-for-request-study'),
    title: t1('students_for_request_study'),
    description: t1('description_students_for_request_study'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_BY_SUBJECT,
    url: getUrl('report/report-by-subject'),
    title: t1('report_by_subject'),
    description: t1('description_report_by_subject'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_CONTEST_RESULT,
    url: getUrl('report/report-contest-result'),
    title: t1('report_contest_result'),
    description: t1('description_report_contest_result'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_BY_ORGANIZATION,
    url: getUrl('report/report-by-organization'),
    title: t1('report_by_organization'),
    description: t1('description_report_by_organization'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_BY_OPERATING_CAPACITY,
    url: getUrl('report/report-by-operating-capacity'),
    title: t1('report_by_operating_capacity'),
    description: t1('description_report_by_operating_capacity'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.PROGRESS_MASTER_BY_ACADEMIC_CATEGORIE,
    url: getUrl('report/progress-master-by-academic-categorie'),
    title: t1('report_progress_master_by_academic_categorie'),
    description: t1('description_report_progress_master_by_academic_categorie'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_TEACHERS_OF_ORGANIZATION,
    url: getUrl('report/report-teachers-of-organization'),
    title: t1('report_teachers_of_organization'),
    description: t1('description_report_teachers_of_organization'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_AVERAGE_SURVEY_RESULT,
    url: getUrl('report/report-average-survey-result'),
    title: t1('report_average_survey_result'),
    description: t1('description_report_average_survey_result'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.PROGRESS_MASTER_BY_SKILL_LEVEL,
    url: getUrl('report/progress-master-by-skill-level'),
    title: t1('report_progress_master_by_skill_level'),
    description: t1('description_report_progress_master_by_skill_level'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.ROOMS_CAPACITY,
    url: getUrl('report/rooms-capacity'),
    title: t1('rooms_capacity'),
    domainHintText: 'SIS',
    description: t1('description_rooms_capacity'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.CREDIT_TRANSFERT,
    url: getUrl('report/credit-transfert'),
    title: t1('credit_transfert'),
    domainHintText: 'SIS',
    description: t1('description_credit_transfert'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.SCORES_BY_SEMESTER_CREDIT,
    url: getUrl('report/scores-by-semester-credit'),
    title: t1('scores_by_semester'),
    domainHintText: 'SIS',
    description: t1('description_scores_by_semester'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.LEARNING_COURSE,
    url: getUrl('report/learning-course'),
    title: t1('learning_course'),
    domainHintText: 'SIS',
    description: t1('description_learning_course'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.REPORT_BY_SCHOLARSHIP,
    url: getUrl('report/report-by-scholarship'),
    title: t1('report_by_scholarship'),
    domainHintText: 'SIS',
    description: t1('description_report_by_scholarship'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.STUDENT_STATUS_REPORT,
    url: getUrl('report/student-status-report'),
    title: t1('student_status_report'),
    domainHintText: 'SIS',
    description: t1('description_student_status_report'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.LIST_OF_STUDENT_FAILED_SUBJECT,
    url: getUrl('report/list-of-student-failed-subject'),
    title: t1('list_of_student_failed_subject'),
    domainHintText: 'SIS',
    description: t1('description_list_of_student_failed_subject'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.GPA_OF_STUDENT_BY_SEMESTER,
    url: getUrl('report/gpa-of-student-by-semester'),
    title: t1('gpa_of_student_by_semester'),
    domainHintText: 'SIS',
    description: t1('description_gpa_of_student_by_semester'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.ATTENDANCE_REPORT,
    url: getUrl('report/attendance-report'),
    title: t1('attendance_report'),
    domainHintText: 'SIS',
    description: t1('attendance_report'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.AMOUNT_COLLECTED_ACCORDING,
    url: getUrl('report/amount-collected-according'),
    title: t1('report_the_amount_collected_according_to_the_cashier'),
    domainHintText: 'SIS',
    description: t1(
      'description_report_the_amount_collected_according_to_the_cashier',
    ),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.DEBIT_FEES_OF_STUDENT,
    url: getUrl('report/debit-fees-of-student'),
    title: t1('report_debit_fees_of_student'),
    domainHintText: 'SIS',
    description: t1('description_report_debit_fees_of_student'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
  {
    id: reportMenuIds.K12_STUDENT_YEAR_REPORT,
    url: getUrl('report/year-report'),
    title: t1('yearly_report'),
    domainHintText: 'K12',
    description: t1('description_yearly_report'),
    icon: {
      position: 'left',
      type: 'dashboard',
    },
  },
  {
    id: reportMenuIds.JOBS_TO_REPORT,
    url: getUrl('report/jobs-to-report'),
    title: t1('jobs_to_report'),
    description: t1('description_jobs_to_report'),
    icon: {
      position: 'left',
      type: 'bar-chart',
    },
  },
];

export const menuItems = ({ conf }, getItemsDashboard = false) => {
  if (!getItemsDashboard) {
    return [
      {
        url: getUrl('report/dashboard'),
        title: t1('dashboard'),
        icon: {
          position: 'left',
          type: 'dashboard',
        },
      },
    ];
  }

  const enableItems = conf && conf.list_of_report_menu;
  const items = [];
  if (enableItems) {
    allMenuItems().forEach((item) => {
      if (enableItems.includes(item.id)) {
        items.push(item);
      }
    });
  }

  if (window.isETEP) {
    items.push({
      id: 'training-plan-report',
      url: getUrl('report/training-plan'),
      title: t1('training_plan'),
      description: t1('report_of_training_plan'),
      icon: {
        position: 'left',
        type: 'bar-chart',
      },
    });
  }

  return items;
};
