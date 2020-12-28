import React from 'react';
import { Link } from 'react-router-dom';
import DisplayHtml from 'components/common/html';
import Img from 'components/common/img';
import { displayAvatar } from 'utils/Util';
import DefaultLearningMaterialAvatar from 'common/images/default-learning-material-avatar.png';
import Icon from 'components/common/Icon';
// import Truncate from 'react-truncate';
import lodashGet from 'lodash.get';
import { breadCrumb } from 'common/utils/string';
import { t1 } from 'translate';
import CourseProgress from '../../course/progress';

const CourseItem = ({
  rejected,
  overviewLink,
  avatar,
  title,
  isPublic,
  subTitle,
  subTitleLinkUrl,
  showDescription,
  description,
  progress,
  showProgress,
  showDeadline,
  showAction,
  deadline,
  action,
  disableLink,
  tagsInfo,
  fallbackAvatar,
  mindmapLink,
  item,
}) => {
  const target = mindmapLink ? '_blank' : '';
  return (
    <div className="ggg-courses-wrapper">
      <div className="course">
        <div className={`course-box ${rejected ? 'rejected' : ''}`}>
          <div className="box-image">
            <Link
              to={overviewLink}
              className={disableLink ? 'admin-disable-link' : ''}
              target={target}
            >
              <Img
                src={displayAvatar(avatar)}
                alt={avatar}
                altSrc={fallbackAvatar || DefaultLearningMaterialAvatar}
              />
            </Link>
          </div>
          <div className="box-description">
            <div className="box-title">
              <Link
                to={overviewLink}
                className={disableLink ? 'admin-disable-link' : ''}
                target={target}
              >
                <h3 title={title}>
                  {mindmapLink ? (
                    <Icon
                      icon="deployment-unit"
                      antIcon
                      style={{ color: '#3A77A6', marginRight: 5 }}
                      title={t1('this_is_mindmap')}
                    />
                  ) : null}
                  {isPublic && (
                    <Icon className="box-title-public-icon" icon="world" />
                  )}
                  {breadCrumb(title, 220)}
                </h3>
              </Link>
              {subTitle && (
                <div className="text-muted box-subtitle">
                  (
                  {subTitleLinkUrl ? (
                    <Link
                      className="box-subtitle__main"
                      title={subTitle}
                      to={subTitleLinkUrl}
                      target={target}
                    >
                      {subTitle}
                    </Link>
                  ) : (
                    <span className="box-subtitle__main" title={subTitle}>
                      {subTitle}
                    </span>
                  )}
                  )
                </div>
              )}
            </div>
            {showDescription && (
              <p>
                <DisplayHtml content={description} />
              </p>
            )}
            {showProgress && (
              <div className="m-b-5 m-t-5">
                <CourseProgress progress={progress} />
              </div>
            )}
            {/*
              (
              <div className={`progress-wrapper`}>
                <ProgressLabelAndExplanation/>
                <div
                  className="progress-title"
                  style={{ width: `${progress}%` }}
                >{`${progress}%`}</div>
                <LinearProgress
                  className="progress"
                  // color="#ffa14d"
                  mode="determinate"
                  value={progress}
                />
              </div>
            )
               */}
            {showDeadline && <div className="deadline-wrapper">{deadline}</div>}
          </div>
          <div style={{ display: 'flex' }}>
            {tagsInfo &&
              tagsInfo.map((tc) => (
                <div
                  key={lodashGet(tc, 'value')}
                  style={{
                    flexGrow: 1,
                    height: 5,
                    backgroundColor: lodashGet(tc, 'color'),
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
