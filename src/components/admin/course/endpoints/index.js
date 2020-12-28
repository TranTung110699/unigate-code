const urls = {
  get_learning_types: '/course/api/get-learning-types',
  export_score_of_courses_selected: '/course/data/export-score-of-courses',
  search_online_score: '/course/progress/search-online-score',
  score_by_rubric: '/course/progress/get-course-progress-by-rubrik',
  sync_course_progress_by_rubric:
    '/course/progress/sync-course-progress-by-rubrik',

  // get_courses_to_register: '/course/api/get-courses-allowed-to-register',
  register_the_course: '/register-the-course',
  withdraw_the_course: '/withdraw-the-course',

  // student
  download_certificate: '/course/certificate/create-certificate',
};

export default urls;
