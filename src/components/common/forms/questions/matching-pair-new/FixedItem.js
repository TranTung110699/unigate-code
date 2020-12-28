import React from 'react';
import PropTypes from 'prop-types';
import LeftHalf from './res/left-half.png';
import LeftHalfHL from './res/left-half-hl.png';

class FixedItem extends React.PureComponent {
  cssClass = 'matching-pair-question-fixed-item';

  render() {
    const { className, item, withRef, isDraggedTo } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div ref={withRef} className={componentClassName}>
        <div className={`${this.cssClass}__main`}>
          <div
            className={`${this.cssClass}__content`}
            style={
              isDraggedTo
                ? {
                    background: '#f3f3f3',
                  }
                : null
            }
          >
            {item.avatar && (
              <div className={`${this.cssClass}__avatar`}>
                <img src={item.avatar} />
              </div>
            )}
            <div className={`${this.cssClass}__content-text`}>
              {item.content}
            </div>
          </div>
        </div>
        <div className={`${this.cssClass}__curved-edge`}>
          <img src={isDraggedTo ? LeftHalfHL : LeftHalf} />
        </div>
      </div>
    );
  }
}

FixedItem.propTypes = {
  className: PropTypes.string,
};

FixedItem.defaultProps = {
  className: '',
};

export default FixedItem;
