// 'site/ai/get-data-schema'
export default {
  synchronize_progress:
    '/progress/data/synchronize-progress-from-database-to-redis',
  synchronize_unlock: '/path/data/unlock',
  generate_syllabus_from_template: '/syllabus/new-syllabus-from-template',
  generate_exam_scos_from_template:
    '/syllabus/generate-exam-scos-from-template',
  cache_tco_info: '/site/data/batch-update-tco-info-to-redis',
  cache_users_info: '/user/data/cache-all-users-to-redis',
  syllabus_search: '/syllabus/my',
  syllabus_update: '/syllabus/update',
  bank_search: '/api/v1/syllabus/search',
  course_search: '/course/my',
  course_search_for_invite: '/course/search?for_invite=1',
  role_search: 'role/search',
  user_group_report: '/report/search-report',
  certificate_users: '/course/certificate/get-certificate-users',
  get_graduation_users: '/course/api/get-users-with-score-information',
  get_progress_of_graduating_seniors:
    '/course/api/get-progress-of-graduating-seniors',
  get_progress_of_offline_exam: '/course/api/get-progress-of-offline-exam',
  set_rubric_progress: '/skill/api/save-rubric-score',
  set_user_pass_fail_status_in_course:
    '/course/api/set-user-pass-fail-status-in-course',
  save_offline_exam_academic_score:
    '/skill/api/save-offline-exam-academic-score',

  course_marking: '/course/marking',
  course_communicate: '/course/communicate',
  course_set_price_item: ({ id, tcoIid }) =>
    `course/update?id=${id}&_sand_step=tco_price&tco_iid=${tcoIid}&submit=1`,
  get_snippet: '/api/v1/syllabus/get',
  get_course_api: '/course/api/get-course',
  get_skill_info: '/skill/api/get',
  get_registered_course_detail: '/course/api/get-registered-course-detail',
  get_current_semesters: '/semester/get-current-semesters',
  get_work_note: 'work-note/search',
  get_data_overview: '/user/api/get-student-overview-stats',
  calculate_attendant_users: '/attendance/calculate-attendant-users',
  calculate_attendances_score: '/attendance/calculate-attendances-score',
  conf_reload_default: '/conf/load-default',
  conf_search: 'conf/api/search',
  venue_search: '/venue/search',
  venue_room_search: '/venue/search',
  get_venue_by_parent: '/venue/api/get-venue-by-parent',
  timetable_search: '/timetable/search',
  sinvite_search: '/sinvite/api/search',
  skill_search: '/skill/search',
  skill_relation_search: '/skill/search',
  skill_edit_full_info: '/skill/api/get-full-skill-info',
  user_search: '/user/search',
  staff_search: '/user/search?_sand_step=staff',
  parent_search: '/user/search?_sand_step=parent',
  support_payment_search: '/user/search',
  search_teacher_by_visible: '/user/api/search-teacher-by-visible',
  user_school_search: '/user/search',
  students_to_add_scholarship_search: '/user/search',
  transaction_search: '/transaction/search',
  import_students_request: '/user/data/new',
  import_students_request_search: '/user/data/search',
  import_request_search: '/import/index/search',
  import_students_to_group_in_university:
    '/user/data/import-students-to-group-in-university',
  import_students_download_template_request: '/user/template/download-template',
  import_students_action_request: '/user/data/import-data',
  import_rubrics_request: 'take/data/new',
  import_rubrics_request_search: '/take/data/search',
  import_rubrics_action_request: '/take/data/import-data',
  new_organizations_import: '/organization/api/new-organizations-import',
  organizations_import_search: '/organization/api/import-search',
  import_organizations: '/organization/api/import-organizations',
  new_path_import: '/path/data/new-path-import',
  path_import_search: '/path/data/path-import-search',
  import_path: '/path/data/import-path',
  send_email_with_certificate:
    '/course/certificate/send-email-with-certificate',
  send_email_with_certificates: '/course/certificate/send-certificate-users',
  customize_test: '/paper/customize-test',
  room_search: '/room/search',
  contract_search: '/contract/search',
  ico_search: '/ico/search',
  semester_search: '/semester/search',
  teaching_experience_search: '/user/search-teaching-experiences',
  path_search: '/path/search',
  program_search: '/path/search',
  subjectgroup_search: '/path/search',
  classgroup_search: '/path/search',
  teaching_plan_overview: '/plan/overview',
  plan_search: '/plan/search',
  credit_plan_search: '/plan/search-credit',
  major_program_search: '/plan/search-major-program',
  multi_degree_search: '/degree/api/search-multi-degree',
  open_paths: '/path/api/get-open-paths',
  get_categories_info: '/api/v2/category/get-categories-info',
  get_category_info: '/api/v2/category/get-category-info',
  academic_category_search: '/api/v2/category/search?type=academic',
  fee_category_search: '/api/v2/category/search?type=fee',
  major_search: '/api/v2/category/search?type=major',
  category_delete: '/category/index/delete',
  user_in_group_search_by_skill: 'api/v2/user/search-by-skill',
  template_search: '/template/search',
  fetch_node: '/api/v2/syllabus/get',
  get_total_notifications: 'notification/api/get-total-notifications',
  get_list_question_oe_assigned_in_course_of_user:
    '/question/api/get-list-question-oe-assigned',
  get_teachers_who_can_teach_syllabus: '/api/v2/contract/teachers',
  roles_menu_url: '/school/api/get-menu-config-by-role',
  children_category: '/category/api/get-children-categories',
  faq_search: '/faq/search',
  degree_search: '/degree/search',
  degree_preview: '/degree/preview',
  event_search: '/event/search',
  get_upcoming_event_blogs: '/page/search?is_upcoming=true',
  get_school_dashboard_overview_info:
    '/site/api/get-school-dashboard-overview-info',
  update_max_iid_to_redis: '/site/data/update-iid',
  get_current_classes: 'course/api/get-current-classes-info',
  get_current_rooms: 'venue/api/get-current-rooms-info',
  get_current_users: 'user/api/get-current-users-info',
  wallet_search: '/wallet/api/get-wallets',
  wallet_type_search: '/wallet-type/search',
  passdef_search: '/passdef/search',
  dashboard_configs: (mode, itemsPerPage) => {
    if (mode === 'compulsoryCourses') {
      return '/site/api/get-invited-courses?type=compulsory';
    } else if (mode === 'assignedCourses') {
      return '/site/api/get-invited-courses?type=waiting';
    } else if (mode === 'coursesInProgress') {
      return `site/api/my-courses?type=learning&items_per_page=${itemsPerPage ||
        -1}`;
    } else if (mode === 'completedCourses') {
      return `site/api/my-courses?type=learning&mode=passed&items_per_page=${itemsPerPage ||
        -1}`;
    } else if (mode === 'failedCourses') {
      return `site/api/my-courses?type=learning&mode=failed&items_per_page=${itemsPerPage ||
        -1}`;
    } else if (mode === 'publicCourses') {
      const api = 'site/api/get-public-courses';
      return typeof itemsPerPage !== 'undefined'
        ? `${api}?items_per_page=${itemsPerPage}`
        : api;
    } else if (mode === 'featuredCourses') {
      return 'site/api/get-featured-courses';
    } else if (mode === 'rejectedCourses') {
      return '/site/api/get-invited-courses?type=reject';
    } else if (mode === 'myPaths') {
      return '/site/api/my-path';
    } else if (mode === 'mySkills') {
      return '/student/api/get-positions-of-user-with-skills';
    } else if (mode === 'programsOfSkill') {
      return '/syllabus/api/get-credit-syllabuses-of-skill';
    } else if (mode === 'categoriesCourses') {
      return 'site/api/get-public-courses';
    }
    return '/';
  },
  menu_configs: (mode) => {
    if (mode === 'admin') {
      return '/api/v2/site/teacher-roles-menu';
    }
    return '/';
  },
  post_new_node: (ntype, action = 'new') => {
    if (ntype === 'new-package') {
      return '/card/new-package';
    }
    if (ntype === 'relation') {
      return 'api/v1/site/add-relation';
    }
    if (['major', 'academic-category', 'fee-category'].includes(ntype)) {
      return '/category/index/new';
    }
    if (['organization', 'job-position'].includes(ntype)) {
      return `/${ntype}/api/${action}`;
    }

    return `/${ntype}/${action}`;
  },
  update_node: (ntype, step) => {
    if (ntype === 'translate')
      return `/${ntype}/index/update${step ? `?step=${step}` : ''}`;
    if (ntype === 'new-package') {
      return `card/update-package${step ? `?step=${step}` : ''}`;
    }
    if (ntype === 'enrolment_plan') {
      return `enrolment-plan/update${step ? `?_sand_step=${step}` : ''}`;
    }
    return `/${ntype}/update${step ? `?_sand_step=${step}` : ''}`;
  },
  delete_node: (ntype) => {
    if (ntype === 'translate') return `/${ntype}/index/delete`;
    if (ntype === 'user_goal') return '/user-goal/delete';
    if (ntype === 'abac_role') return '/abac-role/delete';
    if (ntype === 'enrolment_plan') return '/enrolment-plan/delete';
    if (ntype === 'training_plan') return '/training-plan/delete';
    if (ntype === 'time_sheet') return '/time-sheet/delete';
    return `/${ntype}/delete`;
  },
  get_detail: (item, ntype) => {
    const module = ntype || item.ntype;
    if (!module) {
      return '/';
    }
    if (item) {
      return `/${module}/detail?iid=${item.iid}`;
    }
    return `/${module}/detail`;
  },
  exam_shift_search: '/course/my',
  offline_exam_search: '/course/my',
  get_info_of_class_groups: '/user/api/get-info-of-class-groups',

  user_learn_search: '/api/v2/report/user-learn',
  teacher_overview_report: '/api/v2/report/teacher-overview',
  teaching_hours_search: '/api/v2/report/teaching-hours',
  teachers_by_faculty_search: '/api/v2/report/teaching-hours-group-by-teacher',
  teachers_by_credit_search: '/api/v2/report/teaching-hours-group-by-teacher',
  rooms_capacity_search: '/api/v2/report/rooms-capacity',
  scores_by_course_search: '/api/v2/report/scores-by-course',
  scores_by_semester_credit_search: '/api/v2/report/scores-by-semester-credit',
  compare_organizations: '/api/v2/report/compare-organizations',
  get_report_by_subject: '/api/v2/report/get-report-by-subject',
  get_export_by_subject: '/api/v2/report/get-export-by-subject',
  get_student_detail_progress: '/api/v2/report/get-student-detail-progress',
  get_organization_progress: '/api/v2/report/get-organization-progress',
  progress_of_path_user: '/api/v2/report/progress-of-path-user',
  organizations_learning_reports:
    '/api/v2/report/get-organizations-learning-reports',
  enterprise_dashboard_reports:
    '/api/v2/report/get-enterprise-dashboard-reports',

  change_exam_shift_search: '/user/search',
  province_district_search: '/pds/api/search-province',
  school_search: '/pds/api/search-school',
  translate_search: '/translate/index/search',

  // report_number_of_users_by_province:
  //   '/report/preview-report-number-of-users-by-province',
  // report_number_of_users_by_district:
  //   '/report/preview-report-number-of-users-by-district',
  // report_number_of_users_by_school_in_province:
  //   '/report/preview-report-number-of-users-by-school-in-province',
  // report_number_of_users_by_school_in_district:
  //   '/report/preview-report-number-of-users-by-school-in-district',
  // report_number_of_users_in_one_round_by_school:
  //   '/report/preview-report-number-of-users-in-one-round-by-school',
  // report_chart_users_by_province:
  //   '/report/preview-chart-number-of-users-by-province',
  // report_chart_users_by_district:
  //   '/report/preview-chart-number-of-users-by-district',
  // report_chart_users_by_school_in_province:
  //   '/report/preview-chart-number-of-users-by-school-in-province',
  // report_chart_users_by_school_in_district:
  //   '/report/preview-chart-number-of-users-by-school-in-district',
  // report_chart_users_by_grade: '/report/preview-chart-number-of-users-by-grade',
  export_user: '/user/data/export',
  export_abnormal_accounts: '/user/api/export-abnormal-accounts',
  export_graduating_seniors: '/group/api/export-graduating-seniors',
  export_members_in_senior_group: '/group/api/export-members-in-senior-group',
  export_users_in_course: '/course/data/export-users-in-course',
  export_syllabus_for_cost: '/course/data/export-syllabus-for-cost',
  export_users_in_offline_exam: '/course/data/export-users-in-offline-exam',
  export_students_by_course: '/report/data/export-students-by-course',
  export_teaching_hours: '/report/data/export-teaching-hours',
  export_teachers_by_faculty:
    '/report/data/export-teaching-hours-group-by-teacher?mode=faculty',
  export_teachers_by_credit:
    '/report/data/export-teaching-hours-group-by-teacher?mode=credit',
  export_rooms_capacity: '/report/data/export-rooms-capacity',
  export_scores_by_course: '/report/data/export-scores-by-course',
  export_scores_by_semester_credit:
    '/report/data/export-scores-by-semester-credit',
  cron_jobs_to_remind_finish_course:
    '/notification/api/remind-finish-course-for-all-users',
  // cron_jobs_to_import_organizations: '/category/api/import-organizations',

  log_progress_of_enrolment_plan_courses_student_to_report_progress_master:
    '/report/api/log-progress-of-enrolment-plan-courses-student-to-report-progress-master',
  cron_jobs_to_log_feedback_to_report_progress_master:
    '/report/api/log-feedback-to-report-progress-master',
  cron_jobs_to_log_teaching_hours: '/time-sheet/api/log-teaching-hours',
  // cron_jobs_to_log_progress_of_course: 'report/api/log-report-progress-courses',
  cron_jobs_to_log_progress_of_semester_credit:
    'report/api/log-report-progress-semester-credits',
  cron_jobs_to_log_rooms_capacity: '/report/api/log-rooms-capacity',
  add_relation: 'api/v1/site/add-relation',
  remove_relation: 'api/v1/site/remove-relation',
  // adblock browser extensions would stop this request
  // tracker_progress: (action = 'get') => `/tracker?a=${action}`,
  // tracker_progress: (action = 'get', realtime = false) => `/trckr2/${action}`,
  tracker_progress_get: (realtime = false) => `/trckr2/get`,
  tracker_progress_save: (realtime = false) =>
    realtime ? `/site/tracker/save` : `/trckr2/save`,

  get_tcos_price: '/course/api/get-tcos-price',
  pay_for_path: '/path/api/pay',
  get_paths: '/path/api/get-paths?&_v=101',
  get_package_locked_paper: '/paper/api/get-package-payment',
  get_trial_packages: '/site/api/get-trial-packages?&_v=2',
  login_oauth_success: '/user/oauth-success',
  forgot_password: '/user/forgot-password',
  get_bank_accounts: '/site/payment/bank-accounts',
  get_user_balance: '/user/balance/?&_v=2',

  get_information_by_domain: '/site/get-information-by-domain',
  get_translations: '/site/api/get-translations',

  get_phonetic_diff: '/vocabset/api/diff-match-phonetic',
  user_info: '/user/api/full-info',
  get_in_course_exam_info: '/take/api/get-in-course-exam-info',
  get_info_on_the_tests: '/course/api/info-marking-on-the-tests',
  subscribe_newsletter: 'subscribe-newsletter',
  // TODO: this doesn't live in /user/ module
  handle_invite_course: '/user/index/user-perform-invite-item',
  perform_action_on_relations_between_user_and_learning_item:
    '/sinvite/api/perform-action-on-relations-between-user-and-learning-item',
  search_home_courses: '/course/api/search-courses',
  get_chat_info: '/api/v2/chat/get',
  new_invite: '/invite/api/new',
  remove_invite: '/api/v2/invite/remove',
  getTakeDetail: '/take/api/get-question-answer',
  suggest_autocomplete: '/suggest',
  get_information_report: '/report/api/get-information-learn-item',
  get_takes_by_course: 'course/api/my-takes-by-course',
  get_adaptive_skills: '/skill/api/get-tree-data',
  deep_clone: '/site/index/deep-clone',
  get_syllabus_with_assignment_of_course:
    '/api/v2/syllabus/get-syllabus-with-assignment-data-of-course',
  get_current_courses: '/student/api/get-current-courses',
  get_assigned_courses: '/student/api/get-assigned-courses',
  update_translate: '/translate/index/update',
  reset_progress: '/progress/api/reset-progress',
  get_all_assignments: '/syllabus/api/get-assignment-of-user',
  get_personal_assignments: '/syllabus/api/get-personal-assignment-of-user',
  check_validity: '/syllabus/check-validity',
  session_search: '/session/search',
  check_take_plagiarism: '/take/api/check-plagiarism',
  set_scale_for_skills: '/skill/api/set-scale-for-skills',
  add_room_to_class: '/course/api/add-rooms',
  remove_room_from_class: '/course/api/remove-room',
  attendance_manage: (courseIid, sessionIid, rootUrl) => {
    if (rootUrl === 'admin') {
      return `/${rootUrl}/course/${courseIid}/session/${sessionIid}/attendance`;
    }
    return `/${rootUrl ||
      'learn'}/timetable/${courseIid}-${sessionIid}/attendance`;
  },
  get_category_tree_related_to_user_from_arbitrary_node:
    '/category/api/get-category-tree-related-to-user-from-arbitrary-node',
  get_transcript: '/student/api/get-transcript',
  get_subject_score_of_user: '/user/api/get-subject-score-of-user',
  get_transcript_by_program_tree: '/student/api/get-transcript-by-program-tree',
  get_import_organization_file_template:
    '/organization/api/get-import-organization-file-template',
  get_import_path_file_template: '/path/data/get-import-path-file-template',
  bank_import_ntype: () => 'import/index/import',
  get_import_file_template_for_ntype: (ntype, categoryType) => {
    if (categoryType) {
      return `user/template/get-import-template?category_type=${categoryType}`;
    }
    return `${ntype}/template/get-import-template`;
  },
  search_academic_categories_that_user_can_create_content:
    '/category/academic/search-academic-categories-that-user-can-create-content',
  goal_search: '/goal/search',
  user_goal_search: '/user-goal/search',
  get_data_for_user_goal_progress_chart:
    '/user-goal/api/get-data-for-user-goal-progress-chart',
  get_skills_of_user_goals: 'user-goal/api/get-skills-related-to-user-goal',
  search_job_position_that_user_can_use_to_create_user_goal:
    '/job-position/goal/search-job-position-that-user-can-use-to-create-user-goal',
  search_custom_goals_to_assign_to_user:
    'goal/api/search-custom-goals-to-assign-to-user',

  get_duplicated_credit_syllabus_in_program:
    '/path/api/get-duplicated-credit-syllabus-in-program',
  get_all_assignments_that_user_can_mark_now:
    '/syllabus/api/get-all-assignments-that-user-can-mark-now',
  get_user_group_categories: '/api/v2/category/search',
  upload_media: `${window.APP_MEDIA_SERVER_URL}/media/upload`,
  upload_avatar: 'file/upload',

  change_notifications_status: '/notification/api/change-notifications-status',

  save_violation: '/take/api/save-violation',

  report_credit_transfert: '/api/v2/report/credit-transfert',

  get_progress_with_learning_items_of_learner:
    '/progress/api/get-progress-with-learning-items',
  /** ** report ***** */
  invited_groups: '/api/v2/report/get-list-of-invited-groups',
  get_fluctuating_groups: '/api/v2/report/get-fluctuating-groups',
  learning_materials: '/api/v2/report/get-learning-materials',
  classgroup_students_search: '/path/api/classgroup-students-search',
  students_for_request_study: '/api/v2/report/get-student-request-study',
  export_students_request_study: '/report/data/export-students-request-study',
  export_transcript: '/api/v2/report/export-transcript',
  export_students_by_course_ums: '/report/api/export-students-by-course-ums',
  can_user_invite_in_all_organizations:
    'invite/api/can-user-invite-in-all-organizations',
  execute_enrolment_session: (id) =>
    `invite/api/execute-enrolment-session?id=${id}`,
  get_equivalent_position_options:
    '/equivalent-position/api/get-equivalent-position-options',
  get_equivalent_positions_for_input_auto_complete:
    '/equivalent-position/api/get-equivalent-positions-for-input-auto-complete',
  get_degrees: '/degree/get-degree-options-for-select-box',
  get_program_tree_by_plan: '/plan/api/get-program-tree-by-plan',
  update_major_program: '/plan/api/update-major-program',
  update_program_with_apply_prerequisites: '/path/api/apply-prerequisites',
  get_all_score_scale: '/skill/api/get-all-score-scale',
  get_credit_syllabuses_to_prerequisites_create_in_program:
    '/path/api/get-credit-syllabuses-to-prerequisites',
  get_credit_syllabuses_created_prerequisites_with_score_scale_in_program:
    '/syllabus/api/get-credit-syllabuses-created-prerequisites-with-score-scale',
  check_allow_to_edit_of_teaching_plan_major_program:
    '/plan/api/check-allow-to-edit-of-teaching-plan-major-program',

  default_message_template_search: (action, method, language) =>
    `/message-template/api/get-default-message-template?tpl_action=${action}&method=${method}&language=${language}`,
  message_template_params_search: (action) =>
    `/message-template/api/get-message-template-params?tpl_action=${action}`,
  message_template_search: '/message-template/search',
  school_message_templates_search: '/school-message-template/api/search',
  school_message_templates_update: (action, method, language) =>
    `/school-message-template/api/update?tpl_action=${action}&method=${method}&language=${language}`,
  process_scorm: '/site/api/process-scorm-file',
  export_student_make_final_contest:
    '/report/api/export-student-make-final-contest',
  get_data_to_edit_equivalent_module:
    '/path/api/get-data-to-edit-equivalent-module',
  export_learning_course: '/report/data/export-learning-course',
  export_course: '/course/data/export',

  get_number_of_learners_by_time:
    '/api/v2/report/get-number-of-learners-by-time',

  teacher_widgets: 'api/v2/site/teacher-widgets',
  export_equivalent_positions_programs:
    '/report/data/export-equivalent-positions-programs',
  log_data_to_report_ums_master: '/report/api/log-data-to-report-ums-master',
  get_report_by_organization: '/api/v2/report/get-report-by-organization',
  get_report_by_operating_capacity:
    '/api/v2/report/get-report-by-operating-capacity',
  get_progress_master_by_academic_categorie:
    '/api/v2/report/get-progress-master-by-academic-categorie',
  get_report_teachers_of_organization:
    '/api/v2/report/get-report-teachers-of-organization',
  get_report_teaching_hours_of_teachers:
    '/api/v2/report/get-report-teaching-hours-of-teachers',
  export_report_teaching_hours_of_teachers:
    '/report/api/export-report-teaching-hours-of-teachers',
  get_report_learning_material_creation:
    '/api/v2/report/get-report-learning-material-creation',
  get_progress_master_by_skill_level:
    '/api/v2/report/get-progress-master-by-skill-level',
  time_sheet_search: '/time-sheet/index/search',
  group_attendance_search: '/attendance/search',
  report_attendance_by_user: '/attendance/api/report-by-user',
  search_courses_that_user_has_role:
    '/course/api/search-courses-that-user-has-role',
  search_groups_that_user_is_gvcn: '/k12/group/search-groups-that-user-is-gvcn',
  get_bus_by_user: '/bus/api/get-bus-by-user',

  get_report_by_scholarship: '/report/api/get-report-by-scholarship',
  get_student_status_report: '/report/api/get-student-status-report',
  get_student_status_export: '/report/api/get-student-status-export',
  get_list_of_student_failed_subject:
    '/report/api/get-list-of-student-failed-subject',
  get_gpa_of_student_by_semester:
    '/user-major/api/get-gpa-of-student-by-semester',
  export_gpa_of_student_by_semester:
    '/user-major/api/export-gpa-of-student-by-semester',
  get_amount_collected_according_to_the_cashier:
    '/invoice/api/get-amount-collected-according-to-the-cashier',
  export_amount_collected_according_to_the_cashier:
    '/invoice/api/export-amount-collected-according-to-the-cashier',
  get_debit_fees_of_student: '/fee/api/get-debit-fees-of-student',
  export_debit_fees_of_student: '/fee/api/export-debit-fees-of-student',
  get_list_of_student_failed_subject_export:
    '/report/api/get-list-of-student-failed-subject-export',
  get_attendance_report: '/report/api/get-attendance-report',
  get_attendance_export: '/report/api/get-attendance-export',

  cache_organization_data_for_searching:
    'organization/data/cache-organization-data-for-searching',

  get_schools_for_select_box: '/school/schema-form/get-schools-for-select-box',
  reset_organizations_pid_from_department_parent_id:
    '/organization/data/reset-organizations-pid-from-department-parent-id',
  get_student_enrolment_plans: 'student/api/get-student-enrolment-plans',
  get_student_enrolment_plans_by_iid: 'student/api/get-enrolment-plans',
  get_student_courses_in_enrolment_plan:
    'student/api/get-student-courses-in-enrolment-plan',
  remove_course_sinvites_in_a_timestamp:
    'course/data/remove-course-sinvites-in-a-timestamp',
  remove_users_from_all_courses: 'user/data/remove-users-from-all-courses',

  // UMS
  finance_template_search: 'finance-template/search',
  benefit_search: 'finance-template/search',
  get_benefits:
    'finance-template/search?classification[]=benefit&status[]=approved',
  applied_fee_template_created: 'applied-fee-template/search',
  fee_collecting_phase_search: 'fcp/search',
  get_all_target_groups: '/target-group/api/get-all-target-groups',
  user_major_search: '/user-major/search',
  send_sms_for_target_group: '/user-major/api/send-sms-for-target-group',
  export_user_major: '/user-major/api/export',
  processing_requests_search: '/request/search',
  processing_req_search: '/req/search',
  get_target_discounts: '/finance-template/api/get-target-discounts',
  get_applicable_benefits_to_deposit_for_user:
    '/applied-fee-template/api/get-applicable-benefits-to-deposit-for-user',
  calculate_total_amount_payment_to_deposit_for_user:
    '/invoice/api/calculate-total-amount-payment-to-deposit-for-user',
  get_detail_information_forms_of_traing:
    '/degree/api/get-detail-information-forms-of-traing',
  fee_search: '/fee/search',
  fee_group_by_users: '/fee/api/get-fees-group-by-users',
  invoice_search: '/invoice/search',
  deposit_search: '/invoice/search',
  set_score_final_for_subject: '/take/api/set-score-final-for-subject',
  get_finance_template_possible_target_payers:
    '/finance-template/api/get-possible-target-payers',
  export_course_pmd_result_of_student:
    'report/api/export-course-pmd-result-of-student',
  get_fees_of_user: '/fee/api/get-fees-of-user',
  get_students_take_resit_exam: '/course/api/get-students-take-resit-exam',
  get_students_take_final_exam:
    '/course/api/search-user-who-can-take-final-exam',
  export_student_attendance_template:
    '/report/api/export-student-attendance-template',
  report_learning_course: '/report/api/report-learning-course',
  request_type_search: '/request-type/index/search',
  get_detail_request_type: '/request-type/api/get-detail',
  get_training_modes: '/path/api/get-training-modes',
  get_training_levels: '/path/api/get-training-levels',
};
