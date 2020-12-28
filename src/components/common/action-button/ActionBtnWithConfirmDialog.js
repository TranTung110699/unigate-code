/**
 * Created by hungvo on 19/04/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'components/common/mui/FlatButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import NewButton from 'components/common/primary-button';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class ActionBtnWithConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onRequestSuccessful = () => {
    const { dispatch, closeDialogAfterActionSuccessFull } = this.props;

    if (closeDialogAfterActionSuccessFull) {
      dispatch(actions.handleOpenDialog({ openDialog: false }));
    }
  };

  handleRequestSuccessful = (...params) => {
    if (typeof this.props.onRequestSuccessful === 'function') {
      this.props.onRequestSuccessful(...params);
    } else {
      this.onRequestSuccessful();
    }
    this.handleClose();
  };

  handleAction = () => {
    const { actionHandler } = this.props;
    return actionHandler(this.handleRequestSuccessful);
  };

  handleClick = () => {
    if (this.props.noConfirm) {
      return this.handleAction();
    } else {
      return this.handleOpen();
    }
  };

  render() {
    const {
      raisedButton,
      renderComponent,
      contentDialog,
      noConfirm,
      actionProps,
      title,
      disabled,
      primary,
      secondary,
      className,
      buttonLabelStyle,
      clearTextButton,
      dialogTitle,
      newButton,
      isFeatureEnabled,
      antIcon,
      type,
    } = this.props;

    const textConfirm =
      this.props.textConfirm || t1('are_you_sure_you_want_to_do_this?');

    const cancelActionProps = (actionProps && actionProps.cancel) || {
      primary: true,
    };
    const okActionProps = (actionProps && actionProps.ok) || { primary: true };

    const dialogActions = [
      <RaisedButton
        primary
        label={t1('cancel')}
        onClick={this.handleClose}
        {...cancelActionProps}
      />,
      <FlatButton
        label={`${t1('yes_go_ahead')}!`}
        onClick={() => this.handleAction()}
        {...okActionProps}
      />,
    ];

    const iconStyle =
      this.props.icon === 'delete'
        ? {
            theme: 'twoTone',
            twoToneColor: 'red',
          }
        : {};

    const icon = (
      <Icon
        title={title}
        icon={this.props.icon}
        className="action"
        style={this.props.style}
        antIcon={antIcon || this.props.icon === 'delete'}
        {...iconStyle}
      />
    );

    const buttonStyle = {
      color: this.props.style && this.props.style.color,
      minWidth: '43px !important',
      top: '-7px',
      ...(this.props.buttonStyle || {}),
    };

    const propsButton = {
      icon,
      label: this.props.label || '',
      style: this.props.buttonStyle,
      onClick: this.handleClick,
      disabled,
      primary,
      secondary,
      className,
      labelStyle: buttonLabelStyle,
      type,
    };
    const btn = this.props.iconButton ? (
      <span onClick={this.handleClick}>
        {typeof this.props.iconButton === 'boolean'
          ? icon
          : this.props.iconButton}
      </span>
    ) : raisedButton ? (
      <RaisedButton {...propsButton} />
    ) : newButton && isFeatureEnabled(features.NEW_UI_JULY_2019) ? (
      <NewButton {...propsButton} buttonType={this.props.buttonType} />
    ) : (
      <FlatButton {...propsButton} />
    );

    return (
      <React.Fragment>
        {renderComponent
          ? renderComponent({ ...this.props, onClick: this.handleClick })
          : btn}
        <Dialog
          actions={dialogActions}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {dialogTitle && <h3>{dialogTitle}</h3>}
          {contentDialog || textConfirm}
        </Dialog>
      </React.Fragment>
    );
  }
}

ActionBtnWithConfirmDialog.propTypes = {
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
};

export default connect()(withFeatureFlags()(ActionBtnWithConfirmDialog));
