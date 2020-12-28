import React from 'react';
import MuiPaper from 'material-ui/Paper';
import './style.scss';

const Paper = ({ children, style, className }) => {
  return (
    <MuiPaper
      className={`p-l-20 p-r-20 p-t-10 p-b-20 mui-paper-container ${className}`}
      style={style}
    >
      {children}
    </MuiPaper>
  );
};

export default Paper;
