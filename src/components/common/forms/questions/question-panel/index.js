import React from 'react';
import { portals } from 'components/common/portal';

import './stylesheet.scss';
import { secondsToTimeString } from 'common/utils/Date';

const cssClass = 'question-panel';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 21/04/2017
 **/
const QuestionHeader = ({
  title,
  onBookMarkAreaClick,
  isTicked,
  shouldShowTitle,
  shouldShowNumber,
  shouldShowHeader,
  number,
  questionId,
  questionTimeLeftInSeconds,
  children,
  className,
}) => {
  const isTickable = typeof onBookMarkAreaClick === 'function';
  const questionTimeLeft = questionTimeLeftInSeconds
    ? secondsToTimeString(questionTimeLeftInSeconds)
    : null;

  return (
    <div className={`${cssClass} ${className || ''}`}>
      {(shouldShowHeader ||
        (shouldShowTitle && title) ||
        (shouldShowNumber && number) ||
        isTickable) && (
        <div
          className={`${cssClass}__header\
                ${isTicked ? `${cssClass}__header--ticked` : ''}\
                ${isTickable ? `${cssClass}__header--tickable` : ''}`}
          onClick={onBookMarkAreaClick}
        >
          <div
            className={`${cssClass}__header-text`}
            id={portals.questionHeader(questionId)}
          >
            {`${shouldShowNumber && number ? `${number}. ` : ''}${
              shouldShowTitle ? title : ''
            }`}
          </div>
          {questionTimeLeft && (
            <div className={`${cssClass}__header-time`}>{questionTimeLeft}</div>
          )}
          {isTickable && (
            <div className={`${cssClass}__header-tick`}>
              <div
                className={`${cssClass}__tick-icon\
                         ${isTicked ? `${cssClass}__tick-icon--ticked` : ''}`}
              />
            </div>
          )}
          <div
            className={`${cssClass}__header-tick`}
            id={portals.questionAction(questionId)}
          />
        </div>
      )}
      <div className={`${cssClass}__content`}>{children}</div>
    </div>
  );
};

export default QuestionHeader;
