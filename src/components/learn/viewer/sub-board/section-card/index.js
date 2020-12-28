import React from 'react';
import Card from 'antd/lib/card';
import './stylesheet.scss';

const cssClass = 'learn-sub-board-section-card';

const LearnSubBoardSectionCard = ({ title, className, children }) => {
  return (
    <Card title={title} className={`${cssClass} ${className || ''}`}>
      {children}
    </Card>
  );
};

export default LearnSubBoardSectionCard;
