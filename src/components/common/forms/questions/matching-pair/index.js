import React from 'react';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import MatchingPairHalf from './MatchingPairHalf';
import './matching-pair.scss';

class MatchingPair extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { setUserAnswers, userAnswers, resetHighlights } = this.props;
    resetHighlights();
    setUserAnswers(arrayMove(userAnswers, oldIndex, newIndex));
  };

  render() {
    const {
      userAnswers,
      question,
      shouldShowKey,
      disabled,
      getHighlightsClass,
    } = this.props;
    const { l_pair, r_pair, answer_as_hint } = question;

    const fullUserAnswers =
      userAnswers &&
      userAnswers.map((answer) => {
        const id = answer[0];
        const elem = r_pair.find((item) => item.id === id);
        return (
          elem && {
            ...elem,
            class: getHighlightsClass(id),
          }
        );
      });

    return (
      <div>
        <div className="matching-pair-question">
          <MatchingPairHalf items={l_pair} />
          <MatchingPairHalf
            items={fullUserAnswers}
            sortable={!disabled}
            onSortEnd={this.handleSortEnd}
          />
        </div>
        {shouldShowKey && (
          <div>
            <h5>Answer</h5>
            <div className="matching-pair-question">
              <MatchingPairHalf items={answer_as_hint.l_pair} />
              <MatchingPairHalf items={answer_as_hint.r_pair} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

MatchingPair.propTypes = {
  disabled: PropTypes.bool,
  getHighlightsClass: PropTypes.func,
  question: PropTypes.shape(),
  resetHighlights: PropTypes.func,
  setUserAnswers: PropTypes.func,
  shouldShowKey: PropTypes.bool,
  userAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

MatchingPair.defaultProps = {
  disabled: false,
  getHighlightsClass: () => {},
  question: {},
  resetHighlights: () => {},
  setUserAnswers: () => {},
  shouldShowKey: false,
  userAnswers: null,
};

export default MatchingPair;
