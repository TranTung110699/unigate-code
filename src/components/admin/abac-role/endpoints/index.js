/*
import aApiUrls from 'components/admin/abac-role/endpoints';

 */
const urls = {
  // get_abac_role: 'abac-role/api/get',
  get_role_options: '/abac-role/api/get-role-options',
  get_roles_of_user_in_applied_target:
    '/user-abac-role/api/get-roles-of-user-in-applied-target',
  get_roles_of_user: '/user-abac-role/api/get-roles-of-user',
  abac_role_assign_multi_user_as_roles:
    '/user-abac-role/assign-multi-user-as-roles',
  set_abac_role_for_user_from_abstract_code:
    '/user-abac-role/api/set-abac-role-for-user-from-abstract-code',
  get_abac_roles_for_syllabus_flow:
    '/user-abac-role/api/get-roles-syllabus-flow',
  abac_role_search: '/abac-role/search',
  abac_role_action_search: '/abac-role-action/index/search',
  abac_role_action_delete: '/abac-role-action/index/delete',
  abac_role_module_search: '/abac-role-module/index/search',
  abac_role_module_delete: '/abac-role-module/index/delete',
  abac_role_new_from_abstract: '/abac-role/new-from-abstract',
  delete_abac_roles_of_target_item:
    '/abac-role/delete-abac-roles-of-target-item',
  user_abac_roles_delete: 'user-abac-role/delete',
  has_permissions: '/user-abac-role/has-permissions',
  has_perms: '/user-abac-role/has-perms',
  get_permission_modules_to_create_role:
    '/abac-role/api/get-permission-modules-to-create-role',
  initiate_roles: '/abac-role/data/initiate-roles',
  manage_teacher_roles:
    '/user-abac-role/api/get-roles-of-user-follow-applied-scope',
  remove_wrong_user_organizations_roles:
    'user-abac-role/data/remove-wrong-user-organizations-roles',
  sync_user_role_data_in_redis_with_db:
    'user-abac-role/data/sync-user-role-data-in-redis-with-db',
  abstract_role:
    'abac-role/api/get-abstract-roles-options-for-specific-role-type',
};

export default urls;
