import { change } from 'redux-form';
import store from 'store';
import { constants, exercisePassingScheme } from 'configs/constants';
import { inRange, required } from 'common/validators';
import { t1 } from 'translate';

const onPassingSchemeValueChange = (formid, passingScheme) => {
  const conf =
    (store.getState().domainInfo && store.getState().domainInfo.conf) || {};
  let defaultPassingScore = conf.default_exercise_passing_score;
  defaultPassingScore =
    typeof defaultPassingScore === 'number' ? defaultPassingScore : 100;

  let defaultMaxNumberOfFailedQuestions =
    conf.default_exercise_max_number_of_failed_questions;
  defaultMaxNumberOfFailedQuestions =
    typeof defaultMaxNumberOfFailedQuestions === 'number'
      ? defaultMaxNumberOfFailedQuestions
      : 0;

  let defaultMaxPercentOfFailedQuestions =
    conf.default_exercise_max_percent_of_failed_questions;
  defaultMaxPercentOfFailedQuestions =
    typeof defaultMaxPercentOfFailedQuestions === 'number'
      ? defaultMaxPercentOfFailedQuestions
      : 0;

  if (passingScheme === exercisePassingScheme.AVERAGE_QUESTION_SCORE) {
    store.dispatch(change(formid, 'passing_scheme_data', defaultPassingScore));
  } else if (
    passingScheme === exercisePassingScheme.NUMBER_OF_FAILED_QUESTIONS
  ) {
    store.dispatch(
      change(formid, 'passing_scheme_data', defaultMaxNumberOfFailedQuestions),
    );
  } else if (
    passingScheme === exercisePassingScheme.PERCENT_OF_FAILED_QUESTIONS
  ) {
    store.dispatch(
      change(formid, 'passing_scheme_data', defaultMaxPercentOfFailedQuestions),
    );
  }
};

export const getPassingSchemeRelatedFields = (values) => {
  let results = ['passing_scheme'];
  if (values && values.passing_scheme) {
    results = results.concat(['passing_scheme_data']);
  }
  return results;
};

export const getPassingSchemeRelatedSchema = (formid, values) => {
  return {
    passing_scheme: {
      type: 'select',
      floatingLabelText: t1('passing_scheme'),
      floatingLabelFixed: true,
      options: constants.exercisePassingSchemeOptions(),
      fullWidth: true,
      defaultValue: exercisePassingScheme.AVERAGE_QUESTION_SCORE,
      onChange: (event, value) =>
        onPassingSchemeValueChange(formid, value, values),
    },
    ...(values &&
    (typeof values.passing_scheme == 'undefined' ||
      values.passing_scheme === exercisePassingScheme.AVERAGE_QUESTION_SCORE)
      ? {
          passing_scheme_data: {
            type: 'number',
            step: 0.01,
            min: 0,
            max: 100,
            defaultValue: 100,
            validate: [
              required(t1('value_is_required')),
              inRange(0, 100, t1('value_must_be_between_%s_and_%s', [0, 100])),
            ],
            floatingLabelText: t1('passing_score_out_of_100'),
            floatingLabelFixed: true,
            fullWidth: true,
          },
        }
      : {}),
    ...(values &&
    values.passing_scheme === exercisePassingScheme.NUMBER_OF_FAILED_QUESTIONS
      ? {
          passing_scheme_data: {
            type: 'number',
            step: 1,
            min: 0,
            validate: [
              required(t1('value_is_required')),
              inRange(0, null, t1('value_must_be_greater_than_%s', [0])),
            ],
            floatingLabelText: t1('maximum_number_of_failed_questions'),
            floatingLabelFixed: true,
            fullWidth: true,
          },
        }
      : {}),
    ...(values &&
    values.passing_scheme === exercisePassingScheme.PERCENT_OF_FAILED_QUESTIONS
      ? {
          passing_scheme_data: {
            type: 'number',
            step: 0.01,
            min: 0,
            validate: [
              required(t1('value_is_required')),
              inRange(0, 100, t1('value_must_be_between_%s_and_%s', [0, 100])),
            ],
            floatingLabelText: t1('maximum_percentage_of_failed_questions'),
            floatingLabelFixed: true,
            fullWidth: true,
          },
        }
      : {}),
  };
};
