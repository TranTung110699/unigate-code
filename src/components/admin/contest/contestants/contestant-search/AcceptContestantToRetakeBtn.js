import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';
import commonSagaActions from 'actions/saga-creators';
import contestApiUrls from 'components/admin/contest/endpoints/index';

class UpdateBtnWithConfirmDialog extends React.Component {
  handleAction = (onRequestSuccessful) => {
    const { dispatch, data } = this.props;

    dispatch(
      commonSagaActions.acceptContestantToRetake(
        contestApiUrls.accept_contestant_to_retake,
        data,
        'user_search',
      ),
    );

    onRequestSuccessful();
  };

  render() {
    return (
      <ActionBtnWithConfirmDialog
        {...this.props}
        title={this.props.title || t1('accept_contestant_to_retake')}
        icon={this.props.icon || 'send'}
        actionHandler={this.handleAction}
      />
    );
  }
}

export default connect()(UpdateBtnWithConfirmDialog);
