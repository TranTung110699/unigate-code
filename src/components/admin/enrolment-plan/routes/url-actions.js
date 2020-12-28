// contains all the possible actions in the url
// like /admin/enrolment-plan/123/$ACTION
const actions = {
  IMPORT_MEMBERS: 'import-members',
  MEMBERS_LIST: 'members',
  TEACHER_SURVEY_RESULT: 'teacher-survey-result',
  CREDIT_SYLLABUS_SURVEY_RESULT: 'credit-syllabus-survey-result',
  DASHBOARD: 'dashboard',
  EDIT_INFO: 'info',
  PROGRAM: 'program',
  COURSES: 'courses', // list courses of EP
  APPROVAL_FLOW: 'approval', // approval status/fow
  MEMBERS_NOT_STARTED: 'not-started-learners', // OUTDATED/?
  CREDIT_OVERALL_PROGRESS: 'credit-overall-progress',
  PROGRESS_BY_ORGANIZATION: 'progress-by-organization',
  REPORTS: 'reports',
  COURSE_STUDENT_ARRANGEMENT_STATUS: 'course-student-arrangment-status', // list all members who are not yet arranged
};

export default actions;
