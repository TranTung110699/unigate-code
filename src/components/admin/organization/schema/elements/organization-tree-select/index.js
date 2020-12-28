import React from 'react';
import OrganizationSelection from 'components/admin/organization/schema/elements/organization-selection/OrganizationsResult';
import organizationApiUrls from 'components/admin/organization/endpoints';
import { t1 } from 'translate';
import TreeSelect from 'schema-form/elements/tree-select';

export default (fieldName, formid, optionsProperties) => ({
  type: TreeSelect,
  nameElement: fieldName,
  componentElementEditor: OrganizationSelection,
  optionsProperties: optionsProperties || {
    style: {
      maxHeight: '135px',
      overflowY: 'auto',
    },
  },
  fullWidth: true,
  floatingLabelText: t1('organization'),
  hintText: t1('click_to_add_organization'),
  treeProps: {
    multiSelectable: false,
    noFetchDataResultText: t1('there_are_no_organization_to_attach_to_path'),
  },
  params: {
    view: 'tree',
    depth: -1,
  },
  baseUrl: organizationApiUrls.organization_search,
  keyState: `${formid}_organization_iid`,
  normalize: (value) => (value && value[0]) || null,
  format: (value) => (value ? [value] : []),
  mapResultToTreeData: {
    key: 'iid',
    title: 'name',
    value: 'iid',
  },
  mapTreeDataToText: 'title',
});
