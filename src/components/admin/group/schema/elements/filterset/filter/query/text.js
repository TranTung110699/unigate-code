import { t1 } from 'translate/index';

const textMatchingTypes = () => [
  {
    value: '$eq',
    primaryText: t1('exact_match'),
  },
  {
    value: '$like',
    primaryText: t1('similar_match'),
  },
];

/**
 * Operator matching types to search like, equal and $empty find item doesn't exists
 * @returns {*[]}
 */
const operatorMatchingTypes = () => [
  {
    value: '',
    primaryText: t1('all'),
  },
  {
    value: '$empty',
    primaryText: t1('empty_match'),
  },
  {
    value: '$eq',
    primaryText: t1('exact_match'),
  },
  {
    value: '$like',
    primaryText: t1('similar_match'),
  },
];

const totalCreditCompareConditionOptions = () => [
  {
    value: '>=',
    primaryText: t1('total_credit_>='),
  },
  {
    value: '<=',
    primaryText: t1('total_credit_<='),
  },
];

const averageScoreCompareConditionOptions = () => [
  {
    value: '>=',
    primaryText: t1('average_score_>='),
  },
  {
    value: '<=',
    primaryText: t1('average_score_<='),
  },
];

export const text = (labelText) => ({
  type: 'text',
  floatingLabelText: labelText
    ? labelText
    : t1('user_name,_email,_id_or_code...'),
  // defaultValue: 'name',
  floatingLabelFixed: false,
  errorText: '',
  fullWidth: true,
});

export const textOp = () => ({
  type: 'select',
  floatingLabelText: t1('matching_type'),
  floatingLabelFixed: false,
  errorText: '',
  fullWidth: true,
  defaultValue: '$like',
  options: textMatchingTypes(),
});

/**
 * Operator matching types to search like, equal and $empty find item doesn't exists
 *
 * @returns {{floatingLabelText, errorText: string, fullWidth: boolean, defaultValue: string, options: *[], floatingLabelFixed: boolean, type: string}}
 */
export const fullTextOp = () => ({
  type: 'select',
  floatingLabelText: t1('matching_type'),
  floatingLabelFixed: false,
  errorText: '',
  fullWidth: true,
  defaultValue: '$like',
  options: operatorMatchingTypes(),
});

export const totalCreditCompareCondition = () => ({
  type: 'select',
  floatingLabelText: t1('total_credit_compare_condition'),
  floatingLabelFixed: false,
  errorText: '',
  defaultValue: '>=',
  options: totalCreditCompareConditionOptions(),
});

export const averageScoreCompareCondition = () => ({
  type: 'select',
  floatingLabelText: t1('average_score_compare_condition'),
  floatingLabelFixed: false,
  errorText: '',
  defaultValue: '>=',
  options: averageScoreCompareConditionOptions(),
});

export const subjectConditionOptions = () => [
  {
    value: 'all',
    primaryText: t1('all'),
  },
  {
    value: 'passed_all',
    primaryText: t1('passed_all'),
  },
  {
    value: 'has_a_not_pass_subject',
    primaryText: t1('has_a_not_pass_subject'),
  },
];
