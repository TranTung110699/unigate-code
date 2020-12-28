import React from 'react';
import get from 'lodash.get';

import { t1 } from 'translate';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { schoolTypes, UsedFor, UsedForOptions } from 'configs/constants';
import { hasOrganization } from 'common/conf';
import { isQuestionUsedForSurvey } from 'components/admin/node/utils';
import questionTypesOptions from 'components/admin/question/schema/question-types';
import SearchFormLayoutFreestyle from './SearchLayout';
import { gradeElement } from '../../../../../../common/utils/form';
import InputToken from 'schema-form/elements/input-token';

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

const schema = (formid, values, step, xpath, props, domainInfo) => ({
  q: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('name_or_id_or_iid'),
    hintText: t1('input_query'),
  },
  match_type: {
    type: 'select',
    floatingLabelText: t1('matching_type'),
    floatingLabelFixed: true,
    defaultValue: 'like',
    options: matchTypeOptions(),
    fullWidth: true,
  },
  subType: {
    type: 'select',
    floatingLabelText: t1('question_types'),
    floatingLabelFixed: true,
    options: questionTypesOptions,
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
  grade: gradeElement(domainInfo, true, t1('syllabus_grade')),

  job_position_codes: {
    type: InputToken,
    hintText: t1('job_position_codes'),
    floatingLabelText: t1('job_position_codes'),
    defaultValue: [get(props, 'editingItemAncestors.0.CDANHTDUONG_EVN_CODE')],
  },
  top_equivalent_positions: evnEquivalentPositions(formid, {}),
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
) => {
  const schoolType =
    themeConfig && themeConfig.type && themeConfig.type.trim().toUpperCase();
  const showOrganization = hasOrganization(domainInfo);
  const isSIS = schoolType === schoolTypes.SIS.trim().toUpperCase();

  const isEnterprise =
    schoolType === schoolTypes.ENTERPRISE.trim().toUpperCase();

  const compactFields = ['match_type', 'q', 'grade'];

  const expandedFields = [
    // 'q',
    // 'match_type',
    ...(values.ntype === 'question'
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
    'grade',
    'training_mode',
  ];

  return [
    {
      id: 'id',
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

export default {
  schema,
  ui,
  layout: { component: SearchFormLayoutFreestyle, freestyle: 1 },
};
