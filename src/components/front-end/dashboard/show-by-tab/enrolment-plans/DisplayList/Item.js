import React, { useMemo } from 'react';
import Col from 'antd/lib/grid/col';
import Card from 'antd/lib/card';
import { t1 } from 'translate';
import Row from 'antd/lib/grid/row';
import DefaultEnrolmentPlanAvatar from 'common/images/default-enrolment-plan-avatar.jpeg';
import './style.scss';
import Icon from 'antd/lib/icon';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import { showChildrenInEP } from 'actions/learn';
import DefaultLearningMaterialAvatar from 'common/images/default-learning-material-avatar.png';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import { isSmallScreen } from 'common';
import Progress from 'antd/lib/progress';
import * as PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import styled from 'styled-components';
import Tooltip from 'antd/lib/tooltip';

const LockIcon = styled(Icon)`
  color: rgb(247, 148, 29) !important;
`;

const showUserLearningNumber = false;

const getTotalChildren = (item) => {
  let childrenLength = 0;
  if (!!item.children && item.children.length)
    childrenLength = item.children.filter((children) => !!children.courses)
      .length;

  return childrenLength + (item.courses ? item.courses.length : 0);
};

export function ChildrenItem(props) {
  let { item, rootPathIid, showFullWidth, userLearning } = props;

  const cssClass = 'enrolment-plan-item';
  const percent = item.cp || 0;

  if (!item) return <span />;
  if (item.user_learning) {
    userLearning = item.user_learning;
  }

  if (!userLearning)
    userLearning = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

  const colProps = showFullWidth
    ? {
        span: 24,
        offset: 0,
      }
    : {
        span: 22,
        offset: 2,
      };

  const CourseLock = !item.allowedPermission ? <LockIcon type="lock" /> : null;

  return (
    <Row
      className="m-t-10 enrolment-plan-item-children"
      type="flex"
      justify="center"
    >
      <Col {...colProps}>
        <Link
          to={Links.overviewCourseByPath(rootPathIid, item)}
          style={{ display: 'contents' }}
        >
          <Card size="small" className="border-round">
            <div className={cssClass}>
              <Row type="flex" justify="space-between" gutter={24}>
                <Col
                  span={4}
                  className="d-flex align-items-center"
                  xs={10}
                  sm={10}
                  md={3}
                >
                  <div
                    className={`${cssClass}-image`}
                    style={{
                      backgroundImage: `url(${item.avatar ||
                        DefaultLearningMaterialAvatar})`,
                    }}
                  />
                </Col>
                {isSmallScreen ? (
                  <Col xs={14} md={14} span={14} className="p-l-0">
                    <div className={`${cssClass}-info`}>
                      <h3 style={{ fontSize: 15 }}>
                        {CourseLock} {item.name}
                      </h3>
                      {item.description ? (
                        <strong>{item.description}</strong>
                      ) : null}
                    </div>
                    <div
                      className={`d-flex ${cssClass}-extra ${cssClass}-extra__children align-items-center`}
                    >
                      {isSmallScreen ? (
                        <>
                          <div className={`${cssClass}-extra-progress-mobile`}>
                            <div
                              className={`${cssClass}-extra-progress-mobile-content`}
                            >
                              <span
                                className={`${cssClass}-extra-progress-mobile-number`}
                              >
                                {percent}%
                              </span>
                              {showUserLearningNumber && (
                                <div
                                  className={`${cssClass}-extra__user-learning`}
                                >
                                  <Icon type="user" className="m-r-5" />{' '}
                                  {t1(
                                    isSmallScreen ? '%s' : '%s_user_learning',
                                    [userLearning || 0],
                                  )}
                                </div>
                              )}
                            </div>
                            <Progress
                              percent={percent}
                              size="small"
                              strokeColor="#f7941d"
                              showInfo={false}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={`${cssClass}-extra__progress progress-bar-${percent} w-80`}
                          >
                            <span className={percent >= 20 ? 'text-white' : ''}>
                              {percent}%
                            </span>
                          </div>

                          <Tooltip title={t1('learn_now')}>
                            <Link
                              to={Links.overviewCourseByPath(rootPathIid, item)}
                            >
                              <Icon
                                type="login"
                                className={`${cssClass}-extra__button`}
                              />
                            </Link>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </Col>
                ) : (
                  <>
                    <Col xs={16} sm={16} md={15}>
                      <div className={`${cssClass}-info`}>
                        <Link
                          to={Links.overviewCourseByPath(rootPathIid, item)}
                        >
                          <h3 className="m-b-5">
                            {CourseLock} {item.name}
                          </h3>
                        </Link>
                        {item.description ? (
                          <strong>{item.description}</strong>
                        ) : null}
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={6}
                      className={`${cssClass}-extra-col`}
                    >
                      <div
                        className={`d-flex ${cssClass}-extra ${cssClass}-extra__children align-items-center`}
                      >
                        {isSmallScreen ? (
                          <>
                            <div
                              className={`${cssClass}-extra-progress-mobile`}
                            >
                              <div
                                className={`${cssClass}-extra-progress-mobile-content`}
                              >
                                <span
                                  className={`${cssClass}-extra-progress-mobile-number`}
                                >
                                  {percent}%
                                </span>
                                {showUserLearningNumber && (
                                  <div
                                    className={`${cssClass}-extra__user-learning`}
                                  >
                                    <Icon type="user" className="m-r-5" />
                                    {t1(
                                      isSmallScreen ? '%s' : '%s_user_learning',
                                      [userLearning || 0],
                                    )}
                                  </div>
                                )}
                              </div>
                              <Progress
                                percent={percent}
                                size="small"
                                strokeColor="#f7941d"
                                showInfo={false}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={`d-flex ${cssClass}-extra__progress-info`}
                            >
                              <div
                                className={`${cssClass}-extra__progress progress-bar-${percent} w-80`}
                              >
                                <span
                                  className={percent >= 20 ? 'text-white' : ''}
                                >
                                  {percent}%
                                </span>
                              </div>

                              {showUserLearningNumber && (
                                <div
                                  className={`${cssClass}-extra__user-learning`}
                                >
                                  <Icon type="user" className="m-r-5" />
                                  {t1(
                                    isSmallScreen ? '%s' : '%s_user_learning',
                                    [userLearning || 0],
                                  )}
                                </div>
                              )}
                            </div>

                            <Tooltip title={t1('learn_now')}>
                              <Link
                                to={Links.overviewCourseByPath(
                                  rootPathIid,
                                  item,
                                )}
                              >
                                <Icon
                                  type="login"
                                  className={`${cssClass}-extra__button`}
                                />
                              </Link>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </Card>
        </Link>
      </Col>
    </Row>
  );
}

const Item = (props) => {
  const { item, dispatch, itemIid, rootPathIid } = props;

  let userLearning;

  React.useEffect(
    () => {
      if (itemIid) {
        Scroll.scroller.scrollTo(itemIid, {
          smooth: true,
          duration: 800,
        });
      }
    },
    [itemIid],
  );

  userLearning = useMemo(
    () =>
      item.user_learning ||
      Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000,
    [item],
  );

  const cssClass = 'enrolment-plan-item';

  let totalProgress = 0;
  let totalItem = 0;

  if (!item) return <span />;
  if (item.children && item.children.length)
    item.children.map((child) => {
      if (child.courses) {
        child.courses.length &&
          child.courses.map((c) => {
            totalProgress = totalProgress + (c.cp ? c.cp : 0);
            if (c.cp && c.cp === 100) {
              totalItem++;
            }
          });
      }
    });
  else if (item.courses && item.courses.length)
    item.courses.map((child) => {
      totalProgress = totalProgress + (child.cp ? child.cp : 0);
      if (child.cp && child.cp === 100) {
        totalItem++;
      }
    });

  if (item.children && item.children.length) {
    totalProgress = Math.round(totalProgress / item.children.length);
  } else {
    totalProgress = 0;
  }

  const onExpandButtonClick = () => {
    if (itemIid === item.iid) {
      dispatch(showChildrenInEP(null));
    } else {
      dispatch(showChildrenInEP(item.iid));
    }
  };

  const extraContent = (
    <div>
      <div className={`${cssClass}-extra-progress-mobile`}>
        <div className={`${cssClass}-extra-progress-mobile-content`}>
          <span className={`${cssClass}-extra-progress-mobile-number`}>
            {totalProgress}%
          </span>
          {showUserLearningNumber && (
            <div className={`${cssClass}-extra__user-learning`}>
              <Icon type="user" className="m-r-5" /> {userLearning || 0}
            </div>
          )}
        </div>
        <Progress
          percent={totalProgress}
          size="small"
          strokeColor="#f7941d"
          format={() => {
            return (
              <span className={`${cssClass}-extra-progress-mobile-number`}>
                {totalItem}/{getTotalChildren(item)}
              </span>
            );
          }}
        />
      </div>
    </div>
  );

  return (
    <Row
      className="m-t-15 enrolment-plan-item-row"
      name={item.iid}
      onClick={onExpandButtonClick}
    >
      <Card
        size="small"
        className={`border-round ${
          itemIid && itemIid === item.iid
            ? 'sticky-card enrolment-plan-item-fixed'
            : ''
        }`}
      >
        <div className={cssClass}>
          <Row
            type="flex"
            justify="space-between"
            className={`${cssClass}-row`}
          >
            <Col
              xs={8}
              sm={8}
              md={4}
              className={`d-flex align-items-center ${cssClass}-row--image`}
            >
              <div
                className={`${cssClass}-image`}
                style={{
                  backgroundImage: `url(${item.avatar ||
                    DefaultEnrolmentPlanAvatar})`,
                }}
              />
            </Col>
            <Col
              span={16}
              xs={16}
              sm={16}
              md={20}
              className="enrolment-plan-item-col"
            >
              <Col
                span={20}
                xs={24}
                sm={24}
                md={20}
                className="enrolment-plan-item-row-info"
              >
                <div className="text-center p-10 enrolment-plan-item-row-info-item">
                  <h3>{item.name}</h3>
                  {item.description ? (
                    <strong>{item.description}</strong>
                  ) : null}
                  {item.children && item.children.length && !isSmallScreen ? (
                    <div className="button">
                      <button
                        className={`${cssClass}-button m-t-10 ${
                          itemIid === item.iid ? 'active' : ''
                        }`}
                        onClick={onExpandButtonClick}
                      >
                        {t1(itemIid === item.iid ? 'collapse' : 'view_more')}
                      </button>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col
                span={4}
                xs={24}
                sm={24}
                md={4}
                className="enrolment-plan-item-row-extra h-100"
              >
                {isSmallScreen ? (
                  extraContent
                ) : (
                  <div
                    className={`d-flex ${cssClass}-extra p-t-10 p-b-10 ${
                      !userLearning ? 'align-items-center' : ''
                    } enrolment-plan-item-row-extra-item`}
                  >
                    <div
                      className={`${cssClass}-extra__progress progress-bar-${totalProgress}  ${
                        !userLearning ? 'w-100' : ''
                      }`}
                    >
                      <span className={totalProgress >= 20 ? 'text-white' : ''}>
                        {totalProgress}%
                      </span>{' '}
                      <span className={totalProgress >= 99 ? 'text-white' : ''}>
                        {totalItem}/{getTotalChildren(item)}
                      </span>
                    </div>
                    {showUserLearningNumber && (
                      <div className={`${cssClass}-extra__user-learning`}>
                        <Icon type="user" className="m-r-5" />{' '}
                        {t1(isSmallScreen ? '%s' : '%s_user_learning', [
                          userLearning || 0,
                        ])}
                      </div>
                    )}
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        </div>
      </Card>
      {itemIid && itemIid === item.iid
        ? item.children && item.children.length
          ? item.children.map((child) => {
              return (
                child.courses &&
                child.courses.length &&
                child.courses.map((c) => {
                  let userLearningByItemaverage =
                    userLearning / item.children.length;

                  const min = Math.ceil(
                    userLearningByItemaverage - userLearningByItemaverage / 3,
                  );
                  const max = Math.ceil(
                    userLearningByItemaverage + userLearningByItemaverage / 3,
                  );

                  let userLearningByItem =
                    c.user_learning ||
                    Math.floor(Math.random() * (max - min + 1)) + min;

                  if (
                    userLearningByItem > userLearning ||
                    item.children.length === 1
                  )
                    userLearningByItem = userLearning;

                  return (
                    <ChildrenItem
                      item={c}
                      rootPathIid={rootPathIid}
                      userLearning={userLearningByItem}
                    />
                  );
                })
              );
            })
          : null
        : null}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    itemIid: lGet(state, 'learn.EPItemIid'),
    rootPathIid: lGet(state, 'learn.rootPathIid'),
  };
};

export default connect(mapStateToProps)(Item);

ChildrenItem.propTypes = {
  item: PropTypes.object,
  rootPathIid: PropTypes.any,
  showFullWidth: PropTypes.bool,
  userLearning: PropTypes.number,
};

ChildrenItem.defaultProps = { showFullWidth: false };

Item.propTypes = {
  dispatch: PropTypes.any,
  item: PropTypes.any,
  itemIid: PropTypes.any,
  rootPathIid: PropTypes.any,
};
