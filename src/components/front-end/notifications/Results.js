import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Item from './NotificationItem';
import List from 'antd/lib/list';
import sagaActions from '../../../actions/saga-creators';
import { communicationMethods, notificationStatuses } from 'configs/constants';
import apiUrls from 'api-endpoints';

class Results extends Component {
  toMarkSeenTheNotification = (item) => {
    if (!item || item.status !== notificationStatuses.INIT) {
      return;
    }
    const params = {
      notification_iids: [item && item.iid],
      status: notificationStatuses.READ,
      type: communicationMethods.WEB,
    };
    this.props.dispatch(
      sagaActions.changeNotificationsStatus(
        apiUrls.change_notifications_status,
        params,
      ),
    );
  };

  render() {
    const { items } = this.props;

    return (
      <div>
        <List
          size="large"
          className="notifications-list"
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                this.toMarkSeenTheNotification(item);
              }}
            >
              <Item item={item} />
            </List.Item>
          )}
          locale={{ emptyText: t1('there_are_no_notifications_for_you') }}
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
