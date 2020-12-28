import React from 'react';
import { cssClass } from './index';

export default ({ content, icon, title, className, key }) => (
  <div
    key={key}
    className={`col-md-6 ${cssClass}__item ${className} flex-item`}
  >
    <div className={`${cssClass}__item__wrapper`}>
      <div className={`${cssClass}__item__header`}>
        <img src={icon} alt={title} />
        <p className={`${cssClass}__item__title uppercase`}>{title}</p>
      </div>
      {content}
    </div>
  </div>
);
