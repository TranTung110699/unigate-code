/**
 * Deprecated. using ./schema now
 */
import React from 'react';
import { change } from 'redux-form';
import { t1 } from 'translate';
import {
  constants,
  exerciseRuleTypes,
  exerciseRuleTypesConfig,
  layouts,
} from 'configs/constants';
import { isNodeFreeze } from 'components/admin/node/utils';
import { convertBooleanValueToInt } from 'common/normalizers';
import { isExam } from 'common/learn';
import Store from 'store';
import RTE from 'schema-form/elements/richtext';

const defaultValuesForFieldsAffectedByAutoGeneratedRules = {
  can_resume: 0,
  instant_key: 0,
  can_review: 0,
  question_sequence: 0,
  only_show_finish_button_when_reach_last_question: 0,
  show_result_by_skills: 0,
  show_suggestion_after_questions: 0,
  retake_requires_admin_acceptance: 0,
  can_fix_wrong_questions: 0,
  fullscreen_layout: 0,
  hide_controls: 0,
  disable_intro_sticky_audio_control: 0,
  instant_marking_on_finish: 0,
  score_best_or_last_exam_order: 'last',
  disable_question_audio_replay: 0,
  is_toeic_test: 0,
};

export const finalScoreFormula = () => ({
  type: 'radio',
  options: [
    {
      value: 'last',
      label: t1('last_exam_order'), // get the score from the last score
    },
    {
      value: 'best',
      label: t1('best_exam_order'),
    },
  ],
  defaultValue: 'last',
  label: t1('take_final_score_from'),
});

const getAllowToChangeFields = (node, props) => {
  return isExam(node)
    ? [
        'disable_intro_sticky_audio_control',
        'instant_marking_on_finish',
        'score_best_or_last_exam_order',
        'disable_question_audio_replay',
        'is_toeic_test',
        'retake_requires_admin_acceptance',
        'can_do',
      ]
    : [
        'can_resume',
        'instant_key',
        'can_review',
        'question_sequence',
        'only_show_finish_button_when_reach_last_question',
        'show_result_by_skills',
        'show_suggestion_after_questions',
        'can_fix_wrong_questions',
        'fullscreen_layout',
        'hide_controls',
        'can_do',
      ];
};

const getAutoPopulateRuleTypeOptions = (node, themeConfig) => {
  let options = isExam(node)
    ? constants
        .exerciseRuleTypesOptions()
        .filter((option) => [].includes(option.value))
    : constants
        .exerciseRuleTypesOptions()
        .filter((option) =>
          [
            exerciseRuleTypes.PRACTICE,
            exerciseRuleTypes.PRACTICE_SINGLE,
            exerciseRuleTypes.EXAM,
          ].includes(option.value),
        );

  switch (themeConfig.layout) {
    case layouts.XPEAK: {
      break;
    }
    default: {
      const allow = [
        exerciseRuleTypes.PRACTICE,
        exerciseRuleTypes.PRACTICE_SINGLE,
        exerciseRuleTypes.EXAM,
      ];
      options = options.filter((option) => allow.includes(option.value));
      break;
    }
  }

  return options;
};

/**
 * When some preset option changed, we need to populate some keys so user won't have to select one by one.
 * For example when user chooses 'practice_one_by_one', we can check the following two boxes
 *  - instant_key
 *  - question_sequence
 *
 * @param formid
 * @param values
 * @param props
 * @param value
 */
const exerciseRuleTypesOnChanged = (formid, values, props, value) => {
  const { node } = props;
  const allowToChangeFields = getAllowToChangeFields(node, props);

  const exerciseRuleTypesForValue = exerciseRuleTypesConfig[value];

  if (exerciseRuleTypesForValue) {
    Object.keys(defaultValuesForFieldsAffectedByAutoGeneratedRules).forEach(
      (key) => {
        if (
          Object.keys(exerciseRuleTypesForValue).includes(key) &&
          allowToChangeFields.includes(key)
        ) {
          Store.dispatch(change(formid, key, exerciseRuleTypesForValue[key]));
        } else {
          Store.dispatch(
            change(
              formid,
              key,
              defaultValuesForFieldsAffectedByAutoGeneratedRules[key],
            ),
          );
        }
      },
    );
  }
};

const schema = (formid, values, localStep, xpath, props, domainInfo) => {
  const { defaultValue, node, themeConfig } = props;
  const autoPopulateRuleTypeOptions = getAutoPopulateRuleTypeOptions(
    node,
    themeConfig,
  );
  const readOnly = isNodeFreeze(node);

  const checkbox = (key, label) => ({
    type: 'checkbox',
    label: label,
    defaultValue: defaultValue && defaultValue[key],
    fullWidth: true,
    normalize: convertBooleanValueToInt,
    readOnly,
  });

  return {
    auto_populate_rules: {
      type: 'select',
      floatingLabelText: t1('choose_a_quick_exercise_mode'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: [
        {
          value: '',
          label: t1('select_exercise_rule_types'),
          primaryText: '',
        },
      ].concat(autoPopulateRuleTypeOptions),
      readOnly,
      onChange: (event, value) =>
        exerciseRuleTypesOnChanged(formid, values, props, value),
    },
    can_resume: checkbox('can_resume', t1('user_can_resume_exercise')),
    instant_key: checkbox(
      'instant_key',
      t1('show_key_(if_any)_immediately_after_user_checks_his_answer'),
    ),
    can_review: checkbox(
      'can_review',
      t1(
        'user_can_review_detailed_results_of_all_questions_once_exercise_is_finished',
      ),
    ),
    question_sequence: checkbox(
      'question_sequence',
      t1(
        'user_cannot_skip_any_question_(or_group_of_questions)._ie.questions_must_be_done_sequentially',
      ),
    ),
    can_fix_wrong_questions: checkbox(
      'can_fix_wrong_questions',
      t1(
        'allow_users_to_retry_the_wrong_questions_again_once_exercise_is_finished',
      ),
    ),
    fullscreen_layout: checkbox('fullscreen_layout', t1('fullscreen_layout')), //DHSP2 nop bai luan
    hide_controls: checkbox('hide_controls', t1('hide_controls')),
    disable_intro_sticky_audio_control: checkbox(
      'disable_intro_sticky_audio_control',
      t1('disable_intro_sticky_audio_control'),
    ),
    instant_marking_on_finish: checkbox(
      'instant_marking_on_finish',
      t1('instant_marking_on_finish'),
    ),
    score_best_or_last_exam_order: finalScoreFormula(),
    disable_question_audio_replay: checkbox(
      'disable_question_audio_replay',
      t1('disable_question_audio_replay'),
    ),
    is_toeic_test: checkbox('is_toeic_test', t1('is_toeic_test')),
    only_show_finish_button_when_reach_last_question: checkbox(
      'only_show_finish_button_when_reach_last_question',
      t1(
        'users_must_complete_all_questions_before_they_can_see_and_click_finnish_button',
      ),
    ),
    show_result_by_skills: checkbox(
      'show_result_by_skills',
      t1('display_skill_assessment_when_show_result'),
    ),
    show_suggestion_after_questions: checkbox(
      'show_suggestion_after_questions',
      t1('after_each_wrong_question,_show_suggestion_for_user'),
    ),
    retake_requires_admin_acceptance: checkbox(
      'retake_requires_admin_acceptance',
      t1('retake_requires_admin_acceptance'),
    ),
    can_do: {
      type: isExam(node) ? 'number' : 'checkbox',
      min: 0,
      label: isExam(node)
        ? t1('number_of_times_students_can_do')
        : t1('can_do_only_once._(ie._user_cannot_take_exercise_again)'),
      hintText: isExam(node)
        ? t1('number_of_times_students_can_do')
        : t1('can_do_only_once._(ie._user_cannot_take_exercise_again)'),
      floatingLabelText: t1('number_of_times_students_can_do'),
      defaultValue: defaultValue && defaultValue.can_do,
      fullWidth: true,
      readOnly,
    },
    regulation: {
      type: RTE,
      floatingLabelText: t1('regulation'),
      errorText: '',
      defaultValue: defaultValue && defaultValue.regulation,
      fullWidth: true,
      readOnly,
    },
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
  const { node } = props;
  const autoPopulateRuleTypeOptions = getAutoPopulateRuleTypeOptions(
    node,
    themeConfig,
  );
  const allowToChangeFields = getAllowToChangeFields(node, props);

  if (
    Array.isArray(autoPopulateRuleTypeOptions) &&
    autoPopulateRuleTypeOptions.length > 0
  ) {
    allowToChangeFields.unshift('auto_populate_rules');
  }

  return [
    {
      id: 'id',
      fields: allowToChangeFields,
    },
  ];
};

export default { schema, ui };
