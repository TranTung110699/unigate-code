import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
// import actions from 'actions/node/creators';
import { t1 } from 'translate';
// import IconClose from 'material-ui/svg-icons/content/clear';
// import NodeNew from 'components/admin/node/new';
import Request from 'common/network/http/Request';
import errorCodes from 'common/errorCodes';

import VerifyResetToken from './VerifyResetToken';

import logo from './assets/logo.png';
import sampleGa from './assets/ga-sample.png';

const StepOne = () => (
  <div>
    <div>
      <b>{t1('setup 1: Download Google Authenticator App')}</b>
    </div>
    {t1('search for "Google Authenticator" on your app store')}
    <div>
      <img alt="Google Authenticator" style={{ width: '50px' }} src={logo} />
    </div>
    <div>
      <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
        Android
      </a>{' '}
      &{' '}
      <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">
        Ios
      </a>
    </div>
  </div>
);

const StepThree = ({ showImage }) => (
  <div>
    <div>
      <b>
        {t1(
          'step 3: Open your app and check for your code and enter it in the form above',
        )}
      </b>
    </div>
    {showImage && (
      <div>
        <img alt="Sample" src={sampleGa} style={{ width: '100%' }} />
      </div>
    )}
  </div>
);

const style = {
  marginTop: {
    marginTop: 10,
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10,
  },
};

class GaSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returned: false,
      qrUrl: '',
      errorCode: '',
      showSecurityForm: false,
    };
    // this.requestForQR = this.requestForQR.bind(this);
    // this.enableGaForUser = this.enableGaForUser.bind(this);
  }

  /*
  enableGaForUser(ga_enabled) {
    Request.post('/user/update', {_sand_step: 'ga_enabled', ga_enabled})
      .then((response) => {
        if (response.success) {
          console.log({response});
        } else {
        }
      }).catch((response) => {
        // dispatch(nodeActions.snackbar(true, response.message));
      });
  }
  */

  componentDidMount() {
    this.requestForQR();
  }

  requestForQR() {
    const { dispatch } = this.props;
    Request.get('/site/ga/qr')
      .then((response) => {
        if (response.success) {
          // console.log({response});
          this.setState((oldState) => ({
            ...oldState,
            returned: true,
            qrUrl: response.result,
          }));
        } else {
          this.setState((oldState) => ({
            ...oldState,
            returned: true,
            qrUrl: '',
            errorCode: response.err_code,
          }));
        }
      })
      .catch((response) => {
        // dispatch(nodeActions.snackbar(true, response.message));
      });
  }

  resetQrVerified() {
    // reset state
    this.setState((oldState) => ({
      ...oldState,
      errorCode: errorCodes.ERR_GA_SETUP_REQUIRED,
    }));

    this.requestForQR();
  }

  showSecurityForm() {
    // request server to send email the code to user
    Request.get('/site/ga/request-for-reset-token')
      .then((response) => {
        if (response.success) {
          this.setState((oldState) => ({
            ...oldState,
            showSecurityForm: true,
          }));
        } else {
          // this.setState({ returned: true, qrUrl: '', errorCode: response.err_code });
        }
      })
      .catch((response) => {
        // dispatch(nodeActions.snackbar(true, response.message));
      });
  }

  render() {
    return (
      <div>
        {' '}
        {this.state.returned === false ? (
          <div>Loading...</div>
        ) : (
          <div>
            {this.state.errorCode ===
            errorCodes.ERR_GA_ALREADY_SETUP_CANNOT_REQUEST_QR_AGAIN ? (
              <div>
                {t1(
                  'Google Authenticator is already setup. Please check your phone or click button below to reset again',
                )}

                <RaisedButton
                  primary
                  onClick={() => {
                    this.props.hideSetup();
                  }}
                >
                  {t1('Verify the token')}
                </RaisedButton>

                <RaisedButton
                  onClick={() => {
                    this.showSecurityForm();
                  }}
                >
                  {t1('Reset')}
                </RaisedButton>

                {this.state.showSecurityForm && (
                  <VerifyResetToken
                    mail={this.props.mail}
                    resetQrVerified={() => {
                      this.resetQrVerified();
                    }}
                  />
                )}
              </div>
            ) : (
              <div>
                <ol>
                  <li>
                    <StepOne />
                  </li>

                  <li>
                    <div>
                      <b>
                        {t1(
                          'setup 2: Open Google Authenticator App and scan following QR Code',
                        )}
                      </b>
                    </div>

                    {this.state.returned && this.state.qrUrl ? (
                      <div>
                        <img alt="QR code image" src={this.state.qrUrl} />
                      </div>
                    ) : (
                      <RaisedButton
                        onClick={() => {
                          this.requestForQR();
                        }}
                      >
                        Request For QR Code
                      </RaisedButton>
                    )}
                  </li>
                  {/*
                    <li>
                      <StepThree showImage />
                    </li>
                      */}
                  <li style={style.marginTop}>
                    <RaisedButton
                      overlayStyle={style.button}
                      primary
                      onClick={() => {
                        this.props.hideSetup();
                      }}
                    >
                      {t1('i_am_ready')}. {t1('let_me_verify')}
                    </RaisedButton>
                  </li>
                </ol>
                {/*
                  <div>
                  <RaisedButton onClick={() => { this.enableGaForUser(1) }}>Enable GA</RaisedButton>
                  <RaisedButton onClick={() => { this.enableGaForUser(0) }}>Remove GA</RaisedButton>
                  </div>
                    */}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect()(GaSetup);
