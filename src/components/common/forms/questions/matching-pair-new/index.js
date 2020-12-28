import React from 'react';
import PropTypes from 'prop-types';
import './matching-pair.scss';
import FixedItem from './FixedItem';
import MovableItem from './MovableItem';
import Measure from 'react-measure';
import { get, set } from 'common/utils/object';

const DEFAULT_OFFSET_FOR_ELEMENT_TO_CONSIDER_TOUCHED = 15;

class MatchingPair extends React.Component {
  cssClass = 'matching-pair-question';

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      draggingItem: null,
      fixedParts: {},
      movableParts: {},
    };
  }

  isAllOriginalPositionsSet = (props, state) => {
    const numberOfFixedItems = get(props, 'question.l_pair.length');
    const numberOfMovableItems = get(props, 'question.r_pair.length');

    const numberOfFixedItemsWithPositionSet = Object.values(
      get(state, 'fixedParts', {}),
    ).filter((elem) => get(elem, 'originalPosition')).length;

    const numberOfMovableItemsWithPositionSet = Object.values(
      get(state, 'movableParts', {}),
    ).filter((elem) => get(elem, 'originalPosition')).length;

    return (
      numberOfFixedItems === numberOfFixedItemsWithPositionSet &&
      numberOfMovableItems === numberOfMovableItemsWithPositionSet
    );
  };

  getPositionFromOriginalPositionAndMovedDelta = (originalPosition, delta) => {
    const { top, bottom, right, left } = originalPosition || {};
    const { x, y } = delta || {};
    return {
      top: top + y,
      bottom: bottom + y,
      left: left + x,
      right: right + x,
    };
  };

  setOriginalPositionOfMovableItem = (state, movableItemId, position) => {
    return set(
      state,
      `movableParts[${movableItemId}].originalPosition`,
      position,
    );
  };

  setOriginalPositionOfFixedItem = (state, fixedItemId, position) => {
    return set(state, `fixedParts[${fixedItemId}].originalPosition`, position);
  };

  getPositionOfFixedItem = (state, fixedItemId) => {
    return get(state, `fixedParts[${fixedItemId}].originalPosition`, {});
  };

  getPositionOfMovableItem = (state, movableItemId) => {
    return this.getPositionFromOriginalPositionAndMovedDelta(
      this.getOriginalPositionOfMovableItem(state, movableItemId),
      this.getDeltaOfMovableItem(state, movableItemId),
    );
  };

  getOriginalPositionOfMovableItem = (state, movableItemId) => {
    return get(state, `movableParts[${movableItemId}].originalPosition`, {});
  };

  getDeltaOfMovableItem = (state, movableItemId) => {
    return get(state, `movableParts[${movableItemId}].delta`, { x: 0, y: 0 });
  };

  setDeltaOfMovableItem = (state, movableItemId, newDelta) => {
    return set(state, `movableParts[${movableItemId}].delta`, {
      x: get(newDelta, 'x') || 0,
      y: get(newDelta, 'y') || 0,
    });
  };

  getNewStateAfterAnItemMove = (state, movableItemId, moveDelta) => {
    let newDelta = this.getDeltaOfMovableItem(state, movableItemId);
    newDelta = set(newDelta, 'x', newDelta.x + moveDelta.x);
    newDelta = set(newDelta, 'y', newDelta.y + moveDelta.y);
    return this.setDeltaOfMovableItem(state, movableItemId, newDelta);
  };

  /**
   * @param positionOfItemFirstItem
   * @param positionOfItemSecondItem
   * @param offset
   *  the length we will add to the bounding box around each items
   *  so that 2 items can be consider overlap even if there is space between then
   * @returns {number}
   */
  getOverlapAreaOf2Items = (
    positionOfItemFirstItem,
    positionOfItemSecondItem,
    offset = DEFAULT_OFFSET_FOR_ELEMENT_TO_CONSIDER_TOUCHED,
  ) => {
    let {
      top: firstTop,
      bottom: firstBottom,
      right: firstRight,
      left: firstLeft,
    } = positionOfItemFirstItem || {};

    let {
      top: secondTop,
      bottom: secondBottom,
      right: secondRight,
      left: secondLeft,
    } = positionOfItemSecondItem || {};

    firstTop -= offset;
    secondTop -= offset;

    firstBottom += offset;
    secondBottom += offset;

    firstRight += offset;
    secondRight += offset;

    firstLeft -= offset;
    secondLeft -= offset;

    if (
      !(
        firstRight < secondLeft ||
        firstLeft > secondRight ||
        firstBottom < secondTop ||
        firstTop > secondBottom
      )
    ) {
      const interLeft = Math.max(firstLeft, secondLeft);
      const interRight = Math.min(firstRight, secondRight);
      const interBottom = Math.min(firstBottom, secondBottom);
      const interTop = Math.max(firstTop, secondTop);

      return (interRight - interLeft) * (interBottom - interTop);
    }

    return 0;
  };

  getOverlapAreaOfAFixedItemAndAMovableItem = (
    state,
    fixedItemId,
    movableItemId,
    offset,
  ) => {
    if (!state.fixedParts[fixedItemId]) {
      return 0;
    }

    if (!state.movableParts[movableItemId]) {
      return 0;
    }

    return this.getOverlapAreaOf2Items(
      this.getPositionOfMovableItem(state, movableItemId),
      this.getPositionOfFixedItem(state, fixedItemId),
      offset,
    );
  };

  getEmptyPositionForMovableItem = (state) => {
    let result = {
      top: 0,
      right: 0,
    };

    const movableItemIds = state.movableParts
      ? Object.keys(state.movableParts)
      : [];

    const fixedItemIds = state.fixedParts ? Object.keys(state.fixedParts) : [];

    let minOverlapArea = Infinity;

    movableItemIds.forEach((movableItemId) => {
      const originalPositionOfMovableItem = this.getOriginalPositionOfMovableItem(
        state,
        movableItemId,
      );
      let maxOverlapAreaOfMovableItemAndAnyOtherItem = 0;

      let possibleOverlapPositions = [];
      movableItemIds.forEach((id) => {
        possibleOverlapPositions = [
          ...possibleOverlapPositions,
          this.getPositionOfMovableItem(state, id),
        ];
      });

      fixedItemIds.forEach((id) => {
        possibleOverlapPositions = [
          ...possibleOverlapPositions,
          this.getPositionOfFixedItem(state, id),
        ];
      });

      possibleOverlapPositions.forEach((position) => {
        const overlapArea = this.getOverlapAreaOf2Items(
          originalPositionOfMovableItem,
          position,
          0,
        );

        if (overlapArea > maxOverlapAreaOfMovableItemAndAnyOtherItem) {
          maxOverlapAreaOfMovableItemAndAnyOtherItem = overlapArea;
        }
      });

      if (maxOverlapAreaOfMovableItemAndAnyOtherItem < minOverlapArea) {
        minOverlapArea = maxOverlapAreaOfMovableItemAndAnyOtherItem;
        result = originalPositionOfMovableItem;
      }
    });

    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (!this.isAllOriginalPositionsSet(prevProps, prevState) &&
        this.isAllOriginalPositionsSet(this.props, this.state)) ||
      (this.props.userAnswers &&
        this.props.userAnswers !== prevProps.userAnswers)
    ) {
      this.setState((state, props) => {
        let newState = state;

        props.userAnswers.forEach((elem, index, array) => {
          const movableItemId = elem && elem[0];

          if (!movableItemId) {
            return;
          }

          const fixedItemId = props.question.l_pair[index].id;

          const { top: mTop, left: mLeft } = this.getPositionOfMovableItem(
            newState,
            movableItemId,
          );

          const { top: fTop, right: fRight } = this.getPositionOfFixedItem(
            newState,
            fixedItemId,
          );

          newState = this.getNewStateAfterAnItemMove(newState, movableItemId, {
            x: fRight - mLeft,
            y: fTop - mTop,
          });

          /***********************************/
          const movableItemIdOfPrevAnswer =
            prevProps.userAnswers &&
            prevProps.userAnswers[index] &&
            prevProps.userAnswers[index][0];

          if (
            movableItemIdOfPrevAnswer &&
            movableItemIdOfPrevAnswer !== movableItemId
          ) {
            const {
              top: pmTop,
              right: pmRight,
            } = this.getPositionOfMovableItem(
              newState,
              movableItemIdOfPrevAnswer,
            );

            const { right, top } = this.getEmptyPositionForMovableItem(
              newState,
            );

            newState = this.getNewStateAfterAnItemMove(
              newState,
              movableItemIdOfPrevAnswer,
              {
                y: top - pmTop,
                x: right - pmRight,
              },
            );
          }
        });

        return newState;
      });
    }
  }

  getFixedItemIdWithLargestOverlapAreaWithDraggingItem = (state, offset) => {
    const { fixedParts, draggingItem, dragging } = state;
    if (!dragging) {
      return {};
    }

    let max = 0;
    let resultId = null;

    Object.keys(fixedParts).forEach((fixedItemId) => {
      let area = this.getOverlapAreaOfAFixedItemAndAMovableItem(
        state,
        fixedItemId,
        draggingItem,
        offset,
      );
      if (area > max) {
        max = area;
        resultId = fixedItemId;
      }
    });

    return {
      area: max,
      id: resultId,
    };
  };

  render() {
    const {
      userAnswers,
      question,
      shouldShowKey,
      setUserAnswers,
      disabled,
      getHighlightsClass,
      className,
    } = this.props;
    const { l_pair, r_pair, answers, answer_as_hint } = question;

    const componentClassName = `${className || ''} ${this.cssClass}`;
    return (
      <div>
        <div className={componentClassName}>
          <div className={`${this.cssClass}__fixed`}>
            {l_pair &&
              l_pair.map((item, index) => (
                <Measure
                  key={`fixed-${item.id}`}
                  bounds
                  onResize={(contentRect) => {
                    this.setState((state) =>
                      this.setOriginalPositionOfFixedItem(
                        state,
                        item.id,
                        contentRect.bounds,
                      ),
                    );
                  }}
                >
                  {({ measureRef }) => (
                    <FixedItem
                      className={`${this.cssClass}__item`}
                      isDraggedTo={(() => {
                        if (
                          this.getFixedItemIdWithLargestOverlapAreaWithDraggingItem(
                            this.state,
                          ).id === item.id
                        ) {
                          return true;
                        }

                        return false;
                      })()}
                      withRef={measureRef}
                      item={item}
                    />
                  )}
                </Measure>
              ))}
          </div>
          <div className={`${this.cssClass}__moved`}>
            {r_pair &&
              r_pair.map((item, index) => (
                <Measure
                  key={`moved-${item.id}`}
                  bounds
                  onResize={(contentRect) => {
                    this.setState((state) =>
                      this.setOriginalPositionOfMovableItem(
                        state,
                        item.id,
                        contentRect.bounds,
                      ),
                    );
                  }}
                >
                  {({ measureRef }) => (
                    <MovableItem
                      isBeingDragged={
                        this.state.dragging &&
                        this.state.draggingItem === item.id
                      }
                      shouldShowKey={shouldShowKey}
                      matched={
                        answers &&
                        userAnswers &&
                        userAnswers.findIndex(
                          (elem) => elem && elem[0] === item.id,
                        ) ===
                          answers.findIndex(
                            (elem) => elem && elem[0] === item.id,
                          )
                      }
                      disabled={shouldShowKey}
                      position={this.getDeltaOfMovableItem(this.state, item.id)}
                      className={`${this.cssClass}__item`}
                      onDrag={(e, ui) => {
                        this.setState((state) =>
                          this.getNewStateAfterAnItemMove(state, item.id, {
                            x: ui.deltaX,
                            y: ui.deltaY,
                          }),
                        );
                      }}
                      onStart={() => {
                        this.setState((state) => ({
                          ...state,
                          dragging: true,
                          draggingItem: item.id,
                        }));
                      }}
                      onStop={() => {
                        const {
                          id,
                        } = this.getFixedItemIdWithLargestOverlapAreaWithDraggingItem(
                          this.state,
                        );

                        let newUserAnswers = userAnswers;
                        newUserAnswers =
                          newUserAnswers &&
                          newUserAnswers.map((elem) =>
                            elem && elem[0] === item.id ? [''] : elem,
                          );

                        if (id) {
                          const index = question.l_pair.findIndex(
                            (elem) => elem.id === id,
                          );

                          newUserAnswers = Object.assign([], newUserAnswers, {
                            [index]: [item.id],
                          });

                          for (
                            let idx = 0;
                            idx < newUserAnswers.length;
                            idx += 1
                          ) {
                            newUserAnswers = Object.assign([], newUserAnswers, {
                              [idx]: newUserAnswers[idx] || [''],
                            });
                          }
                        }

                        this.setState(
                          (state) => ({
                            ...state,
                            dragging: false,
                          }),
                          () => {
                            setUserAnswers(newUserAnswers);
                          },
                        );
                      }}
                      withRef={measureRef}
                      item={item}
                    />
                  )}
                </Measure>
              ))}
          </div>
        </div>
        {shouldShowKey && (
          <div>
            <h5>Answer</h5>
            <table className={`${this.cssClass}__key-table`}>
              <tbody>
                {answer_as_hint &&
                  Array(
                    Math.min(
                      (answer_as_hint.l_pair && answer_as_hint.l_pair.length) ||
                        0,
                      (answer_as_hint.r_pair && answer_as_hint.r_pair.length) ||
                        0,
                    ),
                  )
                    .fill(0)
                    .map((row, index) => {
                      const displayTableCell = (item, oriented = 'LEFT') => {
                        if (!item) {
                          return null;
                        }

                        let content = [
                          <div
                            className={`${
                              this.cssClass
                            }__key-tb-cell-content-avatar`}
                          >
                            <img src={item.avatar} />
                          </div>,
                          <div
                            className={`${
                              this.cssClass
                            }__key-tb-cell-content-main`}
                          >
                            {item.content}
                          </div>,
                        ];
                        if (oriented === 'RIGHT') {
                          content = content.reverse();
                        }

                        return (
                          <div
                            className={`${this.cssClass}__key-tb-cell-content`}
                          >
                            {content}
                          </div>
                        );
                      };

                      return (
                        <tr>
                          <td>
                            {answer_as_hint.l_pair &&
                              displayTableCell(
                                answer_as_hint.l_pair[index],
                                'LEFT',
                              )}
                          </td>
                          <td>
                            {answer_as_hint.r_pair &&
                              displayTableCell(
                                answer_as_hint.r_pair[index],
                                'RIGHT',
                              )}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
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
