/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { syllabusSubTypeOptions } from 'configs/constants';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';
import { required, validationWithCondition } from 'common/validators';
import { convertBooleanValueToInt } from 'common/normalizers';
import {
  checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo,
  contentShareable,
  creditSyllabusHasTags,
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  enableScorm,
  hasAcademicCategories,
  hasOrganization,
} from 'common/conf';
import { generateLevelOptions } from '../schema/utils';
import { job_position_codes } from '../schema/form';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import InputToken from 'schema-form/elements/input-token';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const schema = (forRecap = false, forAdvanceSearch = false, props) => (
  formid,
  values,
  localStep,
  xpath,
  domainInfo,
) => {
  const notDefaultSelectedStatuses = ['deleted'];
  const defaultStatuses = ['queued', 'approved'];

  if (values.ntype === 'syllabus') {
    // add those statuses added from school syllabus approval flow configs
    const configuredStatuses = Object.keys(values.approvalTypes || {});

    // if config approval flow
    if (configuredStatuses.length) {
      configuredStatuses.forEach((status) => {
        if (defaultStatuses.indexOf(status) === -1)
          defaultStatuses.push(status);
      });
    }
  }

  defaultStatuses.push('deleted');

  // default selected statues
  let defaultSelectedStatuses = defaultStatuses.filter(
    (status) => !notDefaultSelectedStatuses.includes(status),
  );

  let statusOptions = defaultStatuses.map((key) => ({
    name: t1(key),
    value: key,
    label: t1(key),
    primaryText: t1(key),
  }));

  // if some not need so some statuses
  if (Array.isArray(values.exclude_statuses)) {
    statusOptions = statusOptions.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
    defaultSelectedStatuses = defaultSelectedStatuses.filter(
      (opt) => !values.exclude_statuses.includes(lodashGet(opt, 'value')),
    );
  }

  const levelOptions = generateLevelOptions(
    creditSyllabusLevels(domainInfo),
    true,
  );

  let element = {
    status: {
      type: 'multiCheckbox',
      options: statusOptions,
      inline: true,
      defaultValue: defaultSelectedStatuses,
      floatingLabelText: t1('status'),
      floatingLabelFixed: false,
    },
    online_only: {
      type: 'checkbox',
      floatingLabelText: t1('learning_type'),
      label: t1('online_only'),
      fullWidth: true,
      normalize: convertBooleanValueToInt,
      inline: true,
    },
    organizations: organizations({
      formid,
      label: `${t1('content_organizations')} (*)`,
      defaultValue: props.orgIids,
      validate: [
        validationWithCondition(required(), values.requireOrganization),
      ],
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf, {
      defaultValue: props.includeSubOrg,
    }),
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
    shareable: {
      type: 'checkbox',
      defaultValue: 0,
      normalize: convertBooleanValueToInt,
      label: t1('include_content_shared_by_other_organizations'),
    },
    sub_type: {
      type: 'multiCheckbox',
      hintText: t1('syllabus_sub_type'),
      floatingLabelText: t1('syllabus_sub_type'),
      floatingLabelFixed: false,
      options: syllabusSubTypeOptions(),
      inline: true,
      fullWidth: true,
      defaultValue: syllabusSubTypeOptions().map(
        (syllabusSubTypeOption) => syllabusSubTypeOption.value,
      ),
    },
    level: {
      type: 'multiCheckbox',
      options: levelOptions,
      floatingLabelText: t1('syllabus_level'),
      floatingLabelFixed: false,
      inline: true,
      defaultValue: levelOptions.map((levelOption) => levelOption.value),
    },
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    job_position_codes: job_position_codes(),
  };
  if (!forAdvanceSearch) {
    element = {
      name: {
        type: 'text',
        floatingLabelText: t1('name'),
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
) => {
  let compactFields = [];
  if (!forAdvanceSearch) {
    compactFields.push(['name']);
  }

  const fields = [];

  const sbFields = []; // sbFields,

  if (!values.isSIS) {
    if (contentShareable(domainInfo)) fields.push('shareable');
    if (hasOrganization(domainInfo))
      compactFields.push('organizations', 'include_sub_organizations');

    if (!(values && values.type && values.type === 'syllabus_exam')) {
      if (
        hasAcademicCategories(domainInfo) &&
        !lodashGet(window, 'hideOnFormSearch.academic_categories')
      )
        fields.push('academic_categories');
    }

    if (values && values.type !== 'syllabus_exam' && enableScorm(domainInfo))
      fields.push('sub_type');

    if (creditSyllabusLevels(domainInfo)) sbFields.push('level');
    if (creditSyllabusHasTopEquivalentPositionCode(domainInfo))
      sbFields.push('job_position_codes');
    if (creditSyllabusHasTags(domainInfo)) sbFields.push('tags');

    if (!checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo(domainInfo))
      fields.push('online_only');
    // sbFields.push('online_only');
  }

  fields.push('status');

  return [
    {
      id: 'compact',
      fields: compactFields,
    },
    {
      id: 'id', // you still have to have this id even for freestyle
      fields,
      hiddenWhenCompact: 1,
    },
    {
      id: 'sb', // you still have to have this id even for freestyle
      fields: sbFields,
      hiddenWhenCompact: 1,
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false, props = {}) => ({
  schema: schema(forRecap, forAdvance, props),
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

export const searchFormSchema = (props = {}) => getSchema(false, true, props);
export const searchRecapFormSchema = (props = {}) =>
  getSchema(true, true, props);

export default getSchema();
