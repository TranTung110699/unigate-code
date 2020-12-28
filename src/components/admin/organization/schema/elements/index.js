import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { categoryTypes } from 'configs/constants'; // todo move it inside organization
import Organizations from 'components/admin/organization/schema/elements/organizations';

export const isOrganizationWithOrgTypes = (node, orgTypes) => {
  if (
    node.type === categoryTypes.CATEGORY_ORGANIZATION &&
    orgTypes &&
    Array.isArray(orgTypes) &&
    orgTypes.map((t) => String(t)).includes(String(node.sub_type))
  ) {
    return true;
  }

  return false;
};

export const organizations = ({
  formid,
  rootIids,
  userOrgIidsAsRootIids,
  includeRoot,
  getOnlyOrganizationWhereUserHasPermission,
  hasSearchDialog,
  label,
  hintText,
  defaultValue,
  name,
  validate,
  readOnly,
  multiple,
  normalize,
  format,
  provinceId,
  districtId,
  onChange,
  fullWidth,
  classWrapper,
  subTypes,
}) =>
  organizationsWithPhongBan({
    formid,
    shouldGetAllSubTypes: 0,
    rootIids,
    userOrgIidsAsRootIids,
    includeRoot,
    getOnlyOrganizationWhereUserHasPermission,
    hasSearchDialog,
    label,
    hintText,
    defaultValue,
    name,
    validate,
    readOnly,
    multiple,
    normalize,
    format,
    provinceId,
    districtId,
    onChange,
    fullWidth,
    classWrapper,
    subTypes,
  });
// OLD LOGIC WITH TREE SELECT
// const defaultMultiSelectable = true;
// const defaultMultiSelectableLimit = Infinity;
//
// const multiSelectable = lodashGet(
//   configs,
//   'treeProps.multiSelectable',
//   defaultMultiSelectable,
// );
// const multiSelectableLimit = lodashGet(
//   configs,
//   'treeProps.multiSelectableLimit',
//   defaultMultiSelectableLimit,
// );
//
// let defaultLabel = '';
// if (!multiSelectable) {
//   defaultLabel = t1('organization');
// } else if (multiSelectableLimit !== Infinity) {
//   defaultLabel = t1(
//     `organizations_(select_up_to_${multiSelectableLimit}_choices)`,
//   );
// } else {
//   defaultLabel = t1('organizations');
// }
//
// return {
//   type: 'treeSelect',
//   nameElement: 'organizations',
//   componentElementEditor: OrganizationSelection,
//   optionsProperties: {
//     style: {
//       maxHeight: '135px',
//       overflowY: 'auto',
//     },
//   },
//   fullWidth: true,
//   fullWidthInput: true,
//   floatingLabelText: defaultLabel,
//   hintText: defaultLabel,
//   treeProps: {
//     multiSelectable: defaultMultiSelectable,
//     checkParentEqualCheckAllChildren: false,
//   },
//   params: {
//     view: 'tree',
//     depth: -1,
//     pIids: rootIids,
//   },
//   baseUrl: apiUrls.get_user_organization_tree,
//   noFetchDataResultText: t1('there_are_no_organization_to_select.'),
//   keyState: userOrganizationsSchemaFormKeyState(formid),
//   mapResultToTreeData: {
//     key: 'iid',
//     title: 'name',
//     value: 'iid',
//   },
//   mapTreeDataToText: 'title',
//   ...(configs || {}),
// };

export const organizationsWithPhongBan = ({
  formid,
  shouldGetAllSubTypes,
  rootIids,
  userOrgIidsAsRootIids = 1,
  includeRoot = 1,
  getOnlyOrganizationWhereUserHasPermission = 1,
  hasSearchDialog = true,
  label,
  hintText,
  defaultValue,
  name,
  validate,
  readOnly,
  multiple = true,
  normalize,
  format,
  provinceId,
  districtId,
  onChange,
  fullWidth = true,
  classWrapper = '',
  subTypes,
}) => {
  if (!label) {
    if (multiple) {
      label = t1('organizations');
    } else {
      label = t1('organization');
    }
  }

  return {
    type: Organizations,
    includeRoot,
    getOnlyOrganizationWhereUserHasPermission,
    shouldGetAllSubTypes,
    rootIids,
    userOrgIidsAsRootIids,
    provinceId,
    districtId,
    label,
    hintText: hintText || label,
    name,
    validate,
    normalize,
    format,
    onChange,
    multiple,
    readOnly,
    fullWidth,
    classWrapper,
    subTypes,
    ...(window.showDefaultOrganizations ? { defaultValue } : {}),
  };
};

export const includeSubOrganizations = (
  conf,
  { label = t1('include_sub_organizations'), defaultValue, ...props } = {},
) => {
  if (typeof defaultValue === 'undefined') {
    defaultValue = lodashGet(conf, 'default_search_sub_organizations');
  }

  if (typeof defaultValue === 'undefined') {
    defaultValue = 0;
  }

  return {
    ...props,
    type: 'checkbox',
    defaultValue,
    label,
  };
};
