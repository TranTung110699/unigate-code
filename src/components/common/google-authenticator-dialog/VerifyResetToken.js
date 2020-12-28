import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
// import actions from 'actions/node/creators';
import { t1 } from 'translate';
import TextField from 'material-ui/TextField';
import Request from 'common/network/http/Request';
// import IconClose from 'material-ui/svg-icons/content/clear';
// import errorCodes from 'common/errorCodes';
// import Icon from 'components/common/Icon';

// import Checkbox from 'material-ui/Checkbox';

class VerifyResetToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
    this.verifyToken = this.verifyToken.bind(this);
  }

  verifyToken() {
    const { token } = this.state;

    Request.post('/site/ga/verify-reset-qr-token', { userInputToken: token })
      .then((response) => {
        if (response.success) {
          // console.log('verify success, now show the qr code');
          this.props.resetQrVerified();
        } else {
        }
      })
      .catch((response) => {});
  }

  updateToken(token) {
    this.setState((oldState) => {
      return { token };
    });
  }

  render() {
    return (
      <Paper>
        <hr />
        <div>
          {t1('A token has been sent to your email')} <b>{this.props.mail}</b> .
          {t1('Please enter your token here')}
        </div>
        <div>
          <TextField
            onChange={(ev, newValue) => {
              this.updateToken(newValue);
            }}
            hintText={t1('Enter the token')}
          />
        </div>
        <div>
          <RaisedButton primary onClick={this.verifyToken}>
            {t1('Verify')}
          </RaisedButton>
        </div>
      </Paper>
    );
  }
}

VerifyResetToken.propTypes = {
  resetQrVerified: PropTypes.func, // on the reset token verified
  mail: PropTypes.string, // user email
};

export default VerifyResetToken;
