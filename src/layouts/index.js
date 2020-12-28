/*global FB*/
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import get from 'lodash.get';
import lGet from 'lodash.get';
import userLinks from 'routes/links/user';
import { t1 } from 'translate';
import sagaActions from 'actions/saga-creators';
import actions from 'actions/creators';
import { layoutSelector } from 'utils/selector';
import { layouts } from 'configs/constants';
import { getFacebookAppIdFromConf } from 'common/conf';
import Loading from 'components/common/loading';
import Perm from 'common/utils/Perm';
import menuActions from 'actions/admin/menu/actions';
import { initTawk, shouldShowTawk } from 'common/3rd-party/tawk-to';
import { getFontByLanguage } from 'utils/Util';
import LayoutRegister from 'layouts/register';
import initFont from './font-loader-async';
import layoutContextAction from '../actions/layout-context';
import SupportedBrowsers from 'components/common/supported-browsers';
import { completeProfileBeforeUsing as completeTemisProfileBeforeUsing } from 'components/temis/routes.js';
import lodashIntersection from 'lodash.intersection';

import ModalDialogs from 'components/common/modal/Dialogs';
import GoogleAuthenticatorDialog from 'components/common/google-authenticator-dialog/Dialog';
import SnackbarSimple from 'components/common/snackbar/Snackbar';
// import MediaPopup from 'components/media/Popup';
import LoginAsAlert from 'components/common/LoginAsAlert';
import GoogleAnalytics from 'components/common/google-analytics';

import LoginDialog from 'components/user/auth/login/LoginDialog';
import 'common/grid-bootstrap/grid-bootstrap.scss';
import 'antd/dist/antd.css';
import './stylesheet.scss';
import './fonts.scss';
import { initSigma } from '../common/3rd-party/sigma';
import Modal from 'antd/lib/modal';
import { reLogin } from '../actions/auth/saga-creators';
import ReactPixel from 'react-facebook-pixel';
import firebase from 'firebase/app';
import 'firebase/analytics';

const isLTTUStaff = (userInfo) => {
  const orgs = get(userInfo, 'user_organizations');
  const prefixedOrg = get(window, 'ETEP_CONFIG.GVDHSP_organization_iids');

  if (lodashIntersection(orgs, prefixedOrg).length > 0) return true;
};

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 25/04/2017
 * */
class Layouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      breadcrumb: null,
    };
  }

  componentWillMount() {
    const { location, dispatch, themeConfig } = this.props;
    this.handleOnChangeClassThemeByLayout(null, themeConfig);
    window.NProgress.configure({
      template:
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });
    dispatch(sagaActions.getInformationByDomain(location.hostname));
    if (Perm.isGuest()) dispatch(menuActions.changeSelectedRole(null));
  }

  loadFacebookSDKIfNeeded = (props) => {
    const { themeConfig, conf } = props;
    if (
      getFacebookAppIdFromConf(themeConfig, conf) &&
      !this.isFacebookSDKLoaded
    ) {
      this.loadFacebookSDK();
    }
  };

  componentDidMount() {
    this.handleOnChangeLayout();
    this.loadFacebookSDKIfNeeded(this.props);
    this.initSigmaPlayer();
  }

  componentDidUpdate(prevProps, prevState) {
    this.loadFacebookSDKIfNeeded(this.props);
    const { isSessionExpired } = this.props;
    const conf = lGet(this.props, 'conf', {});

    if (
      lGet(conf, 'sigma_client_id') !== lGet(prevProps.conf, 'sigma_client_id')
    ) {
      this.initSigmaPlayer();
    }
    if (
      conf['analytics:facebook_pixel_id'] !==
      lGet(prevProps.conf, 'analytics:facebook_pixel_id')
    ) {
      this.initFacebookPixel(conf['analytics:facebook_pixel_id']);
    }
    if (
      conf['analytics:firebase_config'] !==
      lGet(prevProps.conf, 'analytics:firebase_config')
    ) {
      this.initFirebaseAnalytics(conf['analytics:firebase_config']);
    }
    if (prevProps.isSessionExpired !== isSessionExpired) {
      if (isSessionExpired) this.sessionExpiredAlert();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, themeConfig } = this.props;
    if (
      nextProps &&
      nextProps.domain &&
      ((nextProps.newLanguage &&
        (nextProps.newLanguage !== nextProps.language ||
          this.props.newLanguage !== nextProps.newLanguage)) ||
        (nextProps.newIsTranslating &&
          nextProps.newIsTranslating !== nextProps.isTranslating) ||
        (nextProps.newVersionTranslations &&
          nextProps.newVersionTranslations !==
            nextProps.versionTranslations)) &&
      (this.props.newLanguage !== nextProps.newLanguage ||
        this.props.newVersionTranslations !==
          nextProps.newVersionTranslations ||
        this.props.newIsTranslating !== nextProps.newIsTranslating)
    ) {
      dispatch(
        sagaActions.getTranslations(
          nextProps.newLanguage,
          nextProps.newVersionTranslations,
          nextProps.newIsTranslating,
        ),
      );
    } else if (
      nextProps &&
      nextProps.isUpdating &&
      nextProps.isUpdating !== this.props.isUpdating
    ) {
      dispatch(actions.saveTranslations({ update: false }));
    }
    if (get(themeConfig, 'layout') !== get(nextProps, 'themeConfig.layout')) {
      this.handleOnChangeClassThemeByLayout(themeConfig, nextProps.themeConfig);
    }
    this.handleOnChangeLayout(nextProps);
  }

  initFacebookPixel = (pixelId) => {
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  };

  initFirebaseAnalytics = (options) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(options);
    }
    firebase.analytics();
  };

  sessionExpiredAlert = () => {
    const { dispatch } = this.props;
    let secondsToGo = 3;
    const modal = Modal.warning({
      title: t1('your_session_has_expired'),
      content: t1(
        `your_session_has_expired_or_your_account_has_been_logged_in_to_another_device.`,
      ),
      onOk: () => {
        dispatch(reLogin());
      },
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      dispatch(reLogin());
    }, secondsToGo * 1000);
  };

  loadFacebookSDK = () => {
    const { conf } = this.props;

    const appId = conf && conf['sso:facebook:app_id'];

    window.fbAsyncInit = function() {
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    this.isFacebookSDKLoaded = true;
  };

  initSigmaPlayer = () => {
    const { conf, userInfo } = this.props;
    const sigmaClientId = lGet(conf, 'sigma_client_id');
    const publicJwt = lGet(conf, 'public_jwt_drm_video');

    if (sigmaClientId && publicJwt) {
      initSigma(userInfo, sigmaClientId, publicJwt);
    }
  };

  handleOnChangeClassThemeByLayout = (themeConfig, nextThemeConfig) => {
    document.body.classList.remove(
      this.renderClassnameByColorPalette(themeConfig),
    );
    document.body.classList.add(
      this.renderClassnameByColorPalette(nextThemeConfig),
    );
  };

  handleOnChangeLayout = (nextProps) => {
    const { dispatch, location, route, themeConfig, conf, language } =
      nextProps || this.props;

    if (!location) {
      return;
    }
    const branch = matchRoutes(route.routes, location.pathname);
    if (!branch || branch.length === 0) {
      return;
    }

    this.setBreadcrumb(branch);

    // loading font if server defines one
    if (themeConfig.font) {
      const font = getFontByLanguage(themeConfig.font, language);

      if (font !== 'default') {
        initFont(font);
      }
    }

    const layoutId =
      (branch[0].route && branch[0].route.layout) ||
      (themeConfig && themeConfig.layout);
    if (layoutId) {
      if (!this.state.layoutId || layoutId !== this.state.layoutId) {
        const params = branch[0].route.params || {};
        this.setState({ layoutId, params });
      }
    }

    const roles = branch[0].route.roles;
    if (roles && roles.length > 0) {
      this.checkPermission(branch[0].route);
    }

    if (conf && conf.tawkto_id) {
      const { pathname } = location;
      const { show_tawkto } = conf;
      if (shouldShowTawk(pathname, show_tawkto)) {
        initTawk(conf.tawkto_id);
      }
    }
  };

  setBreadcrumb = (branch) => {
    const routes = branch || [];
    const { dispatch } = this.props;
    const { breadcrumb } = this.state;

    const schema = [];
    routes.map((route) => {
      const url = route.match && route.match.url;
      const title =
        route.route &&
        (route.route.title || route.route.name || t1(route.route.componentId));
      schema.push({
        url: url,
        title: title,
      });
    });
    if (schema.length === 0) {
      return;
    }

    const newBreadcrumb = JSON.stringify(schema);
    if (newBreadcrumb !== breadcrumb) {
      this.setState({ breadcrumb: newBreadcrumb });
      dispatch(
        layoutContextAction.setSubMenuTop({
          breadcrumbSchema: schema,
          fromLayout: true,
        }),
      );
    }
  };

  renderClassnameByColorPalette = (themeConfig) => {
    let layout = get(themeConfig, 'layout');
    layout = [
      layouts.SEABANK,
      layouts.EVN,
      layouts.MSI,
      layouts.VT,
      layouts.HPU2,
      layouts.BLUE,
      layouts.GJ,
    ].includes(layout)
      ? layout
      : 'default';

    const colorPalette =
      themeConfig && themeConfig.color_palette === 'light' ? 'light' : 'dark';
    return `theme-${layout}-light`;
    // TODO: chưa tìm ra nguyên nhân, fix cứng theme light.
  };

  render() {
    const {
      route,
      themeConfig,
      newLanguage,
      siteTitle,
      requiredLogin,
      configLoaded,
      userInfo,
      location,
      conf,
    } = this.props;
    let layoutId = this.state.layoutId;
    const params = this.state.params || {};
    const { pathname } = location;

    if (!configLoaded || !layoutId) {
      return <Loading />;
    }

    if (
      [
        layouts.SEABANK,
        layouts.MSI,
        // layouts.VT,
        layouts.HPU2,
        layouts.BLUE,
        // layouts.GJ,
      ].includes(layoutId)
    ) {
      layoutId = layouts.EVN;
    }

    const isGuest = Perm.isGuest();

    const currentRootPath = get(pathname.split('/'), '1');

    if (
      requiredLogin &&
      isGuest &&
      get(this.props, 'location.pathname') !== userLinks.login &&
      get(this.props, 'location.pathname') !== userLinks.forgot_password &&
      get(this.props, 'location.pathname') !== userLinks.register
    ) {
      if (!window.isGoJapan) return <Redirect to={userLinks.login} />;
    }

    if (isGuest && currentRootPath === 'profile') {
      return <Redirect to={`${userLinks.login}?next=${pathname}`} />;
    }

    // hack DHSP1 prezi
    if (
      window.enableMindmap &&
      (window.location.pathname == '/dashboard' ||
        window.location.pathname == '/')
    ) {
      return <Redirect to={'/dashboard/my-enrolment-plans'} />;
    }

    const needTemisProfileInfo =
      get(conf, 'user_must_enter_temis_profile_info') &&
      !isLTTUStaff(userInfo) &&
      !isGuest &&
      ![1, '1', 'true', true].includes(
        get(userInfo, 'have_enter_temis_profile_info'),
      );

    const editUserTemisProfileUrl = completeTemisProfileBeforeUsing();

    if (needTemisProfileInfo && location.pathname !== editUserTemisProfileUrl) {
      return <Redirect to={editUserTemisProfileUrl} />;
    }

    const CurrentLayoutConfig =
      LayoutRegister[layoutId] || LayoutRegister.lotus;
    if (!CurrentLayoutConfig) {
      return <Loading />;
    }
    let className = `${
      themeConfig.layout
    }-theme-wrapper ${layoutId}-layout-wrapper`;

    className = `${className} ${
      themeConfig.layout
    }-layout-wrapper ${newLanguage}-language-font`;

    const title = siteTitle
      ? `${siteTitle} - ${themeConfig.website_title}`
      : themeConfig.website_title;

    const font = themeConfig.font
      ? getFontByLanguage(themeConfig.font, newLanguage)
      : 'default';

    return (
      <div
        className={`${this.renderClassnameByColorPalette(
          themeConfig,
        )} ${className}`}
        style={{ height: 'inherit' }}
      >
        <Helmet
          title={title}
          meta={[
            {
              name: 'description',
              content: themeConfig.website_description,
            },
          ]}
          link={[
            {
              type: 'image/x-icon',
              href: themeConfig.favicon,
              rel: 'icon',
            },
          ]}
        />
        <CurrentLayoutConfig.component {...this.props} {...params}>
          {renderRoutes(route.routes)}
        </CurrentLayoutConfig.component>
        <style
          type={'text/css'}
          dangerouslySetInnerHTML={{
            __html: `
            .${themeConfig.layout}-layout-wrapper {font-family: ${font};}
            .${themeConfig.layout}-layout-wrapper h1,
            h1, .${themeConfig.layout}-layout-wrapper h2, .${
              themeConfig.layout
            }-layout-wrapper h3,
             .${themeConfig.layout}-layout-wrapper h4, .${
              themeConfig.layout
            }-layout-wrapper h5,
             .${themeConfig.layout}-layout-wrapper h6, .${
              themeConfig.layout
            }-layout-wrapper .h1,
             .${themeConfig.layout}-layout-wrapper .h2, .${
              themeConfig.layout
            }-layout-wrapper .h3,
             .${themeConfig.layout}-layout-wrapper .h4, .${
              themeConfig.layout
            }-layout-wrapper .h5,
             .${themeConfig.layout}-layout-wrapper .h6 {
              font-family: ${font};
              margin-bottom: 24px;
              margin-top: 0;
              padding: 0;
              letter-spacing: 0;
          }`,
          }}
        />

        <SupportedBrowsers />
        <LoginDialog />
        <ModalDialogs />
        <GoogleAuthenticatorDialog />
        <SnackbarSimple />
        <LoginAsAlert />
        {/*<MediaPopup />*/}
        {process.env.NODE_ENV !== 'development' && <GoogleAnalytics />}
      </div>
    );
  }
}

export default connect(layoutSelector)(Layouts);
