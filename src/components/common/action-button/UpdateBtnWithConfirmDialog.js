/**
 * Created by hungvo on 19/04/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import sagaActions from 'actions/node/saga-creators';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';

class UpdateBtnWithConfirmDialog extends React.Component {
  handleAction = (onRequestSuccessful) => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.updateNodeRequest({
        ...this.props, //view /home/me/vlms/r/readmin/src/actions/node/saga-creators.js 'updateNodeRequest' for what options could go in props
        requestSuccessful: onRequestSuccessful,
      }),
    );
  };

  render() {
    return (
      <ActionBtnWithConfirmDialog
        {...this.props}
        title={this.props.title || t1('update_item')}
        icon={this.props.icon || 'send'}
        textConfirm={
          this.props.textConfirm || t1('do_you_want_to_update_this_data?')
        }
        actionHandler={this.handleAction}
      />
    );
  }
}

export default connect()(UpdateBtnWithConfirmDialog);
