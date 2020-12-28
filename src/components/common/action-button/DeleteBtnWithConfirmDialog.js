/**
 * Created by hungvo on 19/04/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import sagaActions from 'actions/node/saga-creators';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';

class DeleteBtnWithConfirmDialog extends React.Component {
  handleAction = (onRequestSuccessful) => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.deleteNodeRequest({
        ...this.props, //view actions/node/saga-creators.js 'deleteNodeRequest' for what options could go in props
        onRequestSuccessful,
      }),
    );
  };

  render() {
    const { clearTextButton } = this.props;
    let { renderComponent } = this.props;
    if (clearTextButton) {
      renderComponent = ({ onClick }) => (
        <span className="text-danger" onClick={onClick}>
          {clearTextButton}
        </span>
      );
    }
    return (
      <ActionBtnWithConfirmDialog
        {...this.props}
        renderComponent={renderComponent}
        title={this.props.title || t1('delete_item')}
        icon={this.props.icon || 'delete'}
        textConfirm={
          this.props.textConfirm || t1('do_you_want_to_delete_this_data?')
        }
        actionHandler={this.handleAction}
      />
    );
  }
}

export default connect()(DeleteBtnWithConfirmDialog);
