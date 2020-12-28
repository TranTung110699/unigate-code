import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions/creators';
import { t1 } from 'translate';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SyncIcon from 'material-ui/svg-icons/notification/sync';
import adminSagaActions from 'actions/admin/saga-creators';
import apiUrls from 'api-endpoints';
import SyncTcoInfo from './SyncTcoInfo';

class Layout extends Component {
  componentWillMount() {
    this.props.dispatch(actions.setTopMenuElement({ siteTitle: 'sync' }));
  }

  syncDataByType = (type) => {
    const { dispatch } = this.props;

    const params = {
      submit: 1,
    };
    dispatch(
      adminSagaActions.synchronizeDataFromDatabaseToRedis(
        apiUrls[type],
        params,
      ),
    );
  };

  renderRightIconAction = (type) => (
    <IconButton
      tooltip={t1(`sysnc_${type}`)}
      onClick={() => this.syncDataByType(type)}
    >
      <SyncIcon />
    </IconButton>
  );

  render() {
    return (
      <div>
        <List>
          <ListItem
            primaryText={t1('update_max_iid_to_redis')}
            secondaryText="update max iid (across all ntypes) to redis key TCO_IID (tco_iid)"
            secondaryTextLines={2}
            rightIconButton={this.renderRightIconAction(
              'update_max_iid_to_redis',
            )}
          />
          <ListItem
            primaryText={t1('cache_users_(info)_to_redis')}
            secondaryText="cache users info to redis"
            secondaryTextLines={2}
            rightIconButton={this.renderRightIconAction('cache_users_info')}
          />
          <ListItem
            primaryText={t1('synchronize_progress_from_database_to_redis')}
            secondaryText={t1('synchronize_progress_from_database_to_redis')}
            secondaryTextLines={2}
            rightIconButton={this.renderRightIconAction('synchronize_progress')}
          />
          <ListItem
            primaryText={t1('synchronize_unlock_from_database_to_redis')}
            secondaryText={t1('synchronize_unlock:_course_and_path')}
            secondaryTextLines={2}
            rightIconButton={this.renderRightIconAction('synchronize_unlock')}
          />
        </List>
        <SyncTcoInfo />
      </div>
    );
  }
}

export default connect()(Layout);
