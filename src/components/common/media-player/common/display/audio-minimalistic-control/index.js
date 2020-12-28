import React from 'react';
import './stylesheet.scss';

const cssClass = 'audio-minimalistic-control';

const AudioMinimalisticControl = ({
  onPlayButtonClick,
  className,
  disabled,
  isPlaying,
  style,
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
            ${disabled ? `${cssClass}__play-button--disabled` : ''}\
            ${isPlaying ? `${cssClass}__play-button--playing` : ''}`}
        onClick={handlePlayButtonClick}
      />
    </div>
  );
};

export default AudioMinimalisticControl;
