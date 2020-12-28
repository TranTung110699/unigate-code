import React from 'react';
import { Link } from 'react-router-dom';
import DisplayHtml from 'components/common/html';
import Img from 'components/common/img';
import { displayAvatar } from 'utils/Util';
import DefaultLearningMaterialAvatar from 'common/images/default-learning-material-avatar.png';
// import Truncate from 'react-truncate';
// import './style.scss';

const ETECCourseItem = ({
  overviewLink,
  title,
  duration,
  shortDescription,
  showDescription,
  avatar,
  disableLink,
  fallbackAvatar,
}) => {
  return (
    <Link
      to={overviewLink}
      className={`row horizontal-course-item-wrapper ${
        disableLink ? 'admin-disable-link' : ''
      }`}
    >
      <div className="information col-md-10 col-sm-9">
        <div className="titlte">
          <Link to={overviewLink}>
            <h3>{title}</h3>
          </Link>
        </div>
        <div className="statics">
          <div className="students-count">605</div>
          <div className="duration">{duration || '00:00'}</div>
        </div>
        {showDescription && (
          <div className="overview">
            <DisplayHtml content={shortDescription} />
          </div>
        )}
      </div>
      <div className="avatar col-md-2 col-sm-3">
        <Img
          src={displayAvatar(avatar)}
          alt={avatar}
          altSrc={fallbackAvatar || DefaultLearningMaterialAvatar}
        />
      </div>
    </Link>
  );
};

export default ETECCourseItem;
