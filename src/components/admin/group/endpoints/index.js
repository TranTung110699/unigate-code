export default {
  group_search: '/group/api/search',
  get_group_info: '/group/api/get', // an effort to get away from /syllabus/api/get
  group_member_search: '/user/search',
  get_assignment_group: '/category/api/get-assignment-group',
  /** ** group ***** */
  new_user_group: '/group/api/new',
  rescan_group: '/api/v2/group/rescan',
  add_members_group_relation: '/api/v2/group/add-members-relation',
  invited_items_of_group_search: '/api/v2/group/get-invited-items-of-group',
  search_group_members: '/api/v2/group/search-members',
  add_supervisor: '/group/api/add-supervisor',
  search_supervisor: '/group/api/search-supervisors',
  remove_supervisor: '/group/api/remove-supervisor',
  search_member_scores: '/group/api/search-member-scores',
  my_supervised_groups: '/group/api/my-supervised-groups',
};
