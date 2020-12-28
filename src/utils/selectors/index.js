/**
 * Created by quandv on 18/08/17.
 */
import { createSelector } from 'reselect';
import { translationsLocalStorage } from 'common/utils/Data';
import lodashGet from 'lodash.get';
import Perm from 'common/utils/Perm';
import { layouts, schoolTypes, UiLibs } from 'configs/constants';

// Use this setting if we have not setting on server yet

const defaultLayout = window.APP_THEME || 'lotus';
const mediaRoot = `/media/images/${defaultLayout}`;

const defaultSchoolConfig = {
  theme: {
    layout: defaultLayout,
    // font: window.APP_TITLE || 'Lotus: Teach smart, Learn smarter',
    logo: `${mediaRoot}/logo.png`,
    mobile_logo: `${mediaRoot}/logo_mobile.png`,
    footer_logo: `${mediaRoot}/logo_footer.png`,
    black_logo: `${mediaRoot}/logo_black.png`,
    favicon: `${mediaRoot}/favicon.png`,
    top_menus_available: ['home', 'dashboard'],
  },
  seo: {
    site_name: 'Lotus',
    website_title: window.APP_TITLE || 'Lotus: Teach smart, Learn smarter',
    website_description:
      'Lotus brings you the best teaching & learning experience',
  },
};

// Use this setting to overwrite setting on server
const frontendThemeConfig = {
  theme: {
    layout: window.APP_THEME,
    logo:
      window.APP_THEME_LOGO &&
      `${mediaRoot}images/logo/${window.APP_THEME_LOGO}`,
    footer_logo:
      window.APP_THEME_FOOTER_LOGO &&
      `${mediaRoot}images/logo/${window.APP_THEME_FOOTER_LOGO}`,
    black_logo:
      window.APP_THEME_BLACK_LOGO &&
      `${mediaRoot}images/logo/${window.APP_THEME_BLACK_LOGO}`,
    favicon: window.APP_FAVICON,
  },
  seo: {
    site_name: window.APP_SITE_NAME,
    website_title: window.APP_TITLE,
    website_description: process.env.REACT_APP_DESCRIPTION,
  },
};

const getTranslationsVersion = (state) =>
  (state.translations && state.translations.version) ||
  translationsLocalStorage('version');

const getNewTranslationsVersion = (state) =>
  state.domainInfo &&
  state.domainInfo.school &&
  state.domainInfo.school.translations_version;

export const getDomainInfo = (state) => state.domainInfo;
export const getDomain = (state) => lodashGet(state, 'domainInfo.domain');
export const getConf = (state) => lodashGet(state, 'domainInfo.conf');
export const getUserInfo = (state) => lodashGet(state, 'user.info');
export const getRequiredLogin = (state) =>
  lodashGet(state, 'domainInfo.conf.required_login');

const getLayout = (state) => state.layout;

export const getLanguage = (state) =>
  (state.translations && state.translations.language) ||
  translationsLocalStorage('language');

export const getSchool = (state) => state.domainInfo && state.domainInfo.school;

export const getSessionExpired = (state) =>
  lodashGet(state, 'user.sessionExpired', false);

const getNewLanguage = createSelector(
  getLanguage,
  getUserInfo,
  getDomainInfo,
  (language, userInfo, domainInfo) => {
    if (userInfo && userInfo.settings && userInfo.settings.language) {
      language = userInfo.settings.language;
    } else if (
      !language &&
      domainInfo &&
      domainInfo.school &&
      domainInfo.school.language
    ) {
      language = domainInfo.school.language;
    }
    return language;
  },
);

const languageUpdating = (state) =>
  state.translations && state.translations.update;

const getSchoolAttributesByKey = (state, attr, keys) => {
  let ret = {};
  let type = 'enterprise';
  if (
    state &&
    state.domainInfo &&
    state.domainInfo.school &&
    state.domainInfo.school[attr]
  ) {
    ret = state.domainInfo.school[attr];
  }

  if (
    state &&
    state.domainInfo &&
    state.domainInfo.school &&
    state.domainInfo.school.type
  ) {
    type = state.domainInfo.school.type;
  }

  keys.forEach((i) => {
    if (i === 'type') ret.type = type;
    else if (!ret[i]) {
      if (frontendThemeConfig[attr][i]) {
        ret[i] = frontendThemeConfig[attr][i];
      } else {
        ret[i] = defaultSchoolConfig[attr][i];
      }
    }
  });

  return ret;
};

// for now this contains both theme info AND seo info
export const getThemeConfigFunc = (state) => {
  const themeKeys = [
    'layout',
    'font',
    'logo',
    'mobile_logo',
    'footer_logo',
    'black_logo',
    'favicon',
    'top_menus_available',
    'type',
    'color_palette',
  ];

  const seoKeys = ['site_name', 'website_title', 'website_description'];

  const themeConfig = getSchoolAttributesByKey(state, 'theme', themeKeys);
  const seoConfig = getSchoolAttributesByKey(state, 'seo', seoKeys);

  for (const i in seoConfig) {
    themeConfig[i] = seoConfig[i];
  }

  // console.log('getThemeConfigFunc');
  return themeConfig;
};

export const getThemeConfig = createSelector(
  getThemeConfigFunc,
  (themeConfig) => themeConfig,
);

export const getGlobalConfigs = createSelector(
  (state) => lodashGet(state, 'domainInfo.school.type'),
  (state) => lodashGet(state, 'domainInfo.school.theme.layout'),
  (state) => lodashGet(state, 'domainInfo.conf.k12'),
  (schoolType, layout, isK12) => {
    const ret = { layout, schoolType, uiLib: UiLibs.ANT };

    if (isK12) ret.isK12 = 1;
    if (schoolType === schoolTypes.ENTERPRISE) ret.isEnterprise = 1;
    if (schoolType === schoolTypes.SIS) ret.isSIS = 1;
    if (layout === layouts.EVN) ret.isEvn = 1;

    if (layout === layouts.VT) ret.isViettel = 1;
    if (layout === layouts.BLUE) ret.isViettel = 1;
    if (layout === layouts.HPU2) ret.isViettel = 1;
    if (layout === layouts.SEABANK) ret.isSeabank = 1;
    if (layout === layouts.XPEAK) ret.isXpeak = 1;
    if (layout === layouts.PIXELZ) ret.isPixelz = 1;
    if (layout === layouts.MSI) ret.isMsi = 1;
    if (layout === layouts.LOTUS) ret.isLotus = 1;
    if (layout === layouts.ETEC) ret.isEtec = 1;
    if (layout === layouts.VIETED) ret.isVieted = 1;
    if (layout === layouts.GJ) ret.isGj = 1;

    return ret;
  },
);

export const getSchoolSelector = createSelector(
  getSchool,
  (school) => school,
);

export const getLoadingStatus = (state) => (keyState = 'status') =>
  state && state.loading && state.loading[keyState];

const getIsTranslating = (state) =>
  (state.translations && state.translations.isTranslating) ||
  translationsLocalStorage('isTranslating');

const getNewIsTranslating = (state) =>
  (state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.is_translating) ||
  'no';

const title = (state) => state.topMenu && state.topMenu.siteTitle;

const schoolConfigIsLoaded = (state) =>
  lodashGet(state, 'domainInfo.school.id') || Perm.hasPerm('root', 'system');

const propsLayoutsSelector = createSelector(
  getConf,
  getDomain,
  getLayout,
  getLanguage,
  getNewLanguage,
  getTranslationsVersion,
  getNewTranslationsVersion,
  getIsTranslating,
  getNewIsTranslating,
  languageUpdating,
  getThemeConfig,
  title,
  getRequiredLogin,
  schoolConfigIsLoaded,
  getUserInfo,
  getSessionExpired,
  (
    conf,
    domain,
    layout,
    language,
    newLanguage,
    versionTranslations,
    newVersionTranslations,
    isTranslating,
    newIsTranslating,
    isUpdating,
    themeConfig,
    siteTitle,
    requiredLogin,
    configLoaded,
    userInfo,
    isSessionExpired,
  ) => {
    const location = window.location;
    return {
      conf,
      domain,
      layout,
      location,
      language,
      newLanguage,
      versionTranslations,
      newVersionTranslations,
      isTranslating,
      newIsTranslating,
      isUpdating,
      themeConfig,
      siteTitle,
      requiredLogin,
      configLoaded,
      userInfo,
      isSessionExpired,
    };
  },
);

export default propsLayoutsSelector;
