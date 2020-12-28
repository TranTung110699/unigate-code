import { t1 } from 'translate';
import {
  enrolmentPlanStatusOptions,
  enrolmentPlanTypeOptions,
} from 'configs/constants/enrolmentPlan';
import { defaultStatuses } from './common';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { hasAcademicCategories, hasOrganization } from 'common/conf';
import { required } from 'common/validators';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import lodashGet from 'lodash.get';

const schema = (
  forRecap = false,
  forAdvanceSearch = false,
  defaultSearchSubOrg = false,
) => (formid, values, step, xpath, props, domainInfo) => {
  let element = {
    type: {
      type: 'multiCheckbox',
      inline: true,
      floatingLabelText: t1('enrolment_plan_type'),
      options: enrolmentPlanTypeOptions(),
    },
    status: {
      fullWidth: true,
      type: 'multiCheckbox',
      inline: true,
      floatingLabelText: t1('status'),
      hintText: t1('status'),
      options: enrolmentPlanStatusOptions(),
      defaultValue: defaultStatuses,
    },
    organizations: organizations({
      formid,
      defaultValue: props.orgIids,
      label: t1('enrolment_plan_organizers', 1),
      validate: [required()],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: defaultSearchSubOrg ? 1 : 0,
    }),
    include_items_from_ancestor_organizations: {
      type: 'checkbox',
      label: t1('include_items_from_ancestor_organizations'),
      defaultValue: 0,
    },
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
  };

  if (forAdvanceSearch) {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
  } else {
    element = {
      text: {
        type: 'text',
        fullWidth: true,
        floatingLabelText: `${t1('name')} / ${t1('code')}`,
        label: `${t1('name')} / ${t1('code')}`,
        hintText: `${t1('name')} / ${t1('code')}`,
      },
      ...element,
    };
  }

  return element;
};

const ui = (forAdvanceSearch = false) => (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  const compactFields = [
    ...(!forAdvanceSearch ? ['text'] : []),
    ...(hasOrganization(domainInfo)
      ? [
          'organizations',
          'include_sub_organizations',
          'include_items_from_ancestor_organizations',
        ]
      : []),
  ];
  // const expandedFields = ['type', 'status'];
  const expandedFields = [
    // 'text',
    ...(!lodashGet(window, 'hideOnFormSearch.learning_type') ? ['type'] : []),
    'status',
    ...(hasAcademicCategories(domainInfo) &&
    !lodashGet(window, 'hideOnFormSearch.academic_categories')
      ? ['academic_categories']
      : []),
  ];

  return [
    {
      id: 'default',
      fields: compactFields,
    },
    {
      id: 'expanded',
      fields: expandedFields,
      hiddenWhenCompact: true,
    },
  ];
};

const getSchema = (
  forRecap = false,
  forAdvance = false,
  defaultSearchSubOrg = false,
) => ({
  schema: schema(forRecap, forAdvance, defaultSearchSubOrg),
  ui: ui(forAdvance),
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
        }
      : commonFormLayouts.DEFAULT
    : commonFormLayouts.COMPACT_SEARCH,
  compactSearch: !forAdvance,
});

export const searchFormSchema = (defaultSearchSubOrg = false) =>
  getSchema(false, true, defaultSearchSubOrg);
export const searchRecapFormSchema = (defaultSearchSubOrg = false) =>
  getSchema(true, true, defaultSearchSubOrg);

export default getSchema();
