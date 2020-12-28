/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (isRecap = false) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    pIids: organizations({
      formid,
      label: t1('belong_to_one_of_theses_organizations'),
      rootIids: values.rootIids,
      // includeRoot: 0,
      hasSearchDialog: false,
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    sub_type: {
      type: 'multiCheckbox',
      options: values.orgTypes || [],
      defaultValue: [],
      inline: true,
      floatingLabelText: t1('sub_types'),
      floatingLabelFixed: false,
    },
  };
  if (isRecap) {
    return addPropsToEverySchemaElements(element, {
      elementDisplayMode: elementDisplayModes.RECAP,
    });
  }

  return element;
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  const orgTypes = lodashGet(domainInfo, 'school.org_types');

  const fields = ['pIids', 'include_sub_organizations'];
  if (orgTypes && orgTypes.length > 0) {
    fields.push('sub_type');
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const getSchema = (forRecap = false) => ({
  schema: schema(forRecap),
  ui,
  layout: forRecap
    ? {
        freestyle: 1,
        component: MinimalSearchRecapFreeStyleLayout,
      }
    : commonFormLayouts.DEFAULT,
});

export const searchFormSchema = getSchema();
export const searchRecapFormSchema = getSchema(true);
