import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import './stylesheet.scss';
import lodashGet from 'lodash.get';

const Line = ({ children, invisible }) => {
  const cssClass = 'media-audio-tracking-bar-line';

  return (
    <div
      className={`${cssClass}\ ${invisible ? `${cssClass}--invisible` : ''}`}
    >
      {children}
    </div>
  );
};

class AudioTrackingBar extends React.Component {
  cssClass = 'media-audio-tracking-bar';

  getPositionFromEvent = (event) => {
    const { duration } = this.props;
    const trackingBarNode = findDOMNode(this);
    if (trackingBarNode) {
      const { left, width } = trackingBarNode.getBoundingClientRect();
      return ((event.clientX - left) / width) * duration;
    }
    return 0;
  };

  handleTrackingBarOnClick = (event) => {
    const { onPositionChange } = this.props;
    const newPosition = this.getPositionFromEvent(event);
    if (typeof onPositionChange === 'function') {
      onPositionChange(newPosition);
    }
  };

  handleTrackingBarHeadMouseDown = (event) => {
    event.stopPropagation();
    window.addEventListener('mousemove', this.handleMouseMove, true);
    window.addEventListener('mouseup', this.handleMouseUp, false);
  };

  handleMouseMove = (event) => {
    const { onPositionChange } = this.props;
    if (typeof onPositionChange === 'function') {
      onPositionChange(this.getPositionFromEvent(event));
    }
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove, true);
  };

  render() {
    const {
      duration,
      currentTime,
      bufferedTime,
      className,
      disabled,
      renderUnderTrackingHead,
      marks,
    } = this.props;

    return (
      <div
        className={`${className || ''}\
           ${this.cssClass} \
           ${disabled ? `${this.cssClass}--disabled` : ''}`}
        onClick={this.handleTrackingBarOnClick}
      >
        <Line invisible>
          {(marks || []).map((m) => {
            const renderUnder = lodashGet(m, 'renderUnder');
            const id = lodashGet(m, 'id');

            return (
              <button
                key={id}
                className={`${this.cssClass}__mark`}
                style={{
                  left: `${(lodashGet(m, 'time') / duration) * 100}%`,
                }}
              >
                {typeof renderUnder === 'function' ? renderUnder() : null}
              </button>
            );
          })}
        </Line>
        <Line>
          <div
            className={`${this.cssClass}__played`}
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          >
            <button
              className={`${this.cssClass}__tracking-head\ ${
                disabled ? `${this.cssClass}__tracking-head--disabled` : ''
              }`}
              onMouseDown={this.handleTrackingBarHeadMouseDown}
            >
              {typeof renderUnderTrackingHead === 'function'
                ? renderUnderTrackingHead()
                : null}
            </button>
          </div>
          {bufferedTime > currentTime && (
            <div
              className={`${this.cssClass}__buffered`}
              style={{
                width: `${((bufferedTime - currentTime) / duration) * 100}%`,
              }}
            />
          )}
        </Line>
      </div>
    );
  }
}

AudioTrackingBar.propTypes = {
  bufferedTime: PropTypes.number,
  className: PropTypes.string,
  currentTime: PropTypes.number,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  onPositionChange: PropTypes.func,
  renderUnderTrackingHead: PropTypes.func,
  marks: PropTypes.arrayOf(PropTypes.shape()),
};

AudioTrackingBar.defaultProps = {
  bufferedTime: 0,
  className: '',
  currentTime: 0,
  disabled: false,
  duration: 0,
  onPositionChange: null,
  renderUnderTrackingHead: null,
  marks: null,
};

export default AudioTrackingBar;
