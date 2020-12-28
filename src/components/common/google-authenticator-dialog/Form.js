import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'components/common/mui/RaisedButton';
import actions from 'actions/node/creators';
import { t1 } from 'translate';
import TextField from 'material-ui/TextField';
import Request from 'common/network/http/Request';
import Checkbox from 'material-ui/Checkbox';

class GaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returned: false,
      qrUrl: '',
      token: '',
      rememberBrowser: props.rememberBrowser,
    };
    this.verifyToken = this.verifyToken.bind(this);
  }

  // componentDidMount() {
  //   Request.post('/site/ga/generate').then((response)=> response);
  // }

  updateCheck() {
    this.setState((oldState) => {
      return Object.assign({}, oldState, {
        rememberBrowser: !oldState.rememberBrowser,
      });
    });
  }

  updateToken(token) {
    this.setState((oldState) => {
      return Object.assign({}, oldState, { token });
    });

    if (token.length === 6) {
      this.verifyToken();
    }
  }

  componentDidMount() {
    //    console.log('componentDidMount');
    this.refs.input.focus();
  }

  verifyToken() {
    const { token } = this.state;

    if (token.length === 6) {
      const rememberBrowser = this.state.rememberBrowser ? 1 : 0;
      const { dispatch } = this.props;

      Request.post('/site/ga/verify', {
        userInputToken: token,
        rememberBrowser,
      })
        .then((response) => {
          if (response.success) {
            // if checked then update the store {browserToken,sessionToken}
            const payload = {
              sessionToken: response.result.sessionToken,
            };
            if (response.result.browserToken) {
              payload.browserToken = response.result.browserToken;
            }
            const action = {
              type: 'GA_UPDATE_TOKEN',
              payload,
            };

            dispatch(action);

            dispatch(
              actions.snackbar(
                true,
                t1(
                  'your google authenticator token verified. Please redo your action',
                ),
              ),
            );

            this.props.closeDialog();
          } else {
            // TODO if checked then update the store {browserToken,sessionToken}
            dispatch({
              type: 'GA_UPDATE_TOKEN',
              payload: {
                browserToken: '',
                sessionToken: '',
              },
            });
            dispatch(
              actions.snackbar(
                true,
                t1('your google authenticator token is wrong'),
              ),
            );
          }
        })
        .catch((response) => {});
    }
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            ref="input"
            autoFocus
            onChange={(ev, newValue) => {
              this.updateToken(newValue);
            }}
            hintText={t1('Enter the 6 digits')}
            type="number"
          />
        </div>
        <div className="m-t-10">
          <Checkbox
            label={t1('Remember for this browser')}
            checked={this.state.rememberBrowser}
            onCheck={() => this.updateCheck()}
          />
        </div>
        <div className="m-t-10">
          <RaisedButton primary onClick={this.verifyToken}>
            {t1('Verify')}
          </RaisedButton>
        </div>

        {/*
           <RaisedButton onClick={this.props.showSetUp()}>Show setup </RaisedButton>
          */}
      </div>
    );
  }
}

GaForm.propTypes = {
  rememberBrowser: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

export default connect()(GaForm);
