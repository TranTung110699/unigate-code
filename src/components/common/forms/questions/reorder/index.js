import React from 'react';
import PropTypes from 'prop-types';
import Word from './word';
import Complex from './complex';
import { reorderTypes } from 'configs/constants';

class Reorder extends React.Component {
  render() {
    const { question } = this.props;
    const { reorder_type } = question || {};

    if (reorder_type === reorderTypes.WORD) {
      return <Word {...this.props} />;
    }

    return <Complex {...this.props} />;
  }
}

Reorder.propTypes = {
  disabled: PropTypes.bool,
  getHighlightsClass: PropTypes.func,
  question: PropTypes.shape(),
  resetHighlights: PropTypes.func,
  setUserAnswers: PropTypes.func,
  shouldShowKey: PropTypes.bool,
  userAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

Reorder.defaultProps = {
  disabled: false,
  getHighlightsClass: () => {},
  question: {},
  resetHighlights: () => {},
  setUserAnswers: () => {},
  shouldShowKey: false,
  userAnswers: null,
};

export default Reorder;
