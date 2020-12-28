import React from 'react';
import PropTypes from 'prop-types';
import SelectionBlock from './SelectionBlock';
import FlipMove from 'react-flip-move';
import { t1 } from 'translate';
import './reorder.scss';

class Reorder extends React.Component {
  cssClass = 'reorder-question-type-word';

  addUserAnswer = (id) => {
    const { disabled } = this.props;
    if (disabled) return;
    const { userAnswers, setUserAnswers, resetHighlights } = this.props;
    resetHighlights();
    setUserAnswers(userAnswers ? userAnswers.concat([[id]]) : [[id]]);
  };

  removeUserAnswer = (id) => {
    const { disabled } = this.props;
    if (disabled) return;
    const { userAnswers, setUserAnswers, resetHighlights } = this.props;
    resetHighlights();
    setUserAnswers(userAnswers.filter((item) => item[0] !== id));
  };

  render() {
    const {
      className,
      userAnswers,
      question,
      shouldShowKey,
      getHighlightsClass,
    } = this.props;
    const { reorders, answer_as_hint } = question;

    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        <FlipMove
          className={`${this.cssClass}__section\
          ${this.cssClass}__section--answer`}
        >
          {[
            <div
              key="answer-height-maintainer"
              className={`${this.cssClass}__answer-height-maintainer`}
            />,
            ...((userAnswers &&
              userAnswers.length > 0 &&
              userAnswers.map((answer) => {
                const id = answer[0];
                return (
                  <SelectionBlock
                    className={`${
                      this.cssClass
                    }__selection-block ${getHighlightsClass(id)}`}
                    key={id}
                    onClick={() => this.removeUserAnswer(id)}
                    content={reorders.find((r) => r.id === id).content}
                  />
                );
              })) || [
              <div
                className={`${this.cssClass}__placeholder`}
                key="placeholder"
              >
                <div>{`${t1('your_answer_is_empty')}.`}</div>
                {shouldShowKey ? null : (
                  <div>({t1('click_on_the_words_below_to_answer')})</div>
                )}
              </div>,
            ]),
            <hr className={`${this.cssClass}__underline`} key="underline" />,
            <div
              className={`${this.cssClass}__section-divider`}
              key="section-divider-answer"
            />,
            ...((!shouldShowKey &&
              reorders &&
              reorders.map((reorder) => {
                const selected =
                  userAnswers &&
                  userAnswers.findIndex(
                    (answer) => answer[0] === reorder.id,
                  ) !== -1;
                return (
                  <SelectionBlock
                    className={`${this.cssClass}__selection-block`}
                    selected={selected}
                    key={selected ? `${reorder.id}-selected` : reorder.id}
                    onClick={() => {
                      if (!selected) {
                        this.addUserAnswer(reorder.id);
                      } else {
                        this.removeUserAnswer(reorder.id);
                      }
                    }}
                    content={reorder.content}
                  />
                );
              })) ||
              []),
          ]}
        </FlipMove>
        <div className={`${this.cssClass}__section`}>
          {shouldShowKey && [
            <div
              className={`${this.cssClass}__section-divider`}
              key="section-divider-key"
            />,
            <div
              key="answer-help-text"
              className={`${this.cssClass}__help-text`}
            >
              {t1('correct_answer')}
            </div>,
            ...((answer_as_hint &&
              answer_as_hint.map((answer) => (
                <SelectionBlock
                  className={`${this.cssClass}__selection-block`}
                  key={answer.id}
                  content={answer.content}
                />
              ))) ||
              []),
          ]}
        </div>
      </div>
    );
  }
}

Reorder.propTypes = {
  disabled: PropTypes.bool,
  getHighlightsClass: PropTypes.func,
  question: PropTypes.shape(),
  resetHighlights: PropTypes.func,
  setUserAnswers: PropTypes.func,
  shouldShowKey: PropTypes.bool,
  userAnswers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
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
