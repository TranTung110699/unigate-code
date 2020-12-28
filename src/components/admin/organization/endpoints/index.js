export default {
  get_organization_info: '/organization/api/get', //an effort to get away from /syllabus/api/get
  get_multiple_organizations_info: '/organization/api/get-multiple',
  organization_search: '/organization/api/search?type=organization',
  get_user_organization_tree:
    '/organization/api/get-user-organization-tree-from-cache-if-possible?type=organization&sub_type=1',
  get_organizations_for_select_options:
    '/organization/schema-form/get-organizations-for-select-options',
};
