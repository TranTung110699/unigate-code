import React, { Component } from 'react';
import get from 'lodash.get';
import RTE from 'schema-form/elements/richtext';

import { t, t1 } from 'translate';
import { inRange, required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { generateSlug } from 'common/utils/form';
import {
  rubricSubTypes,
  rubricTypes,
  allRubricSubTypes,
} from 'components/admin/rubric/utils';
import {
  creditSyllabusHasTopEquivalentPositionCode,
  creditSyllabusLevels,
} from 'common/conf';
import { equivalentPositions } from 'components/admin/equivalent-job-position/schema/elements/index';
import { evnEquivalentPositions } from 'components/admin/top-equivalent-position/schema/elements';
import { academicCategories } from 'components/admin/academic-category/schema/elements';
import AspectsPercentElement from '../form/AspectsPercentElement';
// import Penalty from '../form/Penalty';
import Expiry from '../form/Expiry';
import { generateLevelOptions } from '../utils';
import { effortSourcesMultiCheckboxOptions as effortSources } from '../form/configs';
import { commonFormLayouts } from 'schema-form/constants';
import InputToken from 'schema-form/elements/input-token';
import { surveyTypes } from '../configs';
import { convertBooleanValueToInt } from 'common/normalizers';

const conditionsOfParticipation = [
  {
    value: 'default',
    label: t1('default'),
    primaryKey: t1('default'),
  },
];

const getFormulaOptions = (applicableScope, props) => {
  if (applicableScope == 'course') {
    const rubricSubTypeOptions = rubricSubTypes(
      get(props, 'rubricSubTypeEnables', []),
      get(props, 'parentNode'),
    );

    return rubricSubTypeOptions;
  } else if (
    applicableScope == 'enrolment_plan' ||
    applicableScope == 'training_plan'
  ) {
    // TODO: put all those into constants
    return [
      {
        value: 'weighted_average',
        label: t1('weighted_average'),
        guide: t1('user_must_pass_all_child_rubrics'),
      },
      {
        value: 'pass_all_courses_assigned',
        label: t1('pass_all_courses_assigned'),
        guide: t1('user_must_pass_all_courses_assigned_to_learn'),
      },
      {
        value: 'pass_common_and_at_least_one_other_subject',
        label: t1('pass_common_and_at_least_one_other_subject'),
        guide: 'Môn tổng thể + 1 môn chuyên sâu',
      },
      {
        value: 'take_survey',
        label: t1('take_survey'),
        guide: t1('user_must_take_some_survey_specified_below'),
      },
      {
        value: 'pass_all_enrolment_plans_in_tp',
        label: t1('pass_all_enrolment_plans_in_tp'),
        guide: t1('pass_all_enrolment_plans_in_tp'),
      },

      // {
      //   value: 'manual_input',
      //   label: t1('manual_input'),
      // },
    ];
  }
};

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const identifier = values.type === 'rubric' ? 'rubric' : 'skill';
  const rubricTypesOptions = rubricTypes(
    get(props, 'rubricTypeEnables', ['normal_rubric']),
  );

  // console.log({ rubricSubTypeOptions });
  return {
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      validate: [required(t1('cannot_be_empty'))],
      onChange: (event, value) => {
        if (
          /* step === 'new' || step === 'new_skill' || */ step ===
          'new_new_learning_item_rubric'
        ) {
          generateSlug(formid, value, 'code', values.code_prefix || '');
        }
      },
    },
    short_name: {
      type: 'text',
      floatingLabelText: t1('short_name'),
    },
    code: {
      type: 'text',
      hintText: t1('unique_code_for_%s', [t(identifier)]),
      floatingLabelText: t1('code'),
      validate: [required(t1('cannot_be_empty'))],
      prefix: values.code_prefix || '',
      normalize: slugifier,
    },
    description: {
      type: RTE,
      // selectorId: 'description_rte',
      hintText: t1('description_of_how_rubric_is_calculated_and_how_to_pass'),
      floatingLabelText: t1(
        'description_of_how_rubric_is_calculated_and_how_to_pass',
      ),
      multiLine: true,
      guide: t1('you_should_describe_as_detailed_as_possible'),
    },
    from: {
      type: 'select',
      floatingLabelText: t1('from_skill'),
      options: 'async',
      validate: [required(t1('cannot_be_empty'))],
    },
    to: {
      type: 'select',
      floatingLabelText: t1('to_skill'),
      options: 'async',
      validate: [required(t1('cannot_be_empty'))],
    },
    estimated_effort: {
      type: 'number',
      floatingLabelText: t1('amount_of_effort'),
    },
    estimated_effort_type: {
      type: 'select',
      floatingLabelText: t1('estimated_effort_type'),
      options:
        'async' /* TODO: Cơ chế validate để field A phụ thuộc vào field B. VD: Nếu B có gtri thì A là required */,
    },
    status: {
      type: 'select',
      floatingLabelText: t1('estimated_effort_type'),
      options: 'async',
    },
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    scale: {
      type: 'select',
      floatingLabelText: t1('scale'),
      options: Array.isArray(values.skillScaleOptions)
        ? values.skillScaleOptions
        : [],
    },
    detailed_description: {
      type: RTE,
      floatingLabelText: t1('details'),
    },
    rubric_type: {
      type: 'select',
      floatingLabelText: t1('type'),
      floatingLabelFixed: true,
      classWrapper:
        !Array.isArray(rubricTypesOptions) || rubricTypesOptions.length === 1
          ? 'display-none'
          : 'null',
      options: rubricTypesOptions,
      fullWidth: true,
      defaultValue:
        rubricTypesOptions.length > 0 ? rubricTypesOptions[0].value : null,
    },
    applicable_scope: {
      type: 'radio',
      floatingLabelText: t1('type'),
      options: [
        {
          label: t1('course'),
          value: 'course',
        },
        {
          label: t1('enrolment_plan'),
          value: 'enrolment_plan',
        },
        {
          label: t1('training_plan'),
          value: 'training_plan',
        },
      ],
    },
    is_root_rubric: {
      type: 'checkbox',
      label: t1('is_root_rubric'),
    },
    sub_type: {
      type: 'radio',
      floatingLabelText: `${t1(
        'rubric_formula_(how_should_score_be_calculated',
      )} (sub_type) ?`,
      floatingLabelFixed: true,
      options: getFormulaOptions(values.applicable_scope, props),
      fullWidth: true,
      // classWrapper: 'col-md-6',
      // defaultValue:
      //   Array.isArray(rubricSubTypeOptions) && rubricSubTypeOptions.length > 0
      //     ? rubricSubTypeOptions[0].value
      //     : null,
      // guide: {
      //   title: '...... Help ......',
      //   content: <FormulateHelp type={values.sub_type}/>,
      // },
    },
    // formula_help: {
    //   type: 'help',
    //   component: <FormulateHelp type={values.sub_type} />,
    //   // classWrapper: 'col-md-6',
    // },
    survey_type: {
      type: 'select',
      floatingLabelText: t1('choose_survey'),
      options: [
        {
          value: surveyTypes.TRAINING_PLAN,
          label: t1("survey_of_course'_training_plan"),
        },
        {
          value: surveyTypes.ENROLMENT_PLAN,
          label: t1("survey_of_course'_enrolment_plan"),
        },
        {
          value: surveyTypes.GLOBAL_SURVEY,
          label: t1('global_survey'),
        },
        {
          value: surveyTypes.COURSE_SURVEY,
          label: t1('course_survey'),
        },
        {
          value: surveyTypes.SPECIFIC_SURVEY_IID,
          label: t1('other_survey_id (specify_below)'),
        },
      ],
    },
    formula_params: {
      type: 'text',
      floatingLabelText: t1('param_for_rubric_formula_(optional)'),
      guide: t1('only_input_if_you_really_know_what_you_are_doing'),
    },
    conditions_of_participation: {
      type: 'select',
      floatingLabelText: t1('conditions_of_participation'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: conditionsOfParticipation,
      defaultValue: conditionsOfParticipation[0].value,
    },
    // pass_point: {
    //   type: 'select',
    //   floatingLabelText: t1('pass_point'),
    //   floatingLabelFixed: true,
    //   fullWidth: true,
    //   options: conditionsOfParticipation,
    //   defaultValue: conditionsOfParticipation[0].value,
    // },
    pass_score: {
      type: 'number',
      step: 1,
      min: 0,
      max: 100,
      floatingLabelText: t1('rubric_passing_score'),
      floatingLabelFixed: true,
      fullWidth: true,
      hintText: t1('normally_out_of_100'),
      guide: t1('score_is_out_of_100_for_normal_rubric'),
    },
    allow_passing_by_teacher: {
      type: 'checkbox',
      label: t1('allow_passing_by_teacher'),
      // defaultValue: 1,
      normalize: convertBooleanValueToInt, // parseInt(value),
      guide: t1('when_teacher_can_manually_make_a_student_pass_this_criteria'),
    },

    /* ************passing definition*********************** */
    // pd_test: {
    //   type: 'checkbox',
    //   label: t1('must_pass_output_test_(if_exists)'),
    //   defaultValue: 1,
    //   normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // pd_learn: {
    //   type: 'checkbox',
    //   label: t1('must_pass_all_required_learning_items'),
    //   defaultValue: 1,
    //   normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // applied
    // pd_applied_duration: {
    //   type: 'number',
    //   hintText: t1('minimum_period_that_skill_must_maintain'),
    //   floatingLabelText: t1('duration'),
    //   defaultValue: 1,
    // },
    // pd_applied_right: {
    //   type: 'number',
    //   hintText: t1('minimum_number_of_times_skill_must_be_applied_correctly'),
    //   floatingLabelText: t1('correct'),
    //   defaultValue: 1,
    //   // normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // pd_apply_wrong: {
    //   type: 'number',
    //   hintText: t1('maximum_number_of_times_skill_can_be_applied_wrong'),
    //   floatingLabelText: t1('wrong'),
    //   defaultValue: 1,
    //   // normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // pd_apply_wrong_penalty: {
    //   type: 'number',
    //   hintText: t1('%_of_score_decreased_for_each_type_skill_is_applied_wrong'),
    //   floatingLabelText: t1('penalty'),
    //   defaultValue: 10,
    //   // normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // // applied
    // pd_practiced_duration: {
    //   type: 'number',
    //   hintText: t1('minimum_period_that_skill_must_maintain'),
    //   floatingLabelText: t1('duration'),
    //   defaultValue: 1,
    // },
    // pd_practiced_right: {
    //   type: 'number',
    //   hintText: t1('minimum_number_of_times_skill_must_be_practiced_correctly'),
    //   floatingLabelText: t1('correct'),
    //   defaultValue: 1,
    //   // normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // pd_practice_wrong: {
    //   type: 'number',
    //   hintText: t1('maximum_number_of_times_skill_can_be_applied_wrong'),
    //   floatingLabelText: t1('wrong'),
    //   defaultValue: 1,
    //   // normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    // pd_practice_wrong_penalty: {
    //   type: 'number',
    //   hintText: t1('%_of_score_decreased_for_each_type_skill_is_practiced_wrong'),
    //   floatingLabelText: t1('penalty'),
    //   defaultValue: 10,
    //   // normalize: convertBooleanValueToInt, // parseInt(value),
    // },
    /* ************end passing definition*************** */
    aspects_percent: {
      type: AspectsPercentElement,
      hintText: t1(
        'the_following_skill_aspects_combination_is_considered_as_passed',
      ),
    },
    effort_sources: {
      type: 'multiCheckbox',
      options: effortSources,
      hintText: t1('effort_sources'),
    },
    // penalty_practice: {
    //   type: 'Penalty',
    //   hintText: t1('when_skill_is_already_passed_and_user_has_errors_when_practicing'),
    // },
    penalty_practice: {
      type: 'number',
      hintText: t1('max_number_of_mistakes'),
      floatingLabelText: t1('max_number_of_mistakes'),
    },
    // penalty_apply: {
    //   type: Penalty,
    //   hintText: t1('when_skill_is_already_passed_and_user_has_errors_when_applying'),
    // },
    expiry: {
      type: Expiry,
    },
    passdef: {
      label: t1('passdef'),
      type: 'select',
      floatingLabelText: t1('passdef'),
      options: 'async',
      fullWidth: true,
    },
    level: {
      type: 'select',
      options: generateLevelOptions(creditSyllabusLevels(domainInfo)),
      floatingLabelText: t1('skill_level'),
      floatingLabelFixed: true,
      fullWidth: true,
    },
    job_position_codes: {
      type: InputToken,
      hintText: t1('job_position_codes'),
      floatingLabelText: t1('job_position_codes'),
      defaultValue: [],
    },
    academic_categories: academicCategories(formid, {
      label: `${t1('academic_categories')}`,
      // validate: [required(t1('academic_categories_cannot_be_empty'))],
    }),
    equivalent_positions: equivalentPositions(formid, {}),
    top_equivalent_positions: evnEquivalentPositions(formid, {}),
  };
};

const getRubricFields = (props, values) => {
  return [
    'name',
    'code',
    'description',
    ...(get(props, 'options.hasSelectRubricType') ? ['rubric_type'] : []),
    'is_root_rubric',
    'applicable_scope',
    'sub_type',
    // 'formula_help',
    ...(get(values, 'sub_type') === allRubricSubTypes.RUBRIC_FORMULA_TAKE_SURVEY
      ? ['survey_type']
      : []),
    'formula_params',
    'pass_score',
    'allow_passing_by_teacher',
  ];
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
  const config = {
    new_rubric: [
      {
        id: 'new',
        fields: getRubricFields(props, values),
      },
    ],
    new_new_rubric: [
      {
        id: 'new',
        fields: getRubricFields(props, values),
      },
    ],
    edit_pass_score: [
      {
        id: 'default',
        fields: ['pass_score'],
      },
    ],
    edit_pass_score_and_description: [
      {
        id: 'default',
        fields: ['description', 'pass_score'],
      },
    ],
    edit_rubric: [
      {
        id: 'left',
        fields: getRubricFields(props, values),
      },
    ],
    edit_edit_rubric: [
      {
        id: 'left',
        fields: getRubricFields(props, values),
      },
    ],
    new_skill: [
      {
        id: 'new',
        fields: [
          'name',
          'short_name',
          'code',
          ...(creditSyllabusLevels(domainInfo) ? ['level'] : []),
          ...(creditSyllabusHasTopEquivalentPositionCode(domainInfo)
            ? ['top_equivalent_positions']
            : []),
          'academic_categories',
          'description',
        ],
      },
    ],
    edit_skill: [
      {
        id: 'left',
        fields: [
          'name',
          'short_name',
          'code',
          ...(creditSyllabusLevels(domainInfo) ? ['level'] : []),
        ],
      },
      {
        id: 'right',
        fields: [
          'tags',
          ...(creditSyllabusHasTopEquivalentPositionCode(domainInfo)
            ? ['top_equivalent_positions']
            : []),
        ],
      },
      {
        id: 'row',
        fields: [
          'academic_categories',
          'description',
          'detailed_description',
          'passdef',
        ],
      },
    ],
    new_skill_relation: [
      {
        id: 'new_skill_relation',
        fields: [
          'name',
          'from',
          'to',
          'estimated_effort',
          'estimated_effort_type',
          'description',
        ],
      },
    ],
    edit_skill_relation: [
      {
        id: 'edit_skill_relation',
        fields: [
          'name',
          'estimated_effort',
          'estimated_effort_type',
          'description',
          'status',
        ],
      },
    ],
    edit_scale: [
      {
        id: 'edit_scale',
        fields: ['scale'],
      },
    ],
    edit_scale_part: [
      {
        id: 'edit_scale_part',
        fields: ['description', 'detailed_description'],
      },
    ],
    edit_new_scale_part: [
      {
        id: 'edit_new_scale_part',
        fields: ['description', 'detailed_description'],
      },
    ],
    edit_penalty_practice: [
      {
        id: 'row2',
        // title: t1('penalty'),
        subTitle: t1(
          'user_practice_progress_will_be_set_to_0_once_has_this_number_of_failed_times',
        ),
        fields: ['penalty_practice'],
      },
    ],
    edit_expiry: [
      {
        id: 'rowx',
        title: t1('skill_validity_over_time'),
        fields: ['expiry'],
      },
    ],
    edit_passing_definition: [
      {
        id: 'row',
        title: t1('passed_when'),
        subTitle: t1(
          'if_any_aspect_greater_than_0_it_means_that_aspects_must_be_passed',
        ),
        fields: [
          'aspects_percent',
          // 'pd_test',
          // 'pd_learn',
        ],
      },
      {
        id: 'row2',
        title: t1('effort_sources'),
        subTitle: t1(
          'any_of_the_following_effort_sources_can_be_considered_as_passed_for_skill',
        ),
        fields: [
          'effort_sources',
          // 'pd_test',
          // 'pd_learn',
        ],
      },
      // {
      //   id: 'row2',
      //   title: t1('penalty_for_practicing_errors'),
      //   fields: [
      //     'penalty_practice',
      //   ],
      // },
      // {
      //   id: 'row3',
      //   title: t1('penalty_for_applying_errors'),
      //   fields: [
      //     'penalty_apply',
      //   ],
      // },
      // {
      //   id: 'col_left_1',
      //   title: t1('practiced_correct'),
      //   fields: [
      //     'pd_practiced_right',
      //     'pd_practiced_duration',
      //   ],
      // },
      // {
      //   id: 'col_left_1',
      //   title: t1('penalty_for_wrong_practice_once_passed'),
      //   fields: [
      //     'pd_practice_wrong',
      //     'pd_practice_wrong_penalty',
      //   ],
      // },
      // {
      //   id: 'col_left_2',
      //   title: t1('applied_correct'),
      //   fields: [
      //     'pd_applied_right',
      //     'pd_applied_duration',
      //   ],
      // },
      // {
      //   id: 'col_right_2',
      //   title: t1('penalty_for_wrong_application_once_passed'),
      //   fields: [
      //     'pd_apply_wrong',
      //     'pd_apply_wrong_penalty',
      //   ],
      // },
    ],
    new_new_learning_item_rubric: [
      {
        id: 'new_new_learning_item_rubric',
        fields: ['scale', 'name', 'code', 'description', 'tags'],
      },
    ],
  };
  const r = config[step];
  if (!r) {
    return config[`${step}_${(values && values.type) || 'skill'}`];
  }
  return r;
};

const layout = {
  // edit_aspects_percent: 'skill_aspects_percent',
  edit_skill: commonFormLayouts.TWO_COLS_AND_ROW,
  edit: commonFormLayouts.TWO_COLS_AND_ROW,
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  if (mode === 'edit' && step === 'new_scale_part') {
    const returnedData = Object.assign({}, fullData);
    const DataToPopulateInScaleParts = {};
    ['description', 'detailed_description'].forEach((fieldName) => {
      DataToPopulateInScaleParts[fieldName] = fullData[fieldName];
      delete returnedData[fieldName];
    });
    returnedData.extra_data_to_populate_in_scale_parts = {
      [returnedData.scale_part_index]: DataToPopulateInScaleParts,
    };
    return returnedData;
  }
  return fullData;
};

export default {
  schema,
  ui,
  layout,
  finalProcessBeforeSubmit,
};
