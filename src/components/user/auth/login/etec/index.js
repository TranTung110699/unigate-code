import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Icon from 'components/common/Icon';
import { layouts } from 'configs/constants';
import fetchData from 'components/common/fetchData';
import Select from 'schema-form/elements/redux-form-fields/SelectDefault';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import SocialAuth from '../../social-auth/SocialAuth';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import EtepHelpLogin from '../etep/Help';
import EvnHelpLogin from '../evn/Help';
import styled from 'styled-components';

import '../../etec.scss';

const PaddingBottomMobile = styled.div`
  @media screen and (max-width: 591px) {
    height: 30px;
  }
`;

const style = {
  // paddingBottom: { height: '70px' },
  underlineStyle: {
    borderTop: 'none #8fdd2d !important',
    borderLeft: 'none #8fdd2d !important',
    borderRight: 'none #8fdd2d !important',
    borderBottom: '2px solid #8fdd2d !important',
  },
  icon: {
    width: 0,
    cursor: 'pointer',
    transform: 'translate(-20px, 15px)',
  },
};

class EtecLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLdapHostsOptions: true,
      showPass: false,
    };
  }

  divStyle = { margin: 0, padding: 0 };
  checkboxLabelStyle = { color: '#242c42' };
  checkboxIconStyle = {
    fill: '#242c42',
    width: '15px',
    height: '15px',
    top: '2px',
    marginRight: '5px',
  };

  toggleLdapServersOptions = () => {
    this.setState({
      showLdapHostsOptions: !this.state.showLdapHostsOptions,
    });
  };

  handleClickButton = () => {
    this.setState({
      showPass: !this.state.showPass,
    });
  };

  getLdapServersOptions = (ldapServers) => {
    const ldapServersOptions = [
      { value: '', name: t1('choose_domains'), label: t1('choose_domains') },
    ];
    ldapServers &&
      ldapServers.forEach((ldapServer) => {
        ldapServersOptions.push({
          value: ldapServer.host,
          name: ldapServer.name,
          label: ldapServer.name,
        });
      });

    return ldapServersOptions;
  };

  render() {
    const {
      doLogin,
      changePassword,
      handleKeyPress,
      goToRegister,
      enableRegisters,
      ldapServers,
      ldapEnabled,
      themeConfig,
      operatingOrganizations,
    } = this.props;
    let evnCssClass = '';
    let evnFormTitle = '';
    if (
      themeConfig &&
      [layouts.SEABANK, layouts.EVN, layouts.MSI].includes(themeConfig.layout)
    ) {
      evnCssClass = 'evn-login-form';
      evnFormTitle = 'title';
    }

    let defaultValue = '';
    const ldapServersOptions = this.getLdapServersOptions(ldapServers);

    ldapServersOptions.forEach((option) => {
      if (option.value !== '') {
        defaultValue = option.value;
      }
    });

    if (themeConfig.layout === layouts.VT) {
      return (
        <div className={`vt-login-form `}>
          <h3>{t1('login')}</h3>
          <hr className="indicator" />
          {ldapEnabled === 'yes' && [
            <div className="ldap-enabled row">
              <Checkbox
                checked={this.state.showLdapHostsOptions}
                labelStyle={this.checkboxLabelStyle}
                iconStyle={this.checkboxIconStyle}
                name="ldap_enabled"
                label={t1('login_via_active_directory_account')}
                onClick={() => this.toggleLdapServersOptions}
              />
            </div>,
            this.state.showLdapHostsOptions &&
              ldapServersOptions.length > 2 && (
                <Select
                  defaultValue={defaultValue}
                  name="ldap_host"
                  className="input-default"
                  options={ldapServersOptions}
                />
              ),
          ]}{' '}
          {ldapEnabled !== 'yes' &&
            Array.isArray(operatingOrganizations) &&
            operatingOrganizations.length && (
              <div className="row" style={this.divStyle}>
                {this.props.isEvn ? <EvnHelpLogin /> : null}
                <Select
                  label={t1('operating_organization')}
                  name="operating_organization"
                  className="input-default"
                  options={[
                    {
                      value: '',
                      name: t1('choose_operating_organization'),
                      label: t1('choose_operating_organization'),
                    },
                  ].concat(
                    operatingOrganizations.map(({ name, iid, code }) => ({
                      value: iid,
                      name,
                      label: name,
                    })),
                  )}
                />
              </div>
            )}{' '}
          {window.isETEP ? <EtepHelpLogin /> : null}
          <div className="row" style={this.divStyle}>
            <TextField
              fullWidth
              name="lname"
              floatingLabelText={t1('account')}
              onKeyPress={handleKeyPress}
              underlineStyle={style.underlineStyle}
            />
          </div>
          <div className="row" style={this.divStyle}>
            <TextField
              type={this.state.showPass ? 'text' : 'password'}
              fullWidth
              name="pass"
              floatingLabelText={t1('pass')}
              onKeyPress={handleKeyPress}
              underlineStyle={style.underlineStyle}
              icon={
                <Icon
                  icon={this.state.showPass ? 'eye-invisible' : 'eye'}
                  style={style.icon}
                  onClick={this.handleClickButton}
                  antIcon
                />
              }
            />
          </div>
          <div className="remember-me-panel row">
            <Checkbox
              labelStyle={this.checkboxLabelStyle}
              iconStyle={this.checkboxIconStyle}
              name="remember_me"
              label={t1('remember_me')}
            />
          </div>
          <div className="row">
            <a className="login-btn" onClick={() => doLogin()}>
              {t1('login')}
            </a>
          </div>
          <div className="row are-you-forgot-pass">
            <a onClick={changePassword} className="forgot-password">
              {' '}
              {t1('forgot_password')}?{' '}
            </a>
          </div>
          <SocialAuth />{' '}
          {enableRegisters && enableRegisters.includes('normal_register') ? (
            <div className="row text-center">
              <a onClick={goToRegister} className="register">
                {`${t1('you_do_not_have_an_account_yet')}?`}&nbsp;
                <span onClick={goToRegister}>{t1('register')}</span>{' '}
              </a>
            </div>
          ) : (
            <PaddingBottomMobile />
          )}
        </div>
      );
    }

    return (
      <div className={`${evnCssClass} etec-login-form `}>
        <h3>{t1('login')}</h3>
        <hr className="indicator" />
        {ldapEnabled === 'yes' && [
          <div className="ldap-enabled row">
            <Checkbox
              checked={this.state.showLdapHostsOptions}
              labelStyle={this.checkboxLabelStyle}
              iconStyle={this.checkboxIconStyle}
              name="ldap_enabled"
              label={t1('login_via_active_directory_account')}
              onClick={() => this.toggleLdapServersOptions}
            />
          </div>,
          this.state.showLdapHostsOptions && ldapServersOptions.length > 2 && (
            <Select
              defaultValue={defaultValue}
              name="ldap_host"
              className="input-default"
              options={ldapServersOptions}
            />
          ),
        ]}
        {ldapEnabled !== 'yes' &&
          Array.isArray(operatingOrganizations) &&
          operatingOrganizations.length && (
            <div className="row" style={this.divStyle}>
              {this.props.isEvn ? <EvnHelpLogin /> : null}
              <Select
                label={t1('operating_organization')}
                name="operating_organization"
                className="input-default"
                options={[
                  {
                    value: '',
                    name: t1('choose_operating_organization'),
                    label: t1('choose_operating_organization'),
                  },
                ].concat(
                  operatingOrganizations.map(({ name, iid, code }) => ({
                    value: iid,
                    name,
                    label: name,
                  })),
                )}
              />
            </div>
          )}
        {window.isETEP ? <EtepHelpLogin /> : null}
        <div className="row" style={this.divStyle}>
          <TextField
            fullWidth
            name="lname"
            floatingLabelText={t1('account')}
            onKeyPress={handleKeyPress}
            underlineStyle={style.underlineStyle}
          />
        </div>
        <div className="row" style={this.divStyle}>
          <TextField
            type={this.state.showPass ? 'text' : 'password'}
            fullWidth
            name="pass"
            floatingLabelText={t1('pass')}
            onKeyPress={handleKeyPress}
            underlineStyle={style.underlineStyle}
            icon={
              <Icon
                icon="preview"
                style={style.icon}
                onClick={this.handleClickButton}
              />
            }
          />
        </div>
        <div className="remember-me-panel row">
          <Checkbox
            labelStyle={this.checkboxLabelStyle}
            iconStyle={this.checkboxIconStyle}
            name="remember_me"
            label={t1('remember_me')}
          />
        </div>
        <div className="row">
          <a className="login-btn" onClick={() => doLogin()}>
            {t1('login')}
          </a>
        </div>
        <div className="row are-you-forgot-pass">
          <a onClick={changePassword} className="forgot-password">
            {' '}
            {t1('forgot_password')}?
          </a>
        </div>
        <SocialAuth />
        {enableRegisters && enableRegisters.includes('normal_register') ? (
          <div className="row text-center">
            <a onClick={goToRegister} className="register">
              {`${t1('you_do_not_have_an_account_yet')}?`}
              &nbsp;
              <span onClick={goToRegister}>{t1('register')}</span>
            </a>
          </div>
        ) : (
          <div style={style.paddingBottom} />
        )}
      </div>
    );
  }
}

EtecLogin.propTypes = {
  doLogin: PropTypes.func,
  changePassword: PropTypes.func,
  handleKeyPress: PropTypes.func,
  goToRegister: PropTypes.func,
  enableRegisters: PropTypes.arrayOf(PropTypes.string),
};

EtecLogin.defaultProps = {
  doLogin: null,
  changePassword: null,
  handleKeyPress: null,
  goToRegister: null,
  enableRegisters: null,
};

const mapStateToProps = createSelector(
  (state) =>
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.ldap_enabled,
  (state) =>
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.ldap_servers,
  (ldapEnabled, ldapServers) => ({
    ldapEnabled,
    ldapServers,
  }),
);

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: '/organization/api/get-operating-organization-list-to-login',
    propKey: 'operatingOrganizations',
    fetchCondition:
      props.ldapEnabled !== 'yes' && !!props.allowLoginByOperatingOrganization,
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  }))(withSchoolConfigs(EtecLogin)),
);
