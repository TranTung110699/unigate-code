import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import '../../gj.scss';
import SocialAuth from '../../social-auth/SocialAuth';
import { Link } from 'react-router-dom';
import NodeNew from 'components/admin/node/new';
import schema from './schema';
import './stylesheet.scss';
import sagaActions from 'actions/saga-creators';
import nodeActions from 'actions/node/creators';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import GJHomepageSlider from 'components/front-end/homepage/gojapan/header';
import usersLink from 'routes/links/user';
import styled from 'styled-components';
import lGet from 'lodash.get';
import { parse } from 'query-string';
import ReactPixel from 'react-facebook-pixel';

const nextUrl = (location) =>
  lGet(location, 'query.nextUrl', '') || lGet(parse(location.search), 'next');

const RegisterWrapper = styled.div`
  margin: 30px auto;
  @media (min-width: 768px) {
    max-width: 30vw;
  }
`;

class GJLoginForm extends React.Component {
  divStyle = { display: 'flex', color: '#242c42' };
  labelStyle = { cursor: 'pointer' };

  doLogin = (post) => {
    const { dispatch, history, location } = this.props;

    ReactPixel.track('CompleteRegistration', {
      content_name: lGet(post, 'result.lname', ''),
      currency: 'VND',
      value: lGet(post, 'result.iid', 0),
      status: !!post.success,
    });

    if (post && post.success) {
      //TODO: If you want to login automatic after register, please get pass from post.result, for now pass return from API default is 1
      //this.doLoginAction(registerForm.values, themeConfig, dispatch, history);
      dispatch(sagaActions.getInformationByDomain(window.location.hostname));
      history.push(
        `${usersLink.login}${
          nextUrl(location) ? `?next=${nextUrl(location)}` : ''
        }`,
      );
    }
  };

  render() {
    const { location } = this.props;

    return (
      <div>
        <GJHomepageSlider />
        <div className="container">
          <div className="col-xs-12">
            <RegisterWrapper>
              <div className="gj-register-form">
                <div className={`gj-login-form `}>
                  <h3>{t1('register')}</h3>
                  <hr className="indicator" />
                  <NodeNew
                    ntype={'user'}
                    schema={schema}
                    mode={'new'}
                    step={'account'}
                    closeModal
                    formid="new_account"
                    requestSuccessful={this.doLogin}
                    alternativeApi={'/user/register'}
                    submitButton={
                      <button className="primary-button w-100">
                        {t1('register_new_account')}
                      </button>
                    }
                  />
                  <div className="m-t-20 text-center">
                    <SocialAuth action="register" nextUrl={nextUrl(location)} />
                  </div>
                  <div className="row text-center m-t-10">
                    <Link
                      to={`${usersLink.login}${
                        nextUrl(location) ? `?next=${nextUrl(location)}` : ''
                      }`}
                    >{`${t1('have_an_account?')} ${t1('login')}`}</Link>
                  </div>
                </div>
              </div>
            </RegisterWrapper>
          </div>
        </div>
      </div>
    );
  }
}

GJLoginForm.propTypes = {
  doRegister: PropTypes.func,
  goToLogin: PropTypes.func,
};

GJLoginForm.defaultProps = {
  doRegister: null,
  goToLogin: null,
};

export default withRouter(connect()(GJLoginForm));
