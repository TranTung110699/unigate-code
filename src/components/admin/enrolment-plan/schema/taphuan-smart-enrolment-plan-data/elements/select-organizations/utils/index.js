import lodashPickBy from 'lodash.pickby';
import lodashGet from 'lodash.get';
import { set } from 'common/utils/object';

export const getSelectedOrganizationIids = (value) => () => {
  return Object.keys(
    lodashPickBy(value, (item) => {
      return lodashGet(item, 'selected');
    }),
  ).map((orgIid) => Number.parseInt(orgIid, 10));
};

export const getNumberOfSelectedOrganizations = (value) => () => {
  return (getSelectedOrganizationIids(value)() || []).length;
};

export const getGroupOfOrganization = (value) => (organizationIid) => {
  return lodashGet(value, [organizationIid, 'group']);
};

export const setGroupOfOrganization = (value, onChange) => (
  organizationIid,
  group,
) => {
  onChange(set(value, [organizationIid, 'group'], group));
};

export const isOrganizationSelected = (value) => (organizationIid) => {
  return lodashGet(value, [organizationIid, 'selected']);
};

export const setIsOrganizationSelected = (value, onChange) => (
  organizationIid,
  selected,
) => {
  onChange(set(value, [organizationIid, 'selected'], selected));
};
