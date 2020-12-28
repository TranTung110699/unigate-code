const urls = {
  send_comment: '/feedback/new',
  // feedback_search: '/feedback/get',
  get_collaborating_item_comments:
    '/feedback/get-comments-for-collaborating-item',
  count_collaborating_item_comments:
    '/feedback/count-comments-for-collaborating-item',
  fetch_comments_for_syllabus_or_course:
    '/feedback/search-comments-within-course-or-syllabus',
  fetch_comments_for_course: '/feedback/search-comments-within-course',
  get_all_comment_types: '/feedback/get-all-comment-types',
  resolve_comment: '/feedback/update',
  get_latest_comments_of_user_courses:
    'feedback/api/get-latest-comments-of-user-courses',
};

export default urls;
