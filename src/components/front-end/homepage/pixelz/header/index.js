import React from 'react';
import Input from 'schema-form/elements/redux-form-fields/InputDefault';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from 'actions/auth';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 20/05/2017
 **/
class HomepageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginAction = () => {
    const { dispatch, loginForm, history } = this.props;
    dispatch(login(loginForm.values, history));
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.loginAction();
    }
  };

  responseFacebook(response) {
    console.log(response);
  }

  render() {
    let { className, userInfo } = this.props;
    className = className
      ? `${className} ui-header-banner`
      : 'ui-header-banner';
    return (
      <div className={className}>
        <div className="ui-header-banner-content">
          <h1 className="large">
            <em>Pixelz</em> Academy
          </h1>
          <p className="cover">
            Scale post-production effortlessly with talent and technology.
          </p>

          <div className="form-login-home clearfix">
            {(!userInfo || !userInfo.iid) && (
              <div>
                <Input
                  type="text"
                  name="lname"
                  placeholder="Editor ID"
                  onKeyPress={this.handleKeyPress}
                />
                <Input
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onKeyPress={this.handleKeyPress}
                />
                <button type="submit" onClick={this.loginAction}>
                  Login
                </button>
              </div>
            )}

            {userInfo && userInfo.iid && (
              <div className="large welcome">
                Welcome <em>{userInfo.name}</em>
              </div>
            )}

            <div className="description">
              Pixelz Academy will give you a great training so you can get ahead
              with your career
            </div>
            <div className="learn-more">
              <a href="#section1">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const populateStateToProps = (state) => {
  const userInfo = state.user.info;
  return {
    loginForm: state.form.loginFromHomePage,
    userInfo,
  };
};

export default connect(populateStateToProps)(
  reduxForm({
    form: 'loginFromHomePage',
  })(withRouter(HomepageHeader)),
);
