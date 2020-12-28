// const fields = ['name'];
import { t1 } from 'translate';
import { change } from 'redux-form';
import { inRange, required } from 'common/validators';
import store from 'store';
import { constants, vocabsetPassingScheme } from 'configs/constants';
import InputToken from 'schema-form/elements/input-token';

const onPassingSchemeValueChange = (formid, passingScheme, values) => {
  const conf =
    (store.getState().domainInfo && store.getState().domainInfo.conf) || {};
  const defaultPassingScore = conf.default_exercise_passing_score || 100;
  if (passingScheme === vocabsetPassingScheme.AVERAGE_QUESTION_SCORE) {
    store.dispatch(change(formid, 'passing_scheme_data', defaultPassingScore));
  }
};

const schema = (formid, values) => ({
  name: {
    type: 'text',
    hintText: t1('name_of_vocabset'),
    floatingLabelText: t1('enter_name_of_vocabset'),
    defaultValue: '',
    errorText: '',
    validate: [required(t1('name_cannot_be_empty'))],
  },
  tags: {
    type: InputToken,
    floatingLabelText: t1('tags'),
    fullWidth: true,
  },
  passing_scheme: {
    type: 'select',
    floatingLabelText: t1('passing_scheme'),
    floatingLabelFixed: true,
    options: constants.vocabsetPassingSchemeOptions(),
    fullWidth: true,
    defaultValue: vocabsetPassingScheme.AVERAGE_QUESTION_SCORE,
    onChange: (event, value) =>
      onPassingSchemeValueChange(formid, value, values),
  },
  passing_scheme_data: {
    type: 'number',
    step: 0.01,
    min: 0,
    validate: [inRange(0, null, t1('value_must_be_greater_than_%s', [0]))],
    floatingLabelText: t1('passing_score'),
    floatingLabelFixed: true,
    fullWidth: true,
  },
});

const getPassingSchemeRelatedFields = (values) => {
  let results = ['passing_scheme'];
  if (values && values.passing_scheme) {
    results = results.concat(['passing_scheme_data']);
  }
  return results;
};

const ui = (step, values) => {
  const config = {
    new: [
      // step == ''
      {
        fields: ['name', 'tags'].concat(getPassingSchemeRelatedFields(values)), // ['type', 'name', 'content'],
        title: '',
      },
    ],
    edit: [
      {
        fields: ['name', 'tags'].concat(getPassingSchemeRelatedFields(values)),
        title: '',
      },
    ],
  };

  return config[step];
};

const vocabset = {
  schema,
  ui,
};

export default vocabset;
