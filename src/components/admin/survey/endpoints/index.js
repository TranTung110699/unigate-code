/**
 import sApiUrls from 'components/admin/survey/endpoints';

 */
const urls = {
  add_survey_applied_items: '/survey/api/add-applied-items',
  remove_survey_applied_item: '/survey/api/remove-applied-item',
  survey_applied_items_search: '/survey/api/search-applied-items',
  survey_report_search: '/survey/api/search-all-survey-report',
  global_survey_report_search: '/survey/api/search-global-survey-report',
  search_members_have_taken: '/survey/api/search-members-have-taken',
  count_number_of_survey: '/survey/api/count-number-of-surveys-by-day',
  update_survey_applied_item: '/survey/api/update-applied-item',
  remove_survey_takes: '/survey/take/remove-survey-take',
  save_survey_take: '/survey/take/save-survey-take',
  save_survey_take_question_answer:
    '/survey/take/save-survey-take-question-answer',
  save_survey_take_comment: '/survey/take/save-survey-take-comment',
  get_survey_take: '/survey/take/get-survey-take',
  get_report_average_survey_result:
    '/api/v2/report/get-report-average-survey-result',
  get_survey_take_batch_insertion_info:
    '/survey/batch-take/get-survey-take-batch-insertion-info',
  delete_survey_takes_in_batch:
    '/survey/batch-take/delete-survey-takes-in-batch',
  update_survey_take_result: '/survey/take/update-survey-take-result',
  finish_feedback_for_survey_takes:
    '/survey/batch-take/finish-feedback-for-survey-takes',
  new_survey_take_for_feedback_users_in_group:
    '/group/survey/new-survey-take-for-feedback-users-in-group',
  search_survey_take_for_feedback_users_in_group:
    '/group/survey/search-survey-take-for-feedback-users-in-group',
  get_surveys_to_feedback_group_users:
    '/group/survey/get-surveys-to-feedback-group-users',
  search_survey_takes_batch_inserts_to_feedback_users_of_group:
    '/group/survey/search-survey-takes-batch-inserts-to-feedback-users-of-group',
  get_surveys_target_users: '/survey/api/get-surveys-target-users',
  get_report_survey_targeting_user:
    '/api/v2/report/get-report-survey-targeting-user',
  get_survey_list_to_take: '/survey/api/get-survey-list-to-take',
  comment_search_by_global_survey:
    '/survey/api/search-comments-by-global-survey',
  search_open_ended_answers: '/survey/api/search-open-ended-answers',
  survey_search: '/survey/search',
};

export default urls;
