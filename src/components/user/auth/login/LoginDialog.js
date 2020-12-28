import React from 'react';
import { connect } from 'react-redux';
import LoginForm from 'components/user/auth/login/Login';
import RegisterForm from 'components/user/auth/register/Register';
import DialogNoHeader from 'schema-form/elements/custom-popup/DialogNoHeader';
import Perm from 'common/utils/Perm';
import {
  activeLoginTab,
  closeLoginDialog,
  openLoginDialog as openLoginDialogAction,
} from 'actions/auth/auth-dialog';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 * */
class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.openLoginPopup = this.openLoginPopup.bind(this);
    this.closeLoginPopup = this.closeLoginPopup.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
  }

  openLoginPopup() {
    const { dispatch } = this.props;
    dispatch(openLoginDialogAction());
  }

  closeLoginPopup() {
    const { dispatch, redirectLoginFailed } = this.props;

    const pathname = window.location.pathname;
    const tmp = pathname.split('/').splice(0, 4);
    tmp.shift();

    if (
      (['system', 'admin'].indexOf(tmp[0]) !== -1 || redirectLoginFailed) &&
      Perm.isGuest()
    ) {
      window.location.assign(redirectLoginFailed || '/');
    }

    dispatch(closeLoginDialog());
  }

  render() {
    const {
      openLoginDialog,
      isLoginTabActivated,
      optionsProperties,
    } = this.props;

    return (
      <DialogNoHeader
        {...optionsProperties}
        closeOn={this.closeLoginPopup}
        open={openLoginDialog}
      >
        {typeof isLoginTabActivated === 'undefined' || isLoginTabActivated ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </DialogNoHeader>
    );
  }
}

const populateStateToProps = (state) => {
  const openLoginDialog = state.authDialog.openLoginDialog;
  const optionsProperties = state.authDialog.optionsProperties;
  const isLoginTabActivated = state.authDialog.isLoginTabActivated;
  const redirectLoginFailed = state.authDialog.redirectLoginFailed;
  return {
    openLoginDialog,
    isLoginTabActivated,
    optionsProperties,
    redirectLoginFailed,
  };
};

export default connect(populateStateToProps)(LoginDialog);
