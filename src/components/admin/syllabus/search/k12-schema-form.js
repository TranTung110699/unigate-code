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
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  enableScorm,
  hasAcademicCategories,
} from 'common/conf';

import { job_position_codes } from '../schema/form';
import SyllabusSearchFormDetailFreestyle from './SearchFormLayoutFreestyle';
import { gradeElement } from 'common/utils/form';
import InputToken from 'schema-form/elements/input-token';

export const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  const notDefaultSelectedStatuses = ['deleted'];
  const defaultStatuses = ['queued', 'approved'];

  if (values.ntype === 'syllabus') {
    // add those statuses added from school syllabus approval flow configs
    const configuredStatuses = Object.keys(values.approvalTypes);

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

  return {
    name: {
      type: 'text',
      floatingLabelText: t1('name'),
      // defaultValue: 'name',
      floatingLabelFixed: false,
      errorText: '',
      fullWidth: true,
    },
    status: {
      type: 'select',
      options: statusOptions,
      multiple: true,
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
      defaultValue:
        Array.isArray(props.orgIids) && props.orgIids.length ? 1 : 0,
    }),
    academic_categories: academicCategories(formid, {
      label: t1('academic_categories'),
    }),
    shareable: {
      type: 'checkbox',
      defaultValue: 1,
      label: t1('include_content_shared_by_other_departments'),
    },
    sub_type: {
      type: 'multiCheckbox',
      hintText: t1('syllabus_sub_type'),
      floatingLabelText: t1('syllabus_sub_type'),
      floatingLabelFixed: false,
      options: syllabusSubTypeOptions(),
      fullWidth: true,
      defaultValue: syllabusSubTypeOptions().map(
        (syllabusSubTypeOption) => syllabusSubTypeOption.value,
      ),
    },
    grade: gradeElement(domainInfo, true, t1('syllabus_grade')),
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    job_position_codes: job_position_codes(),
  };
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
  const compactFields = ['name'];

  const fields = [];

  const sbFields = []; // sbFields,

  if (!values.isSIS) {
    // if (contentShareable(domainInfo)) fields.push('shareable');
    //
    // if (hasOrganization(domainInfo))
    //   compactFields.push('organizations', 'include_sub_organizations');

    if (!(values && values.type && values.type === 'syllabus_exam')) {
      if (hasAcademicCategories(domainInfo)) fields.push('academic_categories');
    }

    if (values && values.type !== 'syllabus_exam' && enableScorm(domainInfo))
      fields.push('sub_type');

    if (creditSyllabusLevels(domainInfo)) sbFields.push('grade');
    if (creditSyllabusHasTopEquivalentPositionCode(domainInfo))
      sbFields.push('job_position_codes');

    // if (creditSyllabusHasTags(domainInfo)) sbFields.push('tags');

    if (!checkIfAllCreditSyllabusesAreOnlineOnlyGivenDomainInfo(domainInfo))
      fields.push('online_only');
    // sbFields.push('online_only');
  }

  fields.push('status');

  return [
    {
      id: 'id',
      fields: compactFields.concat(fields).concat(sbFields),
    },
    // {
    //   id: 'id', // you still have to have this id even for freestyle
    //   fields,
    // },
    // {
    //   id: 'sb', // you still have to have this id even for freestyle
    //   fields: sbFields,
    // },
  ];
};

export default {
  schema,
  ui,
  layout: {
    component: SyllabusSearchFormDetailFreestyle,
    freestyle: 1,
    // isSIS: true,
  },
  // layout: 'CompactSearch',
  // compactSearch: 1,
};
