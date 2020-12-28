import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import RightHalf from './res/right-half.png';
import RightHalfMatched from './res/right-half-matched.png';
import RightHalfNotMatched from './res/right-half-not-matched.png';

const matchedColor = '#92c36a';
const notMatchedColor = '#f05252 ';

class MovableItem extends React.PureComponent {
  cssClass = 'matching-pair-question-movable-item';

  render() {
    const {
      className,
      item,
      withRef,
      matched,
      shouldShowKey,
      isBeingDragged,
      ...rest
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass} ${
      isBeingDragged ? `${this.cssClass}--dragging` : ''
    }`;

    return (
      <Draggable {...rest}>
        <div ref={withRef} className={componentClassName}>
          <div className={`${this.cssClass}__curved-edge`}>
            <img
              src={(() => {
                if (!shouldShowKey) {
                  return RightHalf;
                }
                return matched ? RightHalfMatched : RightHalfNotMatched;
              })()}
            />
          </div>
          <div className={`${this.cssClass}__main`}>
            <div
              className={`${this.cssClass}__content`}
              style={(() => {
                if (!shouldShowKey) {
                  return null;
                }
                return { background: matched ? matchedColor : notMatchedColor };
              })()}
            >
              <div className={`${this.cssClass}__content-text`}>
                {item.content}
              </div>
              {item.avatar && (
                <div className={`${this.cssClass}__avatar`}>
                  <img src={item.avatar} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

MovableItem.propTypes = {
  className: PropTypes.string,
};

MovableItem.defaultProps = {
  className: '',
};

export default MovableItem;
