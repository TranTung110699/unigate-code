/**
 * Created by hungvo on 19/04/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import commonSagaActions from 'actions/saga-creators';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';

class ExportBtnWithConfirmDialog extends React.Component {
  handleAction = (onRequestSuccessful) => {
    const { dispatch, url, params, formid } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        url,
        params,
        formid,
        onRequestSuccessful,
      ),
    );
  };

  render() {
    return (
      <ActionBtnWithConfirmDialog
        {...this.props}
        title={this.props.title || t1('export')}
        icon={this.props.icon || 'export'}
        textConfirm={
          this.props.textConfirm || t1('do_you_want_to_export_this_data?')
        }
        actionHandler={this.handleAction}
      />
    );
  }
}

export default connect()(ExportBtnWithConfirmDialog);
