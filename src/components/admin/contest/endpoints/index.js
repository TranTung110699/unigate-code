export default {
  load_paper: '/paper/api/load-paper',
  load_paper_by_take_id: '/paper/api/load-paper-by-take-id',
  load_paper_for_preview: '/paper/api/load-paper-for-preview',
  search_round_paper: '/paper/index/search',
  // take
  get_take_info: '/take/api/get-take-info', // stuff like course/ paper id, exam...NO RESULTS
  get_take_by_id: '/take/api/get-take-details',
  upload_take_redux_log: '/take/api/upload-redux-log',
  mark_redux_log: '/take/api/mark-redux-log', // mark a take by their redux log, not by saved score
  mark_one_take: '/take/api/mark-one-take', // mark a take by their redux log, not by saved score

  get_realtime_dashboard_for_shift: '/contest/api/shift-real-time-stats',
  get_take_info_for_preview: '/take/api/get-take-info-for-preview',
  get_take_info_for_preview_by_exam_order:
    '/take/api/get-take-info-for-preview-by-exam-order',
  get_fake_take_for_paper_preview: '/paper/api/get-fake-take-info-for-paper',
  save_take: '/take/api/save',
  mark_test: '/take/index/test-mark',

  // Round & shift
  get_exam_rounds_for_select_box:
    '/exam-round/schema-form/get-exam-rounds-for-select-box',
  get_exam_shifts_for_select_box:
    '/exam-shift/schema-form/get-exam-shifts-for-select-box',
  get_exam_round_info: '/exam-round/api/get',
  mark_whole_round: '/exam-round/api/mark',
  exam_round_search: '/exam-round/search',
  exam_shift_search: '/exam-shift/api/search',
  // used in pre-select exam screen where user can change the shift
  get_exam_shifts_available_for_user:
    '/contest/api/get-exam-shift-available-for-user',
  change_exam_shift_for_user: '/user/update',

  generate_otp_for_one_contestant:
    '/contest/api/generate-otp-for-one-contestant',
  confirm_otp: '/contest/api/confirm-otp',
  change_users_exam_round: '/exam-round/api/update-exam-round-by-ids',

  import_contestants: '/contest/api/import-contestants',
  export_contestants_list: '/contest/api/export-contestants-list',

  change_exam_shift_for_users: '/exam-shift/api/change-exam-shift-for-users',
  change_exam_round_for_users: '/exam-shift/api/change-exam-round-for-users',
  get_current_contests: '/contest/api/get-user-current-contests',
  get_contests_result: '/contest/api/get-user-taken-contests-results',
  get_exam_api: '/take/api/get-exam',

  get_dashboard_contest_task_list: '/contest/api/get-task-list',
  change_status_of_task_list: '/contest/api/change-status-of-task-list',
  generate_otp_for_contestants: '/contest/api/generate-otp',
  accept_contestant_to_retake: '/contest/api/accept-contestant-to-retake',
  get_contests: '/contest/search',

  // get ongoing contests in widgets
  get_ongoing_contests: '/contest/api/get-ongoing-contests-for-organizations',
  get_upcoming_contests:
    '/contest/api/report/get-upcoming-contests-for-organizations',

  // score reports  for 1 contest
  report_total_contestants_by_point:
    '/contest/score/get-report-total-contestants-by-point-spectrum',
  export_exam_results: '/contest/score/export-exam-results',
  search_exam_results: '/contest/score/search-exam-results',
  report_spent_time: '/contest/score/report-spent-time-for-questions',
  export_result_by_round: '/contest/score/export-report-exam-results-by-round',
  export_result_by_round_desc:
    '/contest/score/export-report-exam-results-by-round-desc',
  export_result_by_round_asc:
    '/contest/score/export-report-exam-results-by-round-asc',
  export_result_by_period:
    '/contest/score/export-report-exam-results-by-period-score',

  /**
   * TODO
   *===================Half-baked reports==================================
   */
  get_report_contest_result: '/contest/report/get-report-contest-result',
  cron_jobs_to_log_report_contest_result:
    '/contest/job/log-report-contest-result',
  report_users_in_all_rounds: '/ec/index/preview-report-all-rounds',
  report_exam_results_by_round:
    '/contest/report/preview-report-exam-results-by-round',
  report_exam_results_score_desc:
    '/contest/report/preview-report-exam-results-order-by-score-desc',
  report_exam_results_score_asc:
    '/contest/report/preview-report-exam-results-order-by-score-asc',
  report_exam_results_period_score:
    '/contest/report/preview-report-exam-results-by-period-score',
  users_join_to_take_exam:
    '/contest/report/preview-report-user-exam-results-by-round',

  report_number_of_users_take_round_one_by_school:
    '/ec/index/preview-report-take-round-one-by-school',
  export_report_number_of_users_by_province:
    '/contest/report/export-report-number-of-users-by-province',
  export_report_number_of_users_by_district:
    '/contest/report/export-report-number-of-users-by-district',
  export_report_number_of_users_by_school_in_province:
    '/contest/report/export-report-number-of-users-by-school-in-province',
  export_report_number_of_users_by_school_in_district:
    '/contest/report/export-report-number-of-users-by-school-in-district',
  export_report_number_of_users_take_round_one_by_school:
    '/ec/index/export-report-take-round-one-by-school',
  export_report_number_of_users_in_one_round_by_school:
    '/contest/report/export-report-number-of-users-in-one-round-by-school',
  export_report_users_in_all_rounds: '/ec/index/export-report-all-rounds',
};
