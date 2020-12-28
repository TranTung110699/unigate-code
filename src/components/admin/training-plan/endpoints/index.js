/*
import tpApiUrls from 'components/admin/training-plan/endpoints';
 */

const url = {
  report_training_plan_members_group_by_organization:
    '/api/v2/training-plan/report-members-group-by-organization',
  training_plan_notification_for_approve_members_by_organization:
    'api/v2/training-plan/notify-user-to-approve-members-by-organization',

  is_any_training_plan_member_not_assigned_to_all_enrolment_plan_credit_syllabuses:
    '/api/v2/training-plan/is-any-training-plan-member-not-assigned-to-all-enrolment-plan-credit-syllabuses',
  get_enrolment_plans_that_has_members_who_are_not_assigned_to_all_enrolment_plan_credit_syllabuses:
    '/api/v2/training-plan/get-enrolment-plans-that-has-members-who-are-not-assigned-to-all-enrolment-plan-credit-syllabuses',
  are_all_enrolment_plans_of_training_plan_executed:
    '/training-plan/api/are-all-enrolment-plans-of-training-plan-executed',
  cron_jobs_to_log_report_training_plan_learner_progress:
    '/training-plan/progress/sync-learner-progress',
  training_plan_search: '/training-plan/search',
  get_training_plan_options: '/training-plan/api/get-training-plan-options',
};

export default url;
