import React from 'react';
import Player from '../player';
import './stylesheet.scss';

const ResponsivePlayer = (props) => {
  const { className, responsive, withPlayer, ...rest } = props;
  if (responsive) {
    return (
      <div className="responsive-react-player-wrapper">
        <Player
          {...rest}
          className={`${className} responsive-react-player`}
          width={'100%'}
          height={'100%'}
          ref={withPlayer}
        />
      </div>
    );
  }
  return <Player {...rest} className={className} ref={withPlayer} />;
};

export default ResponsivePlayer;
