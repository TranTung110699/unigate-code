/**
 * Created by hungvo on 19/04/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import sagaActions from 'actions/node/saga-creators';
import ActionBtnWithConfirmDialog from 'components/common/action-button/ActionBtnWithConfirmDialog';

class ApiRequestBtnWithConfirmDialog extends React.Component {
  handleAction = (onRequestSuccessful) => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.submitFormRequest('', {
        ...this.props, // view src/sagas/node/common/formSubmitFunction.js for what options could go in props
        executeOnSuccess: onRequestSuccessful,
      }),
    );
  };

  render() {
    return (
      <ActionBtnWithConfirmDialog
        {...this.props}
        title={this.props.title || t1('submit')}
        icon={this.props.icon || 'send'}
        textConfirm={this.props.textConfirm || t1('do_you_want_to_do_this?')}
        actionHandler={this.handleAction}
      />
    );
  }
}

ApiRequestBtnWithConfirmDialog.propTypes = {
  actionHandler: PropTypes.func,
  actionProps: PropTypes.shape(),
  buttonLabelStyle: PropTypes.shape(),
  buttonStyle: PropTypes.shape(),
  className: PropTypes.string,
  closeDialogAfterActionSuccessFull: PropTypes.bool,
  contentDialog: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconButton: PropTypes.bool,
  label: PropTypes.string,
  noConfirm: PropTypes.bool,
  onRequestSuccessful: PropTypes.func,
  primary: PropTypes.bool,
  raisedButton: PropTypes.bool,
  renderComponent: PropTypes.func,
  secondary: PropTypes.bool,
  style: PropTypes.bool,
  textConfirm: PropTypes.string,
  title: PropTypes.string,

  executeOnFailure: PropTypes.func,
  closeModal: PropTypes.bool,
  modalKey: PropTypes.string,
  formidToSubmitOnSuccess: PropTypes.string,
  successMessage: PropTypes.string,
  failureMessage: PropTypes.string,
  params: PropTypes.string,
  url: PropTypes.string,
};

export default connect()(ApiRequestBtnWithConfirmDialog);
