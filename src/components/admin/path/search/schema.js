// import React from 'react';
import { t, t1 } from 'translate';
import { constants, ntype, programTypeOptions } from 'configs/constants';
// import ProgramSearchFormLayoutFreeStyle from './ProgramSearchFormLayoutFreeStyle';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { hasAcademicCategories, hasOrganization } from 'common/conf';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import { addPropsToEverySchemaElements } from '../../../../common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from '../../../../schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';
import SearchFormLayoutFreestyle from '../../group/search/SearchFormLayoutFreestyle';

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
      type: 'multiCheckbox',
      options: constants.StatusOptions(),
      defaultValue: ['queued', 'approved'],
      inline: true,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    // organizations: organizations(formid, {
    //   floatingLabelText: `${t1('organizations')} (*)`,
    //   defaultValue: values.orgIids,
    //   validate: [validationWithCondition(required(), values.requireOrganization)],
    // }),

    organizations: organizations({
      formid,
      label: `${t1('content_organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
    program_type: {
      name: 'type',
      type: 'multiCheckbox',
      options: programTypeOptions(),
      defaultValue: [ntype.PROGRAM],
      inline: true,
      floatingLabelText: t1('type'),
      floatingLabelFixed: false,
    },
    is_credit_transfert_group: {
      name: 'is_credit_transfert_group',
      type: 'multiCheckbox',
      inline: true,
      floatingLabelText: t1('group_type'),
      options: [
        {
          value: 0,
          label: t1('subject_group'),
          primaryText: t1('subject_group'),
        },
        {
          value: 1,
          label: t1('credit_transfert_group'),
          primaryText: t1('credit_transfert_group'),
        },
      ],
      defaultValue: [0, 1],
    },
  };

  if (forAdvanceSearch) {
    if (forRecap) {
      return addPropsToEverySchemaElements(element, {
        elementDisplayMode: elementDisplayModes.RECAP,
      });
    }
  } else {
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
  hiddenFields = [], //Todo
) => {
  // visible fields.
  const vFields = [];
  if (!forAdvanceSearch) {
    vFields.push('name');
  }

  const fields = [];

  if (!hiddenFields.status) fields.push('status');

  if (values.type === 'program') {
    fields.push('program_type');
  } else if (values.type === 'subjectgroup')
    fields.push('is_credit_transfert_group');

  if (!values.isSIS) {
    if (hasOrganization(domainInfo))
      vFields.push('organizations', 'include_sub_organizations');

    if (hasAcademicCategories(domainInfo))
      fields.unshift('academic_categories');
  }

  return [
    {
      id: 'left',
      fields: vFields,
    },
    {
      id: 'id',
      fields,
      hiddenWhenCompact: true,
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
          isSIS: true,
        }
      : { freestyle: 0, isSIS: true }
    : commonFormLayouts.COMPACT_SEARCH,
  compactSearch: !forAdvance,
});

export const searchFormSchema = getSchema(false, true);
export const searchRecapFormSchema = getSchema(true, true);

export default getSchema();
