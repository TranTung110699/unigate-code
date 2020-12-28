import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import lodashGet from 'lodash.get';
import { confSelector } from 'common/selectors';
import { getSurveyNumberQuestionRange } from 'common/conf';
import { isQuestionUsedForSurvey } from 'components/admin/node/utils';

class NumberQuestionTypeText extends React.Component {
  getValue = () => {
    const { userAnswers } = this.props;
    return lodashGet(userAnswers, '[0]');
  };

  setValue = (value) => {
    const { setUserAnswers } = this.props;
    if (typeof setUserAnswers === 'function') {
      setUserAnswers([Number.parseInt(value, 10)]);
    }
  };

  render() {
    const { min, max } = this.props;

    return (
      <TextField
        type="number"
        value={this.getValue()}
        onChange={(event, value) => {
          this.setValue(value);
        }}
        min={min}
        max={max}
      />
    );
  }
}

NumberQuestionTypeText.propTypes = {
  disabled: PropTypes.bool,
  getHighlightsClass: PropTypes.func,
  question: PropTypes.shape(),
  resetHighlights: PropTypes.func,
  setUserAnswers: PropTypes.func,
  shouldShowKey: PropTypes.bool,
  userAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

NumberQuestionTypeText.defaultProps = {
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

export default connect(mapStateToProps)(NumberQuestionTypeText);
