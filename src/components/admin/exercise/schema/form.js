import { required } from 'common/validators';
import {
  constants,
  layouts,
  questionDisplayTemplateOptions,
} from 'configs/constants';
import { t1 } from 'translate';
// import { getTimeInSeconds } from 'common/utils/Date';
import { getPassingSchemeRelatedSchema } from 'common/learn/exercise/form';
import Store from 'store';
import { getThemeConfig } from 'utils/selectors';
import { itemDuration } from 'components/common/elements/duration';
import InputToken from 'schema-form/elements/input-token';

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('exercise_name'),
    floatingLabelText: t1('enter_exercise_name'),
    defaultValue: '',
    errorText: '',
    validate: [required(t1('exercise_name_cannot_be_empty'))],
    required: true,
  },
  name_mobile: {
    type: 'text',
    hintText: t1('short_name_(for_mobile_app)'),
    floatingLabelText: t1('enter_exercise_short_name'),
    defaultValue: '',
    errorText: '',
    validate: [required(t1('short_name_cannot_be_empty'))],
  },
  type: {
    type: 'radio',
    floatingLabelText: t1('exercise_type'),
    floatingLabelFixed: true,
    options: constants.exerciseTypeOptions(),
    fullWidth: true,
    // defaultValue: constants.exerciseTypeOptions[0].value,
  },
  content: {
    type: 'text',
    hintText: t1('content'),
    floatingLabelText: t1('enter_content'),
    defaultValue: '',
    errorText: '',
  },
  exercise__vid: {
    type: 'text',
    hintText: t1('youtube_exercise_id'),
    floatingLabelText: t1('enter_youtube_video'),
    defaultValue: '',
    errorText: '',
    validate: required(),
  },
  speaking_type: {
    type: 'select',
    floatingLabelText: t1('speaking_type'),
    floatingLabelFixed: true,
    options: constants.speakingType(),
    fullWidth: true,
  },
  tags: {
    type: InputToken,
    floatingLabelText: t1('tags'),
    fullWidth: true,
  },
  duration: itemDuration({
    defaultValue: '05:00',
    title:
      values.type === 'exam'
        ? t1('exercise_exam_duration')
        : t1('recommended_practice_duration'),
  }),
  paper_number: {
    type: 'number',
    hintText: t1('the_number_of_paper_we_will_gen_when_item_approved'),
    floatingLabelText: t1('paper_number'),
    defaultValue: '',
    errorText: '',
  },
  max_number_of_questions_per_try: {
    type: 'number',
    hintText: t1('max_number_of_questions_per_try'),
    floatingLabelText: t1('max_number_of_questions_per_try'),
    defaultValue: 0,
    errorText: '',
  },
  question_display_template: {
    type: 'radio',
    floatingLabelText: t1('question_display_template'),
    options: questionDisplayTemplateOptions(),
  },
  ...(getPassingSchemeRelatedSchema(formid, values) || {}),
});

/**
 *
 * @param values
 * @param isEditing
 * @return {string[]}
 */
const getEditDefaults = (values, isEditing) => {
  const themeConfig = getThemeConfig(Store.getState());
  let results = [];
  if (themeConfig.layout === layouts.XPEAK) {
    if (values && values.type === 'exam') {
      results = ['name', 'name_mobile', 'type', 'paper_number'];
    } else {
      results = ['name', 'name_mobile', 'type'];
    }
  } else {
    results = ['name', 'type'];
  }

  results.push('passing_scheme_data');

  // as of Aug 11, 2019, we remove passing_scheme
  // and use the default value. Just so we can make UI less confusing for people
  // if (isEditing)
  //   results.push('passing_scheme');

  results = results.concat(['duration', 'tags']);

  return results;
};

const ui = (step, values) => {
  const config = {
    new: [
      // step == ''
      {
        fields: ['name', 'passing_scheme_data', 'tags', 'duration'], // ['type', 'name', 'content'],
        title: '',
      },
    ],
    edit: [
      {
        fields: getEditDefaults(values, true),
        title: t1('basic_info'),
      },
    ],
    edit_advanced_settings: [
      {
        fields: [
          'question_display_template',
          'max_number_of_questions_per_try',
        ],
        title: t1('other_advanced_settings'),
      },
    ],
  };

  return config[step];
};

const validateIntroSticky = (data) => {
  const metadata = data && data.metadata;
  if (!Array.isArray(metadata)) {
    return data;
  }
  const newMetadata = metadata.map((child, index, arr) => {
    if (
      child &&
      child.intro_sticky &&
      ((arr[index - 1] && arr[index - 1].group === child.group) ||
        !arr[index + 1] ||
        arr[index + 1].group !== child.group)
    ) {
      return {
        ...child,
        intro_sticky: 0,
      };
    }
    return child;
  });
  return {
    ...data,
    metadata: newMetadata,
  };
};

const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  if (mode === 'edit' && step === 'metadata') {
    return validateIntroSticky(fullData);
  }
  return fullData;
};

const exercise = {
  schema,
  ui,
  finalProcessBeforeSubmit,
};

export default exercise;
