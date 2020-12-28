import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';
import { logout } from 'actions/auth/';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';

class LoginAsAlert extends Component {
  bStyle = { color: 'black' };

  logOut() {
    this.props.dispatch(logout('/admin'));
  }

  render() {
    const styles = {
      backgroundColor: 'white',
      border: '2px solid red',
      position: 'fixed',
      left: '0px',
      bottom: '0px',
      zIndex: 10000,
      padding: '10px',
    };

    if (this.props.maskedTeacher && this.props.maskedTeacher.info) {
      const title = `${this.props.user.info.iid} : ${
        this.props.user.info.mail
      }`;
      return (
        <div style={styles}>
          {t1('teacher logged in as')}{' '}
          <b style={this.bStyle} title={title}>
            {this.props.user.info.name}
          </b>
          <FlatButton
            primary
            onClick={() => {
              this.logOut();
            }}
          >
            {t1('logout')}
          </FlatButton>
          <a href="/">
            <Icon icon="home" />
          </a>
        </div>
      );
    }
    return null;
  }
}

// TODO: improve by getting the results from selectors
const mapStateToProps = (state) => {
  return {
    user: state.user,
    maskedTeacher: state.maskedTeacher,
  };
};

export default connect(mapStateToProps)(LoginAsAlert);
