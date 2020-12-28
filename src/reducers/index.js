import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import searchResults from './node/search-results';
import dialogState from './dialog';
import timetable from './timetable';
import timetableV2 from './timetable/timetableV2';
import handleEditable from './editable';
import ui from './ui';
import formSchemaConfigs from './node/form-schema-configs';
import dataApiResults from './node/data-api-result';
import editing from './node/editing';
import tree from './node/tree';
import slugIidMapping from './school/slug-iid-mapping';
import trackerProgress from './tracker';
import domainInfo from './domainInfo';
import user from './user';
import authDialog from './user/auth-dialog';
import maskedTeacher from './user/login-as';
import mm from './mm/mm';
import layout from './layout/index';
import topMenu from './layout/configTopMenu';
import common from './common';
import mediaPlayer from './media-player';
import importData from './import-data';
import preloadData from './preload-data';
import timeSlot from './time-slot';
import loading from './loading';
import learn from './learn';
import recognition from './recognition';
import chat from './chat';
import collapsedMenu from './admin/index';
import event from './event/index';
import timer from './timer/index';
import layoutContext from './layout-context';
import comment from './comment/index';
import clientDataBase from './client-data-base';
import notification from './notification/index';
// import language from './language';
import translations from './translations';
import suggest from './suggest';
import fileManager from './file-manager';
import widget from './admin/widget';
import valueFieldsToPopulateDefault from './admin/valueFieldsToPopulateDefault';
import buyPackage from './learn/buy-package';

export default {
  searchResults,
  dataApiResults,
  dialogState,
  handleEditable,
  formSchemaConfigs,
  editing,
  clientDataBase,
  mediaPlayer,
  importData,
  preloadData,
  timeSlot,
  loading,
  tree,
  layout,
  layoutContext,
  timetable,
  timetableV2,
  common,
  learn,
  authDialog,
  user,
  maskedTeacher,
  mm,
  trackerProgress,
  domainInfo,
  topMenu,
  timer,
  valueFieldsToPopulateDefault,
  form: (state, action) => {
    const newState = formReducer(state, action);

    const form = action && action.meta && action.meta.form;
    let newFormState = Object.assign({}, newState[form]);

    if (action.type === '@@redux-form/CHANGE') {
      const { field } = action.meta;
      if (
        newState[form] &&
        newState[form].submitErrors &&
        newState[form].submitErrors[field]
      ) {
        const newFormSubmitErrors = Object.assign(
          {},
          newFormState.submitErrors,
        );
        delete newFormSubmitErrors[field];
        if (Object.values(newFormSubmitErrors).length === 0) {
          delete newFormState.submitErrors;
          delete newFormState.error;
          delete newFormState.submitFailed;
        } else {
          newFormState.submitErrors = newFormSubmitErrors;
        }
      }
    } else if (action.type === '@@redux-form/UNTOUCH') {
      const { fields } = action.meta;
      fields.forEach((field) => {
        if (
          newState[form] &&
          newState[form].syncErrors &&
          newState[form].syncErrors[field]
        ) {
          delete newFormState.syncErrors[field];
        }
      });
    }

    if (
      newState &&
      newState[form] &&
      newState[form].syncErrors &&
      newState[form].registeredFields
    ) {
      Object.keys(newState[form].syncErrors).forEach((field) => {
        if (!newState[form].registeredFields[field]) {
          newFormState = newFormState || Object.assign({}, newState[form]);
          delete newFormState.syncErrors[field];
        }
      });
    }

    if (newFormState) {
      return Object.assign({}, newState, { [form]: newFormState });
    }
    return newState;
  },
  router: routerReducer,
  ui,
  recognition,
  slugIidMapping,
  chat,
  translations,
  suggest,
  collapsedMenu,
  event,
  fileManager,
  comment,
  notification,
  widget,
  buyPackage,
};
