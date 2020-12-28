import React from 'react';

import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import contestApiUrls from 'components/admin/contest/endpoints';
import budgetApiUrls from 'components/admin/budgetary-allocations/endpoints';

import { reportMenuIds } from '../menu/sub-left-menu-configs';

export const reportJobUsageTypes = {
  REPORT_MENU: 'report_menu',
};

export const reportJobs = () => [
  {
    id: 'log_teaching_hours',
    title: t1('log_teaching_hours'),
    type: t1('daily'),
    description: t1('log_teachings_hours_via_session,_teacher,_and_contract'),
    url: apiUrls.cron_jobs_to_log_teaching_hours,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.REPORT_TEACHERS_OF_ORGANIZATION,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.TEACHING_HOURS_OF_TEACHERS,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'time_sheet',
  },
  {
    id: 'log_report_enrolment_plan_learner_progress',
    title: t1('log_report_enrolment_plan_learner_progress'),
    type: t1('daily'),
    description: `${t1(
      'save_the_progress_of_every_students_in_all_enrolment_plans_to_report_enrolment_plan_learner_progress_collection',
    )} (${t1(
      'the_reason_this_collection_seems_similar_to_report_progress_master_is_because_that_collection_is_refactored_after_this_collection_is_created',
    )}). ${t1(
      'this_job_also_log_the_overall_statistic_of_enrolment_plan_(the_data_that_we_see_in_enrolment_plan_dashboard)',
    )}`,
    used_for_reports: [
      {
        id: reportMenuIds.ORGANIZATION_PROGRESS,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        title: t1('enrolment_plan_dashboard'),
      },
      {
        title: t1('enrolment_plan_learner_progress_report'),
      },
      {
        id: reportMenuIds.STUDENT_PROGRESS,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    url: epApiUrls.cron_jobs_to_log_report_enrolment_plan_learner_progress,
    params: {},
    collection_to_store_data: 'report_enrolment_plan_learner_progress',
  },
  {
    id: 'log_report_contest_result',
    title: t1('log_report_contest_result'),
    type: t1('daily'),
    description: t1('save_data_to_contest_result_report'),
    url: contestApiUrls.cron_jobs_to_log_report_contest_result,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.REPORT_CONTEST_RESULT,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'report_contest_result',
  },
  {
    id:
      'log_progress_of_enrolment_plan_courses_student_to_report_progress_master',
    title: t1(
      'log_progress_of_enrolment_plan_courses_student_to_report_progress_master',
    ),
    type: t1('daily'),
    description: t1(
      'save_the_progress_of_every_students_in_all_enrolment_plan_courses_to_report_progress_master_collection',
    ),
    url:
      apiUrls.log_progress_of_enrolment_plan_courses_student_to_report_progress_master,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.REPORT_BY_SUBJECT,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.REPORT_BY_ORGANIZATION,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.REPORT_BY_OPERATING_CAPACITY,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.PROGRESS_MASTER_BY_ACADEMIC_CATEGORIE,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.PROGRESS_MASTER_BY_SKILL_LEVEL,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.ENTERPRISE_DASHBOARD,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.COMPARE_ORGANIZATIONS,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'report_progress_master',
  },
  {
    id: 'log_feedback_to_report_progress_master',
    title: t1('log_feedback_to_report_progress_master'),
    type: t1('daily'),
    description: `${t1(
      'save_user_feedback_data_to_report_progress_master_collection._you_must_be_run_job_log_progress_of_enrolment_plan_courses_student_to_report_progress_master_first',
    )}`,
    url: apiUrls.cron_jobs_to_log_feedback_to_report_progress_master,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.ENTERPRISE_DASHBOARD,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.COMPARE_ORGANIZATIONS,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'report_progress_master',
  },
  {
    id: 'log_expense_to_report_budgetary_master_by_equivalent_positions',
    title: t1('log_expense_to_report_budgetary_master_by_equivalent_positions'),
    type: t1('daily'),
    description: t1(
      'save_data_to_report_budgetary_master_collection_with_type_equivalent_positions',
    ),
    url:
      budgetApiUrls.cron_job_to_log_expense_to_report_budgetary_master_by_equivalent_positions,
    used_for_reports: [
      {
        title: t1('budgetary_allocation_reports'),
        href: getUrl('budgetary-allocations'),
      },
    ],
    params: {},
    collection_to_store_data: 'report_budgetary_master',
  },
  {
    id: 'log_assigned_hours_for_rooms_capacity',
    title: t1('log_assigned_hours_for_rooms_capacity'),
    domainHintText: 'SIS',
    type: t1('daily'),
    description: t1('save_number_of_assigned_hours_to_report_rooms_capacity'),
    url: apiUrls.cron_jobs_to_log_rooms_capacity,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.ROOMS_CAPACITY,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'rooms_capacity',
  },
  {
    id: 'log_used_hours_for_rooms_capacity',
    title: t1('log_used_hours_for_rooms_capacity'),
    domainHintText: 'SIS',
    type: t1('daily'),
    description: t1('save_number_of_used_hours_to_report_rooms_capacity'),
    url: apiUrls.cron_jobs_to_log_rooms_capacity,
    params: { is_used: 1 },
    used_for_reports: [
      {
        id: reportMenuIds.ROOMS_CAPACITY,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'rooms_capacity',
  },
  // {
  //   id: 'log_progress_of_course',
  //   title: t1('log_progress_of_course'),
  //   domainHintText: 'SIS',
  //   type: t1('daily'),
  //   description: t1(
  //     'save_progress_of_users_of_every_courses_to_a_collection_for_report_scores_by_faculty_and_major',
  //   ),
  //   url: apiUrls.cron_jobs_to_log_progress_of_course,
  //   params: {},
  //   used_for_reports: [
  //     {
  //       id: reportMenuIds.SCORES_BY_MAJOR,
  //       type: reportJobUsageTypes.REPORT_MENU,
  //     },
  //     {
  //       id: reportMenuIds.SCORES_BY_FACULTY,
  //       type: reportJobUsageTypes.REPORT_MENU,
  //     },
  //   ],
  //   collection_to_store_data: 'report_progress_course',
  // },
  {
    id: 'log_progress_of_semester',
    title: t1('log_progress_of_semester'),
    domainHintText: 'SIS',
    type: t1('daily'),
    description: t1(
      'save_progress_of_semester_to_a_collection_for_report_scores_by_semester',
    ),
    url: apiUrls.cron_jobs_to_log_progress_of_semester_credit,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.SCORES_BY_SEMESTER_CREDIT,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'report_progress_semester_credit',
  },
  {
    id: 'log-data-to-report-ums-master',
    title: t1('log_data_to_report_ums_master'),
    domainHintText: 'SIS',
    type: t1('daily'),
    description: t1('save_data_to_report_ums_master_collection'),
    url: apiUrls.log_data_to_report_ums_master,
    params: {},
    used_for_reports: [
      {
        id: reportMenuIds.REPORT_BY_SUBJECT,
        type: reportJobUsageTypes.REPORT_MENU,
      },
      {
        id: reportMenuIds.ATTENDANCE_REPORT,
        type: reportJobUsageTypes.REPORT_MENU,
      },
    ],
    collection_to_store_data: 'report_ums_master',
  },
];
