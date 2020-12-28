import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import Paper from 'material-ui/Paper';
import './reorder.scss';

const cssClass = 'reorder-question-type-complex';

const AnswerItem = ({ className, reorder }) => (
  <Paper className={`${cssClass}__answer-item ${className || ''}`}>
    <div className={`${cssClass}__answer-item-avatar`}>
      {reorder.avatar && <img style={{ width: '100%' }} src={reorder.avatar} />}
    </div>
    <div className={`${cssClass}__answer-item-content`}>{reorder.content}</div>
  </Paper>
);

const SortableItem = SortableElement(AnswerItem);

const AnswerList = ({
  sortable,
  userAnswers,
  question,
  getHighlightsClass,
}) => (
  <div className={`${cssClass}__answer`}>
    {userAnswers &&
      userAnswers.map((answer, index) => {
        const id = answer[0];
        const { reorders } = question || {};

        const reorder = reorders && reorders.find((item) => item.id === id);

        const ItemComponent = sortable ? SortableItem : AnswerItem;

        return (
          reorder && (
            <ItemComponent
              className={getHighlightsClass(id)}
              reorder={reorder}
              key={`item-${index}`}
              index={index}
            />
          )
        );
      })}
  </div>
);

const SortableList = SortableContainer((props) =>
  AnswerList({ ...props, sortable: true }),
);

class Reorder extends React.Component {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    const {
      disabled,
      userAnswers,
      setUserAnswers,
      resetHighlights,
    } = this.props;
    if (disabled) return;

    resetHighlights();

    if (typeof setUserAnswers === 'function') {
      setUserAnswers(arrayMove(userAnswers, oldIndex, newIndex));
    }
  };

  render() {
    const { className, question, shouldShowKey } = this.props;
    const { answer_as_hint } = question;

    const componentClassName = `${className || ''} ${cssClass}`;

    return (
      <div className={componentClassName}>
        {shouldShowKey ? (
          <AnswerList {...this.props} />
        ) : (
          <SortableList
            {...this.props}
            helperClass="sortable-element"
            onSortEnd={this.handleSortEnd}
          />
        )}
        <div className={`${cssClass}__section`}>
          {shouldShowKey && [
            <div key="answer-help-text" className={`${cssClass}__help-text`}>
              {t1('correct_answer')}
            </div>,
            ...((answer_as_hint &&
              answer_as_hint.map((answer) => (
                <AnswerItem key={answer.id} reorder={answer} />
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
