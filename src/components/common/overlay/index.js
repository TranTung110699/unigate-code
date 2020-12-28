import React from 'react';
import './stylesheet.scss';

const Overlay = ({ children, overlayContent }) => {
  const cssClass = 'common-overlay-component';

  return (
    <div className={`${cssClass}__wrapper`}>
      {children}
      {overlayContent && (
        <div className={`${cssClass}__overlay`}>{overlayContent}</div>
      )}
    </div>
  );
};

export default Overlay;
