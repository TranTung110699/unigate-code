import React from 'react';
import { t1, t3 } from 'translate';
import commonSagaActions from 'actions/saga-creators';
import contestApiUrls from 'components/admin/contest/endpoints';
import './stylesheet.scss';
import actions from 'actions/node/creators';
import OTPInput from 'otp-input-react';
import { connect } from 'react-redux';

const OTP_LENGTH = 4; //define OTP length
const TIME_FAIL_TO_BLOCK = 3; //define time enter otp fail
const SECOND_COUNT_IF_BLOCK = 9; //define time to countdown (need decrease 1)
const OTP_TYPE = 'number'; //any|number|alpha|alphanumeric

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      failureTime: 0,
      seconds: SECOND_COUNT_IF_BLOCK,
      isBlockInput: false,
      OTP: '',
    };
  }

  componentDidMount() {
    if (
      parseInt(localStorage.getItem('OTPfailureTime')) >= TIME_FAIL_TO_BLOCK
    ) {
      this.startCountDown();
      this.setState({
        isBlockInput: true,
      });
    }
  }

  handleEnterFailOTP = () => {
    const OTPfailureTime =
      parseInt(localStorage.getItem('OTPfailureTime')) || 0;
    localStorage.setItem('OTPfailureTime', OTPfailureTime + 1);
    this.setState({
      OTP: '',
    });
    if (OTPfailureTime > 1) {
      // Không biết tại sao bị + thêm 2
      this.setState({
        isBlockInput: true,
        seconds: SECOND_COUNT_IF_BLOCK,
      });
      this.startCountDown();
    }

    document.getElementsByClassName('otp-input')[0].focus();
  };

  resetFailureTime = () => {
    localStorage.setItem('OTPfailureTime', 0);
  };

  handleEnterSuccessOTP = () => {
    const { confirmOTPToJoinContestSuccessful, dispatch } = this.props;
    if (typeof confirmOTPToJoinContestSuccessful === 'function') {
      dispatch(actions.closeAllDialogs());
      this.resetFailureTime();
      confirmOTPToJoinContestSuccessful();
    }
  };

  handleSubmit = (otp) => {
    const { dispatch, contest, user } = this.props;

    dispatch(
      commonSagaActions.confirmOTPToJoinContest(
        contestApiUrls.confirm_otp,
        {
          otp: otp,
          user_iid: user.iid,
          contest_code: contest.code,
        },
        this.handleEnterSuccessOTP,
        this.handleEnterFailOTP,
      ),
    );
  };

  countDown = () => {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      this.resetFailureTime();
      this.setState({
        isBlockInput: false,
      });
      document.getElementsByClassName('otp-input')[0].focus();
    }
  };

  startCountDown = () => {
    this.timer = setInterval(this.countDown, 1000);
  };

  setOTP = (otp) => {
    this.setState({
      OTP: otp,
    });

    if (otp.length === OTP_LENGTH && !this.state.isBlockInput) {
      this.handleSubmit(otp);
    }
  };

  render() {
    const title = t3('this_is_security_contest');
    const content = t1('please_enter_otp_to_join_contest!');

    return (
      <div className="row m-t-20 enter-otp d-flex justify-content-center">
        <div>
          <div>
            <h2 className="text-bold">{title}</h2>
          </div>
          <div>{content}</div>
          <React.Fragment>
            <div className="text-center d-flex justify-content-center">
              <div className="text-center m-t-10">
                <OTPInput
                  value={this.state.OTP}
                  onChange={this.setOTP}
                  autoFocus
                  OTPLength={OTP_LENGTH}
                  otpType={OTP_TYPE}
                  disabled={this.state.isBlockInput}
                  inputClassName="otp-input"
                  className="justify-content-center"
                />
                {this.state.isBlockInput && (
                  <div className="text-center m-t-10">
                    <h4
                      style={{
                        color: '#cc0000',
                      }}
                    >
                      {t1(
                        `incorrect_otp_3_times,_please_try_after_%d_seconds`,
                        this.state.seconds + 1,
                      )}
                    </h4>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

Form.propTypes = {};

Form.defaultProps = {};

export default connect()(Form);
