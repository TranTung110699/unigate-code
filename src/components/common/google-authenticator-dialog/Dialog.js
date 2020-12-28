/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import IconClose from 'material-ui/svg-icons/content/clear';
import errorCodes from 'common/errorCodes';
import Setup from './Setup';
import Form from './Form';
import Icon from 'components/common/Icon';

class GoogleAuthenticatorDialog extends Component {
  iconCloseStyle = {
    position: 'absolute',
    right: 25,
    top: 25,
    width: 30,
    height: 30,
    cursor: 'pointer',
  };
  divStyle = { color: 'red' };

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      showSetup: false,
    };
    // this.showSetup = this.showSetup.bind(this);
    // this.showVerifyForm = this.showVerifyForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.openGoogleAuthenticator &&
      nextProps.openGoogleAuthenticator !== this.props.openGoogleAuthenticator
    ) {
      const showSetup =
        nextProps.openGoogleAuthenticator === errorCodes.ERR_GA_SETUP_REQUIRED;
      this.setState({ showSetup });
    }
  }

  handleOpen() {
    const { dispatch } = this.props;
    dispatch(actions.handleGoogleAuthenticatorDialog(true));
  }

  handleClose() {
    const { dispatch } = this.props;
    dispatch(actions.handleGoogleAuthenticatorDialog(false));
  }

  showSetup() {
    const showSetup = !this.state.showSetup;
    this.setState({ showSetup });
  }

  // showVerifyForm() {
  //   this.setState({ form: true });
  // }

  render() {
    const { openGoogleAuthenticator } = this.props;

    const showSetup = this.state.showSetup;
    // || openGoogleAuthenticator === errorCodes.ERR_GA_SETUP_REQUIRED;
    // const showForm = this.state.form || openGoogleAuthenticator === errorCodes.ERR_GA_REQUIRED;
    const arrowIcon = showSetup ? 'menu_close' : 'menu_open';

    return (
      <Dialog
        {...this.props}
        open={openGoogleAuthenticator}
        autoDetectWindowHeight
        repositionOnUpdate
        autoScrollBodyContent
        modal
        onRequestClose={this.handleClose}
      >
        <h2>
          {t1('Verify with Google Authenticator')}
          <IconClose onClick={this.handleClose} style={this.iconCloseStyle} />
        </h2>
        <div style={this.divStyle}>
          {t1(
            'to protect your account, some actions need two-factor authentication',
          )}
          ({' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            ?
          </a>{' '}
          )
          {/*
           */}
          <RaisedButton
            primary
            onClick={() => this.showSetup()}
            className="m-l-10"
          >
            {t1('setup')} <Icon icon={arrowIcon} />
          </RaisedButton>
        </div>
        <hr />

        {showSetup ? (
          <div>
            {showSetup && (
              <Setup
                mail={this.props.mail}
                hideSetup={() => {
                  this.showSetup();
                }}
              />
            )}
          </div>
        ) : (
          <div>
            <div>{t1('Enter token from your Google Authenticator App')}</div>
            <Form
              closeDialog={() => this.handleClose()}
              rememberBrowser={this.props.rememberBrowser}
            />
          </div>
        )}
      </Dialog>
    );
  }
}

GoogleAuthenticatorDialog.propTypes = {
  dispatch: PropTypes.func,
  handleClose: PropTypes.bool,
  mail: PropTypes.string,
  openGoogleAuthenticator: PropTypes.bool,
  rememberBrowser: PropTypes.bool.isRequired,
};

GoogleAuthenticatorDialog.defaultProps = {
  dispatch: () => {},
  handleClose: false,
  mail: '',
  openGoogleAuthenticator: false,
  // rememberBrowser: true,
};

function mapStateToProps(state) {
  const { openGoogleAuthenticator } = state.dialogState;

  let rememberBrowser = false;
  if (state.user && state.user.ga && state.user.ga.browserToken) {
    rememberBrowser = true;
  }

  let mail = '';
  if (state.user && state.user.info && state.user.info.mail) {
    mail = state.user.info.mail;
  }

  const props = {
    openGoogleAuthenticator,
    rememberBrowser,
    mail,
  };

  return props;
}

export default connect(mapStateToProps)(GoogleAuthenticatorDialog);
