import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Scrollbars from 'react-custom-scrollbars';
import { findDOMNode } from 'react-dom';
import './Detail.scss';

class NormalExerciseResultDetail extends React.Component {
  cssClass = 'normal-exercise-result-detail';

  constructor(props) {
    super(props);
    this.state = {
      contentWidth: 0,
    };
  }

  componentDidMount() {
    this.updateContentWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateContentWidth(this.state.contentWidth);
  }

  updateContentWidth = (currentContentWidth) => {
    const contentElNode = findDOMNode(this.contentEl);
    if (contentElNode) {
      const contentWidth = contentElNode.getBoundingClientRect().width;
      if (contentWidth !== currentContentWidth) {
        this.setState({
          contentWidth,
        });
      }
    }
  };

  render() {
    const { className, exercise, actionProps } = this.props;
    const { onFixButtonClick } = actionProps || {};
    const canFix = typeof onFixButtonClick === 'function';
    if (
      !exercise ||
      !Array.isArray(exercise.children) ||
      exercise.children.length === 0
    ) {
      return null;
    }
    const questions = exercise.children;
    const { contentWidth } = this.state;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__main`}>
          <table className={`${this.cssClass}__title`}>
            <thead>
              <tr>
                <th>{t1('question')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t1('correct')}</td>
              </tr>
            </tbody>
          </table>
          <Scrollbars
            className={`${this.cssClass}__content`}
            style={{
              width: contentWidth,
            }}
            autoHeight
            autoHeightMax={Infinity}
            renderThumbHorizontal={(props) => (
              <div
                {...props}
                className={`${this.cssClass}__content-thumb-horizontal`}
              />
            )}
          >
            <div className={`${this.cssClass}__content-wrapper`}>
              <table
                ref={(el) => {
                  this.contentEl = el;
                }}
                className={`${this.cssClass}__content`}
              >
                <thead>
                  <tr>
                    {questions.map((question, index) =>
                      question ? (
                        <th key={question.uniqueId}>{index + 1}</th>
                      ) : (
                        <th key={index}>&nbsp;</th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {questions.map((question, index) =>
                      question ? (
                        <td key={question.uniqueId}>
                          <button
                            className={`${this.cssClass}__action ${
                              canFix ? '' : `${this.cssClass}__action--disabled`
                            }`}
                            onClick={
                              canFix ? () => onFixButtonClick(question) : null
                            }
                          >
                            {question.isCorrect ? (
                              <Icon
                                className={`${this.cssClass}__question-result\
                                          ${
                                            this.cssClass
                                          }__question-result--correct`}
                                icon="question_correct"
                              />
                            ) : (
                              <Icon
                                className={`${this.cssClass}__question-result\
                                          ${
                                            this.cssClass
                                          }__question-result--wrong`}
                                icon="question_wrong"
                              />
                            )}
                          </button>
                        </td>
                      ) : (
                        <td key={index}>&nbsp;</td>
                      ),
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </Scrollbars>
        </div>
        <div className={`${this.cssClass}__message`}>
          {onFixButtonClick && (
            <h5>
              {t1(
                'click_on_the_correct/incorrect_icon_to_go_back_to_the_question',
              )}
            </h5>
          )}
        </div>
      </div>
    );
  }
}

NormalExerciseResultDetail.propTypes = {
  actionProps: PropTypes.shape(),
  className: PropTypes.string,
  exercise: PropTypes.shape(),
};

NormalExerciseResultDetail.defaultProps = {
  actionProps: null,
  className: '',
  exercise: null,
};

export default NormalExerciseResultDetail;
