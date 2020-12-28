const urls = {
  search_enrolment_plan_members: '/api/v2/enrolment-plan/search-members',
  members_overview_stats: '/taphuan/enrolment-plan/get-members-overview-stats',
  enrolment_plan_progress: '/enrolment-plan/report/get-progress',
  enrolment_plan_learners_progress_new:
    '/enrolment-plan/report/get-enrolment-plan-learners-progress',
  get_enrolment_plan_template_options:
    '/enrolment-plan-template/schema-form/get-enrolment-plan-template-options',
  get_student_courses_progress_in_enrolment_plan:
    'enrolment-plan/report/get-student-courses-progress-in-enrolment-plan',

  enrolment_plan_overall_learning_statistics:
    '/enrolment-plan/report/enrolment-plan-overall-learning-statistics',
  enrolment_plan_overall_progress:
    '/api/v2/report/get-enrolment-plan-overall-progress',

  // many of these are deprecated
  enrolment_plan_credit_progress:
    '/api/v2/report/get-enrolment-plan-credit-progress',
  enrolment_plan_stationery_usage_rate:
    '/asset/api/search-stationery-usage-rate?type=enrolment-plan',
  enrolment_plan_learners_progress:
    '/api/v2/report/get-enrolment-plan-learners-progress',
  enrolment_plan_not_started_learners:
    '/api/v2/report/get-enrolment-plan-not-started-learners',
  export_enrolment_plan_not_started_learners:
    'api/v2/report/export-enrolment-plan-not-started-learners',

  enrolment_plan_credits_overall_progress:
    '/api/v2/report/get-enrolment-plan-credits-overall-progress',
  export_enrolment_plan_credits_overall_progress:
    'api/v2/report/export-enrolment-plan-credits-overall-progress',
  export_enrolment_plan_learners_progress:
    'api/v2/report/export-export-enrolment-plan-learners-progress',
  notification_warning_users_in_epl: '/enrolment-plan/api/send-notify-warning',
  add_enrolment_plan_member_relations:
    '/enrolment-plan/api/add-member-relations',

  // get_all_enrolment_plan_teachers:
  //   '/enrolment-plan/api/get-all-enrolment-plan-teachers',

  get_surveys_targeting_enrolment_plan_teachers:
    '/enrolment-plan/api/get-surveys-targeting-enrolment-plan-teachers',
  search_survey_takes_targeting_enrolment_plan_teachers:
    '/enrolment-plan/api/search-survey-takes-targeting-enrolment-plan-teachers',
  enrolment_plan_teacher_survey_report:
    '/enrolment-plan/api/get-teacher-survey-report',
  enrolment_plan_credit_syllabus_survey_report:
    '/enrolment-plan/api/get-credit-syllabus-survey-report',
  preview_import_enrolment_plan_survey_takes:
    '/enrolment-plan/api/preview-import-enrolment-plan-survey-takes',
  import_enrolment_plan_survey_takes:
    '/enrolment-plan/api/import-enrolment-plan-survey-takes',
  get_template_import_enrolment_plan_survey_takes:
    '/enrolment-plan/api/get-template-import-enrolment-plan-survey-takes',
  new_enrolment_plan_teacher_survey_take:
    '/enrolment-plan/api/new-enrolment-plan-teacher-survey-take',
  save_survey_take_question_answer_for_surveys_of_enrolment_plan_users:
    '/enrolment-plan/api/save-survey-take-question-answer-for-surveys-of-enrolment-plan-users',
  get_surveys_targeting_enrolment_plan_credit_syllabuses:
    '/enrolment-plan/api/get-surveys-targeting-enrolment-plan-credit-syllabuses',
  search_survey_takes_targeting_enrolment_plan_credit_syllabuses:
    '/enrolment-plan/api/search-survey-takes-targeting-enrolment-plan-credit-syllabuses',
  new_enrolment_plan_credit_syllabus_survey_take:
    '/enrolment-plan/api/new-enrolment-plan-credit-syllabus-survey-take',
  save_survey_take_question_answer_for_surveys_of_a_target_in_enrolment_plan:
    '/enrolment-plan/api/save-survey-take-question-answer-for-surveys-of-a-target-in-enrolment-plan',
  get_enrolment_plan_surveys_batch_insert_options:
    '/enrolment-plan/api/get-enrolment-plan-surveys-batch-insert-options',
  auto_create_enrolment_plan_courses_and_add_members:
    '/api/v2/enrolment-plan/auto-create-enrolment-plan-courses-and-add-members',
  can_auto_create_courses_and_add_users_to_enrolment_plan:
    '/api/v2/enrolment-plan/can-auto-create-courses-and-add-users-to-those-courses',
  search_user_who_can_approve_enrolment_plan_members:
    '/api/v2/enrolment-plan/search-user-who-can-approve-enrolment-plan-members',
  get_enrolment_plan_info: '/api/v2/enrolment-plan/get-info',
  enrolment_plan_search: '/enrolment-plan/search',
  get_enrolment_plan_options: '/enrolment-plan/api/get-enrolment-plan-options',
  // enrolment_plan_members_search: '/enrolment-plan/api/members-search',
  get_enrolment_plan_credit_syllabus_options:
    '/enrolment-plan/api/get-enrolment-plan-credit-syllabus-options',
  get_enrolment_plan_course_options:
    '/enrolment-plan/api/get-enrolment-plan-course-options',
  get_suggested_enrolment_plan_code: '/enrolment-plan/api/get-suggested-code',
  is_enrolment_plan_ready_for_execute:
    '/enrolment-plan/api/is-enrolment-plan-ready-for-execute',
  get_not_approved_enrolment_plan_courses:
    '/enrolment-plan/api/get-not-approved-enrolment-plan-courses',
  get_enrolment_plan_members_who_are_not_assigned_to_all_enrolment_plan_credit_syllabuses:
    '/enrolment-plan/api/get-enrolment-plan-members-who-are-not-assigned-to-all-enrolment-plan-credit-syllabuses',
  get_enrolment_plan_members_who_need_confirmed:
    '/enrolment-plan/api/get-enrolment-plan-members-who-need-confirmed',
  get_enrolment_plan_statistics:
    '/enrolment-plan/api/get-enrolment-plan-statistics',
  get_credit_syllabuses_of_enrolment_plans:
    '/enrolment-plan/api/get-credit-syllabuses-of-enrolment-plans',
  add_user_to_enrolment_plan_group_through_request:
    '/enrolment-plan/api/add-user-to-enrolment-plan-group-through-request',
  add_group_users_to_enrolment_plan:
    '/enrolment-plan/api/add-group-users-to-enrolment-plan',
  submit_enrolment_plan_members_for_approval:
    '/enrolment-plan/api/submit-enrolment-plan-members-for-approval',
  search_members_in_ep_to_add_to_course:
    '/enrolment-plan/api/search-members-in-ep-to-add-to-course',
  invite_all_enrolment_plan_members_to_course:
    '/enrolment-plan/api/invite-all-enrolment-plan-members-to-course',

  attach_smart_group_to_enrolment_plan:
    '/enrolment-plan/api/attach-smart-group-to-enrolment-plan',
  sync_users_between_smart_groups_and_enrolment_plans:
    '/enrolment-plan/api/sync-users-between-smart-groups-and-enrolment-plans',
  execute_enrolment_plans_if_possible:
    '/enrolment-plan/api/execute-all-possible-enrolment-plans',
  is_any_enrolment_plan_member_not_assigned_to_all_enrolment_plan_credit_syllabuses:
    '/api/v2/enrolment-plan/is-any-enrolment-plan-member-not-assigned-to-all-enrolment-plan-credit-syllabuses',
  cron_jobs_to_log_report_enrolment_plan_learner_progress:
    '/enrolment-plan/progress/sync-learner-progress',
};

export const taphuanSmartEnrolmentPlanApi = {
  get_organization_data_to_create_taphuan_smart_enrolment_plan:
    '/enrolment-plan/taphuan-smart-enrolment-plan/get-organization-data-to-create-taphuan-smart-enrolment-plan',
  get_credit_syllabuses_data_to_create_taphuan_smart_enrolment_plan:
    '/enrolment-plan/taphuan-smart-enrolment-plan/get-credit-syllabuses-data-to-create-taphuan-smart-enrolment-plan',
  get_assign_courses_data_for_credit_syllabus_and_organizations:
    '/enrolment-plan/taphuan-smart-enrolment-plan/get-assign-courses-data-for-credit-syllabus-and-organizations',
  search_course_teachers:
    '/enrolment-plan/taphuan-smart-enrolment-plan/search-course-teachers',
  remove_course_teachers:
    '/enrolment-plan/taphuan-smart-enrolment-plan/remove-course-teachers',
  search_teachers_to_add_to_course:
    '/enrolment-plan/taphuan-smart-enrolment-plan/search-teachers-to-add-to-course',
  add_course_teachers:
    '/enrolment-plan/taphuan-smart-enrolment-plan/add-course-teachers',
  search_course_users:
    '/enrolment-plan/taphuan-smart-enrolment-plan/search-course-users',
  remove_course_users:
    '/enrolment-plan/taphuan-smart-enrolment-plan/remove-course-users',
  search_users_to_add_to_course:
    '/enrolment-plan/taphuan-smart-enrolment-plan/search-users-to-add-to-course',
  add_course_users:
    '/enrolment-plan/taphuan-smart-enrolment-plan/add-course-users',
  search_teachers_workload:
    '/enrolment-plan/taphuan-smart-enrolment-plan/search-teachers-workload',
};

export default urls;
