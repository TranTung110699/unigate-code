import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import {
  globalSurveyApplicationOptions,
  surveyTargetTypeOptions,
  surveyTargetTypes,
} from 'configs/constants/survey';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import InputToken from 'schema-form/elements/input-token';
import RTE from 'schema-form/elements/richtext';

const displayFields = [
  'faculty',
  'major',
  'training_mode',
  'training_level',
  'ico',
];

const schema = (formid, values) => {
  return {
    code: {
      type: 'text',
      hintText: t1('code'),
      classWrapper: 'col-md-12',
      floatingLabelText: t1('code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    survey_target_type: {
      type: 'select',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('survey_target_type'),
      floatingLabelFixed: true,
      fullWidth: true,
      options: surveyTargetTypeOptions(),
      defaultValue: surveyTargetTypes.APPLIED_ITEM,
    },
    name: {
      type: 'text',
      hintText: t1('name'),
      floatingLabelText: t1('name'),
      classWrapper: 'col-md-12',
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    title: {
      type: 'text',
      hintText: t1('title'),
      classWrapper: 'col-md-12',
      floatingLabelText: t1('title'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    overview: {
      type: RTE,
      hintText: t1('overview'),
      classWrapper: 'col-md-12',
      floatingLabelText: t1('overview'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    tags: {
      type: InputToken,
      classWrapper: 'col-md-12',
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    calculate_rating_automatically: {
      type: 'checkbox',
      classWrapper: 'col-md-12',
      label: t1('calculate_rating_automatically'),
    },
    is_global_survey: {
      type: 'checkbox',
      classWrapper: 'col-md-12',
      label: t1('is_global_survey'),
    },
    global_survey_application: {
      type: 'multiCheckbox',
      classWrapper: 'col-md-12',
      floatingLabelText: t1('global_survey_application'),
      options: globalSurveyApplicationOptions(values.global_survey_application),
    },
    form_of_training_apply: {
      type: 'cascade',
      schema: getMajorBoxSchema({
        floatingLabelText: t1('form_of_training'),
        displayFields,
        notValidate: true,
        forSearch: true,
      }),
    },
    apply_survey_for: {
      type: 'select',
      fullWidth: true,
      classWrapper: 'col-md-12',
      floatingLabelText: t1('apply_survey_for'),
      defaultValue: 'end_semester',
      validate: [required(t1('apply_survey_for_cannot_be_empty'))],
      options: [
        {
          value: 'start_semester',
          primaryText: t1('start_semester'),
          label: t1('start_semester'),
        },
        {
          value: 'end_semester',
          primaryText: t1('end_semester'),
          label: t1('end_semester'),
        },
      ],
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, props = {}) => {
  const { isSIS } = props;

  let fields = [];
  switch (step) {
    case 'new': {
      if (isSIS) {
        fields = [
          'name',
          'code',
          'title',
          // 'form_of_training_apply',
          'apply_survey_for',
          'calculate_rating_automatically',
          'tags',
        ];
        break;
      }
      fields = [
        'name',
        'code',
        'survey_target_type',
        'is_global_survey',
        values.is_global_survey && 'global_survey_application',
        'title',
        'calculate_rating_automatically',
        'tags',
      ].filter(Boolean);
      break;
    }
    case 'edit': {
      if (isSIS) {
        fields = [
          'name',
          'code',
          'title',
          // 'form_of_training_apply',
          'apply_survey_for',
          'calculate_rating_automatically',
          'tags',
        ];
        break;
      }
      fields = [
        'name',
        'code',
        'survey_target_type',
        'is_global_survey',
        ...(values.is_global_survey ? ['global_survey_application'] : []),
        'title',
        'calculate_rating_automatically',
        'tags',
      ];
      break;
    }
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const layout = {
  new: '',
};

export default {
  schema,
  ui,
};
