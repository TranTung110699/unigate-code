import React from 'react';
import { t1, t3 } from 'translate';
import lGet from 'lodash.get';
import { connect } from 'react-redux';
import Avatar from 'antd/lib/avatar';
import Card from 'antd/lib/card';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import './style.scss';
import { Link } from 'react-router-dom';
import { getDashboardUrl } from 'routes/links/common';
import fetchData from 'components/common/fetchData';
import { initials } from 'common/utils/string';
import Progress from 'antd/lib/progress';
import { isSmallScreen } from 'common';

class UserInfo extends React.Component {
  render() {
    const { userInfo, result } = this.props;
    const avatarSrc = userInfo.avatar ? { src: userInfo.avatar } : {};

    let number_of_courses, number_of_passed_courses, percent;
    if (result) {
      number_of_courses = result.number_of_courses;
      number_of_passed_courses = result.number_of_passed_courses;
      percent = Math.round(
        (number_of_passed_courses / (number_of_courses || 1)) * 100,
      );
    }

    return (
      <Card size="small">
        <h3 className="text-center">{t3('learning_result')}</h3>
        <Row type="flex" justify="space-between" gutter={24}>
          <Col xs={0} sm={0} md={4} className="ep-user-avatar">
            <Avatar {...avatarSrc} size={64}>
              {initials(userInfo.lname)}
            </Avatar>
          </Col>
          {result ? (
            <Col span={14} xs={16} sm={16} md={14}>
              <Row
                type="flex"
                justify="space-between"
                className={isSmallScreen ? '' : 'm-b-10'}
              >
                <Col span={12} className="text-left">
                  <span>{t1(isSmallScreen ? 'status' : 'progress')}</span>
                </Col>
                <Col span={12} className="text-right">
                  <span>
                    {isSmallScreen
                      ? `${number_of_passed_courses}/${number_of_courses}`
                      : t1('complete')}
                  </span>
                </Col>
              </Row>
              <Row>
                {isSmallScreen ? (
                  <Progress
                    percent={percent}
                    size="small"
                    strokeColor={percent === 100 ? '#6f0766' : '#f7941d'}
                  />
                ) : (
                  <div className={`ep-progress-bar progress-bar-${percent}`}>
                    <span className={percent >= 20 ? 'text-white' : ''}>
                      {percent}%
                    </span>{' '}
                    <span className={percent >= 99 ? 'text-white' : ''}>
                      {number_of_passed_courses}/{number_of_courses}
                    </span>
                  </div>
                )}
              </Row>
            </Col>
          ) : null}
          <Col xs={8} sm={8} md={6} className="view-more-button-wrapper">
            <Link to={getDashboardUrl('home')}>
              <button className={`ep-view-more-button`}>
                {t1('view_more')}
              </button>
            </Link>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userInfo: lGet(props, 'user') || lGet(state, 'user.info'),
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: '/user/api/get-user-courses-learning-status',
    params: { uiid: lGet(props, 'userInfo.iid') },
    propKey: 'result',
    fetchCondition: true,
  }))(UserInfo),
);
