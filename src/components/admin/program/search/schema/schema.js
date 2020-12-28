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
import ProgramSearchFormLayoutFreeStyle from '../ProgramSearchFormLayoutFreeStyle';

const schema = (formid, values, step, xpath, props, domainInfo) => ({
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
    validate: [validationWithCondition(required(), values.requireOrganization)],
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
});

const ui = (
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
  const fields = ['name', 'status', 'program_type'];

  if (!values.isSIS) {
    if (hasOrganization(domainInfo))
      fields.push('organizations', 'include_sub_organizations');

    if (hasAcademicCategories(domainInfo))
      fields.unshift('academic_categories');
  }

  return [
    {
      id: 'id',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: ProgramSearchFormLayoutFreeStyle,
    freestyle: 1,
  },
  // layout: 'CompactSearch', // by default it will use CompactSearch
  // compactSearch: true,
};
