import React from 'react';
import BlackLoadingIcon from './images/loading.gif';
import LoadingIcon from './images/loading.svg';
import CircularProgress from 'material-ui/CircularProgress';

const imgStyle = { top: '50%', transform: 'translateY(50%)' };
const style = { textAlign: 'center' };

const Loading = ({ blackLoadingIcon, circularLoadingIcon, className }) => {
  return (
    <div className={className} style={style}>
      {blackLoadingIcon === true ? (
        <img
          style={imgStyle}
          src={BlackLoadingIcon}
          alt="loading..."
          width={96}
        />
      ) : circularLoadingIcon ? (
        <CircularProgress />
      ) : (
        <img style={imgStyle} src={LoadingIcon} alt="loading..." width={45} />
      )}
    </div>
  );
};

export default Loading;
