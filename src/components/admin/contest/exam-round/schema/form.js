import lodashGet from 'lodash.get';
import { dateGreaterThan, dateLessThan, required } from 'common/validators';
import { constants, examMethods } from 'configs/constants';
import { t1 } from 'translate';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import { convertBooleanValueToInt } from 'common/normalizers';
import { itemDuration } from 'components/common/elements/duration';
import { durationDisplayFormats } from 'schema-form/elements/duration/smaller-than-one-day/common/constants';
import store from 'store';
import { change } from 'redux-form';
import DatePicker from 'schema-form/elements/date-picker';
import Toggle from 'schema-form/elements/toggle';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';
import invalidQuestionsSchema from './invalid-questions-chema';
import { finalScoreFormula } from '../../test-rule/form/schema';
import { takePreviewModes } from 'configs/constants/contest';

const checkbox = (key, label) => ({
  type: 'checkbox',
  label: label,
  fullWidth: true,
  normalize: convertBooleanValueToInt,
});

const defaultStartDate = Math.round(new Date().getTime() / 1000);
const defaultEndDate = defaultStartDate + 60 * 60 * 24 * 7; // 1 weeks

// when instant marking, most likely we wanna show score for users right away
const onInstantMarkingChange = (formid, instantMarking, values) => {
  if (instantMarking) store.dispatch(change(formid, 'should_show_score', 1));
};
// when should_show_score, most likely we don't want the contestant to preview their take
const onShouldShowScoreChange = (formid, shouldShowScore, values) => {
  if (!shouldShowScore)
    store.dispatch(change(formid, 'contestants_can_preview_take', 0));
};

const schema = (formid, values, step) => ({
  contest_code: {
    type: 'select',
    floatingLabelText: `${t1('contest')} (*)`,
    floatingLabelFixed: true,
    options: 'async',
    defaultValue: values.contest_code,
    validate: [required(t1('contest_cannot_be_empty'))],
    fullWidth: true,
    readOnly: true,
    classWrapper: 'col-md-12',
  },
  name: {
    type: 'text',
    floatingLabelText: `${t1('exam_round_name')} (*)`,
    hintText: t1('exam_round_name'),
    defaultValue: '',
    fullWidth: true,
    validate: [required(t1('name_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  start_time: {
    type: DatePicker,
    getStartDate: true,
    floatingLabelText: `${t1('start_time')} (*)`,
    hintText: t1('start_time'),
    defaultValue: defaultStartDate,
    classWrapper: 'col-md-6',
    validate: [
      required(t1('start_time_cannot_be_empty')),
      dateLessThan(values.end_time, t1('start_time_must_be_before_end_time')),
    ],
    fullWidth: true,
  },
  end_time: {
    type: DatePicker,
    getEndDate: true,
    floatingLabelText: `${t1('end_time')} (*)`,
    hintText: t1('end_time'),
    defaultValue: defaultEndDate,
    validate: [
      required(t1('end_time_cannot_be_empty')),
      dateGreaterThan(
        values.start_time,
        t1('end_time_must_be_after_start_time'),
      ),
    ],
    classWrapper: 'col-md-6',
    fullWidth: true,
  },
  // publish_score_start_time: {
  //   type: 'datePicker',
  //   getStartDate: true,
  //   classWrapper: 'col-md-6',
  //   floatingLabelText: `${t1('publish_score_start_time')} (*)`,
  //   hintText: t1('publish_score_start_time'),
  //   unixTimeStamp: true,
  //   defaultValue: defaultEndDate + 60 * 60 * 24 * 2,
  //   validate: [
  //     required(t1('publish_score_start_time_cannot_be_empty')),
  //     dateLessThan(
  //       values.publish_score_end_time,
  //       t1('publish_score_start_time_must_be_after_publish_score_end_time'),
  //     ),
  //   ],
  //   fullWidth: true,
  // },
  // publish_score_end_time: {
  //   type: 'datePicker',
  //   getEndDate: true,
  //   classWrapper: 'col-md-6',
  //   floatingLabelText: `${t1('publish_score_end_time')} (*)`,
  //   hintText: t1('publish_score_end_time'),
  //   unixTimeStamp: true,
  //   defaultValue: defaultEndDate + 60 * 60 * 24 * 3,
  //   validate: [
  //     required(t1('publish_score_end_time_cannot_be_empty')),
  //     dateGreaterThan(
  //       values.publish_score_start_time,
  //       t1('publish_score_end_time_must_be_after_publish_score_start_time'),
  //     ),
  //   ],
  //   fullWidth: true,
  // },
  number_of_advancing_contestants: {
    type: 'text',
    floatingLabelText: `${t1('number_of_advancing_contestants')} (*)`,
    hintText: t1('number_of_advancing_contestants'),
    defaultValue: 1000,
    validate: [required(t1('number_of_advancing_contestants_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  should_show_score: {
    type: Toggle,
    label: t1('should_show_score'),
    labelPosition: 'right',
    classWrapper: 'col-md-12',
    onChange: (event, value) => onShouldShowScoreChange(formid, value, values),
  },
  contestants_can_preview_take: {
    type: 'radio',
    label: t1('contestants_can_preview_take'),
    defaultValue: takePreviewModes.FULL_PREVIEW,
    options: [
      {
        value: takePreviewModes.FULL_PREVIEW,
        label: t1('preview_with_detailed_score'),
      },
      {
        value: takePreviewModes.PREVIEW_WITH_NO_SCORE,
        label: t1('preview_with_no_detailed_score'),
      },
      {
        value: takePreviewModes.CANNOT_PREVIEW,
        label: t1('cannot_preview'),
      },
    ],
    classWrapper: values.should_show_score
      ? 'col-md-12 m-t-10'
      : 'display-none',
  },
  // should_show_score: {
  //   type: 'select',
  //   floatingLabelText: `${t1('should_show_score')} (*)`,
  //   options: constants.YesNoOptions(),
  //   defaultValue: YesNo.NO,
  //   validate: [required(t1('should_show_score_cannot_be_empty'))],
  //   fullWidth: true,
  //   classWrapper: 'col-md-4',
  // },
  should_allow_remark: {
    type: Toggle,
    label: t1('should_allow_remark'),
    labelPosition: 'right',
    classWrapper: 'col-md-12',
  },
  exam_method: {
    type: 'select',
    floatingLabelText: `${t1('exam_method')} (*)`,
    floatingLabelFixed: true,
    options: 'async',
    defaultValue: examMethods.FIXED_TIME_FULL_DURATION,
    validate: ['edit_exam_round'].includes(step)
      ? null
      : [required(t1('exam_method_cannot_be_empty'))],
    fullWidth: true,
    classWrapper: 'col-md-12',
  },
  total_score: {
    type: 'text',
    floatingLabelText: `${t1('total_score')} (*)`,
    hintText: t1('total_score'),
    defaultValue: 100,
    fullWidth: true,
    validate: [required(t1('total_score_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  violation_limit: {
    type: 'number',
    floatingLabelText: `${t1('limit_for_number_of_violations')} (*)`,
    hintText: t1('limit_for_number_of_violations'),
    defaultValue: 20,
    // fullWidth: true,
    validate: [required(t1('limit_for_number_of_violations_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  no_fullscreen: {
    type: Toggle,
    label: t1('test_should_not_play_in_full_screen_mode'),
    labelPosition: 'right',
    classWrapper: 'col-md-12',
  },
  preload_data_time_amount: {
    type: 'number',
    floatingLabelText: `${t1('preload_data_time_amount')} (${t1(
      'minutes',
    )}) (*)`,
    hintText: `${t1('preload_data_time_amount')} (${t1('minutes')})`,
    defaultValue: 15,
    // fullWidth: true,
    validate: [required(t1('preload_data_time_amount_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  require_otp: {
    type: Toggle,
    label: t1('require_otp'),
    labelPosition: 'right',
    classWrapper: 'col-md-12',
  },
  allowed_submit_time: {
    type: 'number',
    floatingLabelText: `${t1('allowed_submit_time')} (${t1('seconds')}) (*)`,
    hintText: `${t1('allowed_submit_time')} (${t1('seconds')})`,
    defaultValue: 600,
    // fullWidth: true,
    validate: [required(t1('allowed_submit_time_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  exam_freeze_period: {
    type: 'number',
    floatingLabelText: `${t1('exam_freeze_period')} (${t1('hours')}) (*)`,
    hintText: `${t1('exam_freeze_period')} (${t1('hours')})`,
    defaultValue: 24,
    // fullWidth: true,
    validate: [required(t1('exam_freeze_period_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  allowed_edit_exam_shift_time: {
    type: 'number',
    floatingLabelText: `${t1('allowed_edit_exam_shift_time')} (${t1(
      'hours',
    )}) (*)`,
    hintText: `${t1('allowed_edit_exam_shift_time')} (${t1('hours')})`,
    defaultValue: 24,
    // fullWidth: true,
    validate: [required(t1('allowed_edit_exam_shift_time_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  advancing_criterion: {
    type: 'select',
    floatingLabelText: t1('choose_advancing_criterion'),
    hintText: t1('choose_advancing_criterion'),
    floatingLabelFixed: true,
    options: constants.advancingCriteria(),
    defaultValue: 'score',
    // fullWidth: true,
    classWrapper: 'col-md-12',
  },
  exam_format: {
    type: 'select',
    floatingLabelText: t1('exam_format'),
    hintText: t1('exam_format'),
    floatingLabelFixed: true,
    options: constants.examFormats(),
    defaultValue: '',
    // fullWidth: true,
    classWrapper: 'col-md-12',
  },
  scaled_total_score: {
    type: 'number',
    floatingLabelText: `${t1(
      'specify_scaled_total_score_if_it_is_different_from_total_score_in_paper',
    )} (*)`,
    hintText: `${t1(
      'specify_scaled_total_score_if_it_is_different_from_total_score_in_paper',
    )}`,
    defaultValue: 0,
    // validate: [required(t1('min_score_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  score_rounding_digits: {
    type: 'select',
    floatingLabelText: `${t1('rounding_digits')} (*)`,
    defaultValue: '0.0',
    options: constants.scoreRoundingDigits(),
    classWrapper: 'col-md-12',
  },
  score_rounding_algo: {
    type: 'select',
    floatingLabelText: `${t1('rounding_algorithm')} (*)`,
    defaultValue: 'round',
    options: constants.scoreRoundingAlgo(),
    classWrapper: 'col-md-12',
  },
  min_score: {
    type: 'number',
    floatingLabelText: `${t1(
      'minimum_passing_score_score_out_of_scaled_score',
    )} (*)`,
    hintText: `${t1('score_considered_as_pass')}`,
    defaultValue: 80,
    // fullWidth: true,
    validate: [required(t1('min_score_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  description: {
    type: RTE,
    selectorId: 'description_rte',
    hintText: t1('exam_round_description'),
    floatingLabelText: t1('exam_round_description'),
    defaultValue: '',
    errorText: '',
    classWrapper: 'col-md-12',
  },
  exam_template: {
    nameElement: 'exam_template',
    type: InputAutoComplete,
    limit: 1,
    floatingLabelText: t1('choose_exam_template'),
    fullWidth: true,
    baseUrl: examTemplateApiUrls.exam_template_search,
    dataSourceConfig: {
      text: 'name',
      value: 'iid',
      transformData: (res) =>
        res.map((data) => ({
          name: data.name,
          iid: data,
        })),
    },
    params: {
      status: 'approved',
      contest_code: values.contest_code,
    },
    classWrapper: 'col-md-12',
  },
  allow_practice_exam_template: {
    type: Toggle,
    label: t1('allow_practice_exam_template'),
    defaultValue: 0,
    normalize: convertBooleanValueToInt,
    classWrapper: 'col-md-12',
  },
  // number_exam_shifts: {
  //   type: 'text',
  //   defaultValue: 2,
  //   floatingLabelText: `${t1('number_exam_shifts')} (*)`,
  //   hintText: t1('number_exam_shifts'),
  //   placeholder: '',
  //   validate: [required(t1('number_exam_shifts_cant_be_empty'))],
  //   classWrapper: 'col-md-12',
  // },
  number_questions_per_bank: {
    type: 'text',
    defaultValue: 20,
    floatingLabelText: `${t1('number_questions_per_bank')} (*)`,
    hintText: t1('number_questions_per_bank'),
    placeholder: '',
    validate: [required(t1('number_questions_per_bank_cant_be_empty'))],
    classWrapper: 'col-md-12',
  },
  duration: itemDuration({
    defaultValue: '00:10:00',
    formatTime: durationDisplayFormats.TIME_IN_SECOND_FORMAT,
    title: t1('exam_duration'),
    classWrapper: 'col-md-12',
  }),
  // those stay in a section 'options' because they used to reside in examshift's syllabus
  options: {
    type: 'section',
    schema: {
      schema: {
        disable_question_audio_replay: checkbox(
          'disable_question_audio_replay',
          t1('disable_question_audio_replay'),
        ),
        retake_requires_admin_acceptance: checkbox(
          'retake_requires_admin_acceptance',
          t1('retake_requires_admin_acceptance'),
        ),
        can_do: {
          type: 'number',
          min: 0,
          defaultValue: 1,
          hintText: t1('number_of_times_students_can_do'),
          floatingLabelText: t1('number_of_times_students_can_do'),
          // fullWidth: true,
        },
        score_best_or_last_exam_order: finalScoreFormula(),
        instant_marking_on_finish: {
          type: 'checkbox',
          label: t1('instant_marking_on_finish'),
          fullWidth: true,
          normalize: convertBooleanValueToInt,
          onChange: (ev, value) => {
            onInstantMarkingChange(formid, value, values);
          },
        },
        limit_time_that_user_can_spend_on_each_question: itemDuration({
          formatTime: durationDisplayFormats.MINUTES_AND_SECONDS,
          title: t1(
            'limit_time_that_user_can_spend_on_each_question,_leave_empty_if_unlimited',
          ),
          valueIsNumberOfSeconds: true,
        }),
      },
      ui: () => [
        {
          id: 'default',
          fields: [
            'can_do',
            ...(lodashGet(values, 'options.can_do') > 1
              ? ['score_best_or_last_exam_order']
              : []),
            'limit_time_that_user_can_spend_on_each_question',
            'retake_requires_admin_acceptance',
            'disable_question_audio_replay',
            'instant_marking_on_finish',
          ],
        },
      ],
    },
    classWrapper: 'col-md-12',
  },
  invalid_questions: {
    type: 'array',
    schema: invalidQuestionsSchema,
  },
});

const ui = (step, values, themeConfig, xpath, formid, props) => {
  const topFields =
    values && values.advancing_criterion === 'top'
      ? ['number_of_advancing_contestants']
      : [];
  const scoreFields =
    values && values.advancing_criterion === 'score' ? ['min_score'] : [];
  const examTemplateField =
    values && values.enable_exam_template === true ? ['exam_template'] : [];

  if (Array.isArray(values.exam_template) && values.exam_template.length) {
    examTemplateField.push('allow_practice_exam_template');
  }

  const detailedInformationFields = [
    'advancing_criterion',
    ...topFields,
    ...scoreFields,
    ...examTemplateField,
    'exam_method',
  ];

  const policiesAndOtherSettingsFields = [
    'violation_limit',
    'allowed_submit_time',
    // 'exam_freeze_period',
    // 'allowed_edit_exam_shift_time',
    // 'publish_score_start_time',
    // 'publish_score_end_time',
    // 'total_score',
    'duration',
    'options',
    'should_show_score',
    'contestants_can_preview_take',
  ];

  const advanceSettingsFields = [
    'no_fullscreen',
    'preload_data_time_amount',
    // 'should_allow_remark',
    'exam_format',
    'scaled_total_score',
    ...(values.scaled_total_score
      ? ['score_rounding_digits', 'score_rounding_algo']
      : []),
    // 'require_otp',
  ];

  const configs = {
    new: [
      {
        id: 'left',
        title: t1('general_information'),
        fields: [
          'contest_code',
          'name',
          // 'start_time',
          // 'end_time',
          'description',
        ],
      },
      {
        id: 'left_two',
        title: t1('detailed_information'),
        fields: detailedInformationFields,
      },
      {
        id: 'right',
        title: t1('policies_and_other_settings'),
        fields: policiesAndOtherSettingsFields,
      },
      {
        id: 'right_two',
        title: t1('advanced_settings'),
        fields: advanceSettingsFields,
      },
    ],
    edit_exam_round: [
      {
        id: 'left',
        title: t1('general_information'),
        fields: [
          'contest_code',
          'name',
          // 'start_time',
          // 'end_time',
          'description',
        ],
      },
      {
        id: 'left_two',
        title: t1('detailed_information'),
        fields: detailedInformationFields,
      },
      {
        id: 'right',
        title: t1('policies_and_other_settings'),
        fields: policiesAndOtherSettingsFields,
      },
      {
        id: 'right_two',
        title: t1('advanced_settings'),
        fields: advanceSettingsFields,
      },
    ],
    edit_generate_practice_exam: [
      {
        id: 'left',
        fields: ['number_questions_per_bank'],
      },
    ],
    edit_invalid_questions: [
      {
        id: 'default',
        fields: ['invalid_questions'],
      },
    ],
  };

  return configs[step];
};

export default {
  schema,
  ui,
};
