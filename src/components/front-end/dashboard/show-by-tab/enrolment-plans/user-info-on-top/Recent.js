import React from 'react';
import { t1, t3 } from 'translate';
import lGet from 'lodash.get';
import { connect } from 'react-redux';
import Card from 'antd/lib/card';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import './style.scss';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import { SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE } from 'configs/constants';
import fetchData from 'components/common/fetchData';
import Links from 'routes/links';
import Progress from 'antd/lib/progress';
import { isSmallScreen } from '../../../../../../common';

class Recent extends React.Component {
  render() {
    const { lastCourse, rootPathIid } = this.props;
    const item = lastCourse && lastCourse[0];

    return (
      <Card size="small">
        <h3 className="text-center">{t3('recent_course')}</h3>
        {item ? (
          <Row type="flex" justify="space-between" gutter={24}>
            <Col xs={16} sm={16} md={18}>
              <Row className={isSmallScreen ? '' : 'm-b-10'}>
                <strong>{item.name}</strong>
              </Row>
              <Row>
                {isSmallScreen ? (
                  <Progress
                    percent={lGet(item, 'cp', 0)}
                    size="small"
                    strokeColor={
                      lGet(item, 'cp', 0) === 100 ? '#6f0766' : '#f7941d'
                    }
                  />
                ) : (
                  <div className={`ep-progress-bar progress-bar-${item.cp}`}>
                    <span className={item.cp >= 20 ? 'text-white' : ''}>
                      {item.cp}%
                    </span>
                    {/* <span>6/13</span>*/}
                  </div>
                )}
              </Row>
            </Col>
            <Col xs={8} sm={8} md={6} className="view-more-button-wrapper">
              <Link to={Links.overviewCourseByPath(rootPathIid, item)}>
                <button className={`ep-view-more-button`}>
                  {t1('continue_learning')}
                </button>
              </Link>
            </Col>
          </Row>
        ) : (
          t1('no_recent_course')
        )}
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    userInfo: lGet(props, 'user') || lGet(state, 'user.info'),
    rootPathIid: lGet(state, 'learn.rootPathIid'),
  };
};

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.dashboard_configs('coursesInProgress', 1),
    params: {
      user_iid: lGet(props, 'userInfo.iid'),
      seconds_to_start_alert: SECONDS_TO_START_ALERT_ABOUT_COURSE_DEADLINE,
      items_per_page: 1,
    },
    propKey: 'lastCourse',
    fetchCondition: true,
  }))(Recent),
);
