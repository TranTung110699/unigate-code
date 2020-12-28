import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confSelector } from 'common/selectors';
import { getSurveyNumberQuestionRange } from 'common/conf';
import { isQuestionUsedForSurvey } from 'components/admin/node/utils';
import Radio from 'schema-form/elements/radio';
import lodashGet from 'lodash.get';

class NumberQuestionTypeRadio extends React.Component {
  getValue = () => {
    const { userAnswers } = this.props;
    return lodashGet(userAnswers, '[0]');
  };

  setValue = (event, value) => {
    const { setUserAnswers } = this.props;
    if (typeof setUserAnswers === 'function') {
      setUserAnswers([value]);
    }
  };

  render() {
    const options = (lodashGet(this.props, 'question.answers2') || []).map(
      (a) => ({
        value: lodashGet(a, 'value'),
        label: lodashGet(a, 'text'),
      }),
    );

    return (
      <Radio
        options={options}
        value={this.getValue()}
        onChange={this.setValue}
      />
    );
  }
}

NumberQuestionTypeRadio.propTypes = {
  disabled: PropTypes.bool,
  getHighlightsClass: PropTypes.func,
  question: PropTypes.shape(),
  resetHighlights: PropTypes.func,
  setUserAnswers: PropTypes.func,
  shouldShowKey: PropTypes.bool,
  userAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

NumberQuestionTypeRadio.defaultProps = {
  disabled: false,
  getHighlightsClass: () => {},
  question: {},
  resetHighlights: () => {},
  setUserAnswers: () => {},
  shouldShowKey: false,
  userAnswers: null,
};

const mapStateToProps = (state, props) => {
  const { question } = props;
  let min;
  let max;
  if (isQuestionUsedForSurvey(question, false, false)) {
    const surveyNumberQuestionRange = getSurveyNumberQuestionRange(
      confSelector(state),
    );
    min = lodashGet(surveyNumberQuestionRange, 'min');
    max = lodashGet(surveyNumberQuestionRange, 'max');
  }
  return {
    min,
    max,
  };
};

export default connect(mapStateToProps)(NumberQuestionTypeRadio);
