import React from 'react';
import PropTypes from 'prop-types';
import { secondsToTimeString } from 'common/utils/Date';
import TrackingBar from 'components/common/media-player/common/display/tracking-bar';
import Icon from 'components/common/Icon';
import './stylesheet.scss';

const cssClass = 'media-audio';

const Control = ({
  onPlayButtonClick,
  bufferedTime,
  className,
  currentTime,
  disabled,
  duration,
  isPlaying,
  onChangeTrackingPosition,
  style,
  renderUnderTrackingHead,
  marks,
}) => {
  const handlePlayButtonClick = React.useCallback(
    (event) => {
      if (typeof onPlayButtonClick === 'function') {
        onPlayButtonClick(event);
      }
      event.preventDefault();
      event.stopPropagation();
    },
    [onPlayButtonClick],
  );

  return (
    <div style={style} className={`${className || ''} ${cssClass}`}>
      <button
        className={`${cssClass}__play-button\
            ${disabled ? `${cssClass}__play-button--disabled` : ''}`}
        onClick={handlePlayButtonClick}
      >
        <Icon icon={isPlaying ? 'pause' : 'play'} />
      </button>
      <TrackingBar
        className={`${cssClass}__tracking-bar`}
        onPositionChange={
          typeof onChangeTrackingPosition === 'function'
            ? onChangeTrackingPosition
            : null
        }
        currentTime={currentTime}
        duration={duration}
        bufferedTime={bufferedTime}
        disabled={disabled}
        renderUnderTrackingHead={renderUnderTrackingHead}
        marks={marks}
      />
      <div className={`${cssClass}__tracking-text`}>
        {secondsToTimeString(currentTime)} / {secondsToTimeString(duration)}
      </div>
    </div>
  );
};

Control.propTypes = {
  bufferedTime: PropTypes.number,
  className: PropTypes.string,
  currentTime: PropTypes.number,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  isPlaying: PropTypes.bool,
  onChangeTrackingPosition: PropTypes.func,
  onPlayButtonClick: PropTypes.func,
};

Control.defaultProps = {
  bufferedTime: PropTypes.number,
  className: '',
  currentTime: PropTypes.number,
  disabled: false,
  duration: PropTypes.number,
  isPlaying: false,
  onChangeTrackingPosition: null,
  onPlayButtonClick: null,
};

export default Control;
