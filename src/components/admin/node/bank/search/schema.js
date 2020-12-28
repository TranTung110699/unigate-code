import React from 'react';
import get from 'lodash.get';
import {
  includeSubOrganizations,
  organizations,
} from 'components/admin/organization/schema/elements';

import { t1 } from 'translate';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import { positions } from 'components/admin/job-position/schema/elements';
import {
  difficulties,
  schoolTypes,
  UsedFor,
  UsedForOptions,
} from 'configs/constants';
import {
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
  hasAcademicCategories,
  hasOrganization,
} from 'common/conf';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import { generateLevelOptions } from 'components/admin/skill/utils';
import { isQuestionUsedForSurvey } from 'components/admin/node/utils';
import questionTypesOptions from 'components/admin/question/schema/question-types';
import skillsAutoComplete from 'components/admin/skill/schema/elements/skills-auto-complete';
import { required } from 'common/validators';
import { commonFormLayouts, elementDisplayModes } from 'schema-form/constants';
import InputToken from 'schema-form/elements/input-token';
import { addPropsToEverySchemaElements } from 'common/utils/schema-form';
import MinimalSearchRecapFreeStyleLayout from 'schema-form/layouts/common-freestyle-layouts/MinimalSearchRecap';

const matchTypeOptions = () => [
  {
    value: 'like',
    primaryText: t1('similar'),
  },
  {
    value: 'eq',
    primaryText: t1('exact'),
  },
];

const schema = (forRecap = false, forAdvanceSearch = false) => (
  formid,
  values,
  step,
  xpath,
  props,
  domainInfo,
) => {
  let element = {
    match_type: {
      type: 'select',
      floatingLabelText: t1('matching_type'),
      floatingLabelFixed: true,
      defaultValue: 'like',
      options: matchTypeOptions(),
      fullWidth: true,
      ...(!forAdvanceSearch ? { className: 'col-md-4' } : {}),
    },
    subType: {
      type: 'select',
      floatingLabelText: t1('question_types'),
      floatingLabelFixed: true,
      options: questionTypesOptions,
      fullWidth: true,
    },
    organizations: organizations({
      formid,
      multiple: false,
      label: `${t1('organizations')}`,
      defaultValue: props.orgIids,
      validate: required(t1('organization_can_not_empty')),
    }),
    include_sub_organizations: includeSubOrganizations(domainInfo.conf),
    shareable: {
      type: 'checkbox',
      label: t1('include_content_shared_by_other_departments'),
    },
    positions: positions(formid, {}, values.organizations),
    skills: skillsAutoComplete('skill'),
    difficulty: {
      type: 'select',
      fullWidth: true,
      floatingLabelText: t1('difficulty'),
      options: [
        {
          primaryText: t1('all'),
          label: t1('all'),
          value: '',
        },
      ].concat(
        Object.values(difficulties).map((val) => ({
          primaryText: t1(val),
          label: t1(val),
          value: val,
        })),
      ),
    },
    import_tags: {
      type: InputToken,
      floatingLabelText: t1('import_tags'),
      fullWidth: true,
    },
    used_for: {
      type: 'multiCheckbox',
      floatingLabelText: t1('used_for'),
      defaultValue: [values.pSubtype || UsedFor.LEARN],
      options: UsedForOptions(),
      inline: true,
    },
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    major: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        floatingLabelText: t1('applicable_for_major'),
        displayFields: ['major', 'training_mode'],
        notValidate: true,
        forSearch: true,
      }),
    },
    academic_categories: academicCategories(formid, {
      defaultValue: values.defaultAcademicCategories || [],
    }),
    level: {
      type: 'multiCheckbox',
      options: generateLevelOptions(creditSyllabusLevels(domainInfo), true),
      floatingLabelText: t1('skill_level'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    job_position_codes: {
      type: InputToken,
      hintText: t1('job_position_codes'),
      floatingLabelText: t1('job_position_codes'),
      defaultValue: [get(props, 'editingItemAncestors.0.CDANHTDUONG_EVN_CODE')],
    },
    top_equivalent_positions: evnEquivalentPositions(formid, {}),
  };

  if (!forAdvanceSearch) {
    element = {
      q: {
        type: 'text',
        fullWidth: true,
        floatingLabelText: t1('name_or_id_or_iid'),
        hintText: t1('input_query'),
        className: 'col-md-8',
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
  const schoolType =
    themeConfig && themeConfig.type && themeConfig.type.trim().toUpperCase();
  const showOrganization = hasOrganization(domainInfo);
  const isSIS = schoolType === schoolTypes.SIS.trim().toUpperCase();

  const isEnterprise =
    schoolType === schoolTypes.ENTERPRISE.trim().toUpperCase();

  const compactFields = ['match_type'];

  if (!forAdvanceSearch) {
    compactFields.push(['q']);
  }

  const expandedFields = [
    // 'q',
    // 'match_type',
    ...(['path', 'syllabus'].includes(values.ntype) &&
    hasAcademicCategories(domainInfo)
      ? ['academic_categories']
      : []),
    ...(isSIS ? ['major'] : []),
    ...(showOrganization || (isEnterprise && values.ntype === 'question')
      ? ['organizations']
      : []),
    ...(isEnterprise && values.ntype === 'question'
      ? [
          'positions',
          'skills',
          ...(isQuestionUsedForSurvey(values, true) ? [] : ['difficulty']),
          'subType',
          'import_tags',
          'used_for',
          'tags',
        ]
      : []),
    ...(isEnterprise && values.ntype === 'skill'
      ? ['academic_categories', 'level', 'top_equivalent_positions']
      : []),
    ...(creditSyllabusHasTopEquivalentPositionCode(domainInfo)
      ? ['top_equivalent_positions']
      : ['']),
  ];

  if (values && values.ntype === 'syllabus' && !isSIS) {
    compactFields.push('shareable');
  }

  return [
    {
      id: 'compact',
      fields: compactFields,
    },
    !isSIS && {
      id: 'expanded',
      fields: [
        'academic_categories',
        'organizations',
        'include_sub_organizations',
        'top_equivalent_positions',
      ],
      hiddenWhenCompact: true,
    },
  ];
};

const getSchema = (forRecap = false, forAdvance = false) => ({
  schema: schema(forRecap, forAdvance),
  ui: ui(forAdvance),
  compactSearch:
    !forAdvance &&
    ((domainInfo) => get(domainInfo, 'school.type') !== schoolTypes.SIS),
  layout: (step, values, xpath, props, domainInfo) =>
    forAdvance
      ? forRecap
        ? {
            freestyle: 1,
            component: MinimalSearchRecapFreeStyleLayout,
          }
        : commonFormLayouts.DEFAULT
      : get(domainInfo, 'school.type') === schoolTypes.SIS
      ? ''
      : commonFormLayouts.COMPACT_SEARCH,
  // layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
});

export const searchFormSchema = getSchema(false, true);
export const searchRecapFormSchema = getSchema(true, true);

export default getSchema();
