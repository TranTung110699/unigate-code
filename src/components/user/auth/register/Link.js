import React from 'react';
import { t1 } from 'translate';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'components/common/mui/FlatButton';
import LoginForm from 'components/user/auth/login/Login';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/

class LoginLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openLoginPopup = this.openLoginPopup.bind(this);
    this.closeLoginPopup = this.closeLoginPopup.bind(this);
  }

  openLoginPopup() {
    this.setState({ open: true });
  }

  closeLoginPopup() {
    this.setState({ open: false });
  }

  render() {
    const label = t1('Login');
    return (
      <div>
        <FlatButton href="#" onClick={this.openLoginPopup} alt={label}>
          {' '}
          {label}
        </FlatButton>
        <Dialog
          bodyClassName="login-modal-content"
          modal
          open={this.state.open}
        >
          <FlatButton
            className="close-popup"
            href="#"
            onClick={this.closeLoginPopup}
            alt={close}
          >
            <i className="fa fa-times" aria-hidden="true" />
          </FlatButton>
          <LoginForm />
        </Dialog>
      </div>
    );
  }
}

export default LoginLink;
