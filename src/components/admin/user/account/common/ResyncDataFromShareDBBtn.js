import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';
import commonSagaActions from 'actions/saga-creators';
import hrmsEvnApiUrls from 'components/admin/hrms-data/evn/endpoints';

class ResyncDataFromShareDBDialog extends React.Component {
  handleAction = (onRequestSuccessful) => {
    const {
      dispatch,
      data,
      resyncDataFromShareDBUrl,
      searchFormId,
    } = this.props;

    const url = resyncDataFromShareDBUrl
      ? resyncDataFromShareDBUrl
      : hrmsEvnApiUrls.resync_users_from_evn_share_db;
    const formid = searchFormId ? searchFormId : 'abnormal_account_search';

    dispatch(commonSagaActions.resyncDataFromShareDB(url, data, formid));

    onRequestSuccessful();
  };

  render() {
    return (
      <ActionBtnWithConfirmDialog
        {...this.props}
        title={this.props.title || t1('resync_data_from_share_db')}
        icon={this.props.icon || 'retry'}
        actionHandler={this.handleAction}
      />
    );
  }
}

export default connect()(ResyncDataFromShareDBDialog);
