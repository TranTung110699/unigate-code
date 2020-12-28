import React from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import lGet from 'lodash.get';
import {
  communicationMethods,
  notificationRequireActions,
  notificationStatuses,
} from 'configs/constants';
import AntBadge from 'antd/lib/badge';
import Icon from 'antd/lib/icon';
import './stylesheet.scss';
import { t1 } from 'translate';
import Notifications from 'components/front-end/notifications';
import Popover from 'antd/lib/popover';
import { getDashboardUrl, getUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';
import fetchData from 'components/common/fetchData';

const BadgeContainer = ({ totalNotifications, bordered, adminDashboard }) => {
  let [visiblePopover, setVisiblePopover] = React.useState(false);
  const total = Number.isInteger(totalNotifications) ? totalNotifications : 0;
  return (
    <div
      onMouseLeave={() => {
        setVisiblePopover(false);
      }}
    >
      <Popover
        placement="bottomRight"
        title={
          <div className="d-flex">
            <h2>{t1('notifications')} &#128226;</h2>
            <Link
              to={
                adminDashboard
                  ? getUrl('notifications')
                  : getDashboardUrl('notifications')
              }
            >
              {t1('view_all')}
            </Link>
          </div>
        }
        content={<Notifications notShowTitle />}
        visible={visiblePopover}
        trigger="click"
        arrowPointAtCenter
        autoAdjustOverflow
        onVisibleChange={(show) => {
          setVisiblePopover(!!show);
        }}
        overlayClassName="notification-popover"
      >
        <AntBadge
          count={total}
          className={`notification-badge ${bordered && 'bordered'}`}
          overflowCount={9}
          title={t1('you_have_%s_notifications', [total])}
        >
          <Icon
            type="bell"
            className={`noti-icon ${total && 'noti-icon-ringing'}`}
          />
        </AntBadge>
      </Popover>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: lGet(state, 'user.info'),
  unreadNotifications: lGet(state, 'notification.unreadNotifications'),
  screenWidth: lGet(state, 'common.screenSize.width'),
});

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.get_total_notifications,
    params: {
      user_iid: lGet(props, 'userInfo.iid'),
      type: communicationMethods.WEB,
      status: notificationStatuses.INIT,
      require_action: [notificationRequireActions.NO],
    },
    propKey: 'totalNotifications',
    fetchCondition: true,
    refetchCondition: (prevProps) => {
      return (
        lGet(props, 'unreadNotifications') !==
        lGet(prevProps, 'unreadNotifications')
      );
    },
  }))(BadgeContainer),
);
