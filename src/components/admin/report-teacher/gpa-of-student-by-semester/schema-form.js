import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import store from 'store/index';
import { change } from 'redux-form';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';
import apiUrls from 'api-endpoints';
import { required } from 'common/validators';
import { scoreScaleTypes } from 'configs/constants/index';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import SearchFormLayout from './SearchFormLayout';

const schema = (formid, values) => ({
  form_of_training: {
    type: 'cascade',
    classWrapper: 'col-md-12',
    schema: getMajorBoxSchema({
      displayFields: ['faculty', 'major', 'training_mode', 'training_level'],
      notValidate: true,
      forSearch: true,
      multiple: true,
    }),
    fullWidth: true,
  },
  ico_school_year_and_semester: {
    type: 'cascade',
    classWrapper: 'col-md-12',
    schema: getMajorBoxSchema({
      displayFields: ['school_year', 'semester', 'ico'],
      notValidate: true,
      forSearch: true,
      multiple: true,
    }),
    fullWidth: true,
  },
  student_name: {
    type: 'text',
    classWrapper: 'col-md-4',
    floatingLabelText: t1('student_name_or_code_or_mail'),
    fullWidth: true,
  },
  score_scale: {
    type: 'select',
    classWrapper: 'col-md-2',
    floatingLabelText: t1('score_scale'),
    options: 'async',
    paramsasync: {
      __url__: apiUrls.get_all_score_scale,
    },
    fullWidth: true,
    inline: true,
  },
  score: {
    type: 'cascade',
    classWrapper: `col-md-2 ${
      [scoreScaleTypes.abcdf, scoreScaleTypes.pmd].includes(
        get(values, 'score_scale'),
      )
        ? 'm-t-15'
        : ''
    }`,
    component: (
      <Marking
        editableInline
        disabled={!get(values, 'score_scale')}
        floatingLabelText={t1('min_score_by_score_scale')}
        scoreScale={get(values, 'score_scale')}
        scalePartIdAsValue
        label={t1('score')}
        onChange={(value) => {
          store.dispatch(change(formid, 'score', value || null));
        }}
      />
    ),
    fullWidth: true,
  },
  not_have_to_retake: {
    type: 'checkbox',
    label: t1('not_have_to_retake_in_sermester'),
    classWrapper: 'col-md-4 m-t-30',
  },
});

const ui = () => [
  {
    id: 'default',
    fields: [
      'form_of_training',
      'ico_school_year_and_semester',
      'student_name',
      'score_scale',
      'score',
      'not_have_to_retake',
    ],
  },
];

export default {
  schema,
  ui,
  layout: { component: SearchFormLayout, freestyle: 1 },
};
