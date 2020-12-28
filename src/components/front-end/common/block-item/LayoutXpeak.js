import React from 'react';
import { Link } from 'react-router-dom';
import DisplayHtml from 'components/common/html';
import Img from 'components/common/img';
import { displayAvatar } from 'utils/Util';
import DefaultLearningMaterialAvatar from 'common/images/default-learning-material-avatar.png';
// import Truncate from 'react-truncate';
import LinearProgress from 'material-ui/LinearProgress';

const CourseItemVersion2 = ({
  overviewLink,
  avatar,
  shortTitle,
  shortDescription,
  progress,
  title,
  disableLink,
  bgColor,
  displayIcon,
  fallbackAvatar,
}) => {
  return (
    <div className="ui-course-viewer">
      <Link
        className={`link-wrap-item ${disableLink ? 'admin-disable-link' : ''}`}
        to={overviewLink}
      >
        <div
          className="course-header"
          style={{ backgroundColor: `${bgColor || '#47B5FF'}` }}
        >
          {displayIcon && (
            <div>
              <Img
                src={displayAvatar(avatar)}
                alt={shortTitle}
                altSrc={fallbackAvatar || DefaultLearningMaterialAvatar}
              />
            </div>
          )}
          {!displayIcon && (
            <div>
              <div className="title">{shortTitle}</div>
              <div className="content">
                <DisplayHtml content={shortDescription} />
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="course-introduce">
        <Link
          className={disableLink ? 'admin-disable-link' : ''}
          to={overviewLink}
          style={{ color: `${bgColor}` }}
        >
          {title}
        </Link>
        {displayIcon && (
          <div className="content">
            <DisplayHtml content={shortDescription} />
          </div>
        )}
        <div
          className="progress-title"
          style={{ width: `${progress}%` }}
        >{`${progress}%`}</div>
        <LinearProgress
          className="progress"
          color="#ffa14d"
          mode="determinate"
          value={progress}
        />
      </div>
    </div>
  );
};

export default CourseItemVersion2;
