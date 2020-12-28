import React from 'react';
import { connect } from 'react-redux';
import lGet from 'lodash.get';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import Perm from 'common/utils/Perm';
import LayoutHelper from 'layouts/LayoutHelper';
import UserForm from 'components/admin/user/new/Form';
import LoginAction from 'components/user/auth/login/LoginAction';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import RegisterForm from '../../../user/auth/register/Register';
import GJRegister from 'components/user/auth/register/gj/index';

class Register extends LoginAction {
  style = {
    maxWidth: '500px',
    margin: '30px auto',
  };

  doLogin = (post) => {
    const { themeConfig, dispatch, history } = this.props;
    if (post && post.success && post.result) {
      //TODO: If you want to login automatic after register, please get pass from post.result, for now pass return from API default is 1
      //this.doLoginAction(registerForm.values, themeConfig, dispatch, history);
      history.push('login');
    }
  };

  componentWillMount() {
    const { history } = this.props;
    if (!Perm.isGuest()) {
      history.push('/');
    }
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  render() {
    return <GJRegister />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12" style={{ zIndex: 2 }}>
            <UserForm
              mode="new"
              formid="new_account"
              title={t1('register_new_user')}
              step="account"
              requestSuccessful={this.doLogin}
              submitButton={
                <RaisedButton
                  className="m-l-5 m-r-5"
                  icon={null}
                  label={t1('register_new_account')}
                  primary
                  type="submit"
                  raisedButton
                />
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeConfig: lGet(state, 'domainInfo.school.theme'),
  };
};

Register.defaultProps = {
  themeConfig: [],
};

Register.propTypes = {
  themeConfig: PropTypes.arrayOf(),
};

export default connect(mapStateToProps)(Register);
