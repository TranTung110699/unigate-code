// import React from 'react';
import { t, t1 } from 'translate';
import { constants, ntype, programTypeOptions } from 'configs/constants';
// import SearchFormFreestyle from '../../dashboard/widget/survey-report/layout/SearchFormFreestyle';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { hasAcademicCategories, hasOrganization } from 'common/conf';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import ProgramSearchFormLayoutFreeStyle from './ProgramSearchFormLayoutFreeStyle';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import lodashGet from 'lodash.get';

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    status: {
      type: 'select',
      multiple: true,
      options: constants.StatusOptions(),
      defaultValue: ['queued', 'approved'],
      // inline: true,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },

    organizations: organizations({
      formid,
      label: `${t1('content_organizations')} (*)`,
      defaultValue: props.orgIids,
      fullWidth: true,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
    program_type: {
      multiple: true,
      type: 'select',
      options: programTypeOptions(),
      defaultValue: [ntype.PROGRAM],
      // inline: true,
      floatingLabelText: t1('type'),
      floatingLabelFixed: false,
    },
  };

  if (!forAdvanceSearch) {
    element = {
      name: {
        type: 'text',
        floatingLabelText: values.ntype
          ? t1('search_by_name_or_iid_of_%s', [t(values.ntype)])
          : t1('search_by_name_or_iid'),
        // defaultValue: 'name',
        floatingLabelFixed: false,
        errorText: '',
        fullWidth: true,
      },
      ...element,
    };
  } else {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
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
  hiddenFields,
) => {
  // visible fields.
  let fields = [];
  if (!forAdvanceSearch) {
    fields.push('name');
  }
  fields.push('status', 'program_type');

  if (!values.isSIS) {
    if (hasOrganization(domainInfo))
      fields.push('organizations', 'include_sub_organizations');

    if (
      hasAcademicCategories(domainInfo) &&
      !lodashGet(window, 'hideOnFormSearch.academic_categories')
    )
      fields.unshift('academic_categories');
  }

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false) => ({
  schema: schema(forRecap, forAdvance),
  ui: ui(forAdvance),
  layout: forAdvance
    ? forRecap
      ? {
          freestyle: 1,
          component: MinimalSearchRecapFreeStyleLayout,
        }
      : commonFormLayouts.DEFAULT
    : {
        component: ProgramSearchFormLayoutFreeStyle,
        freestyle: 1,
      },
});

export const searchFormSchema = getSchema(false, true);
export const searchRecapFormSchema = getSchema(true, true);

export default getSchema();
