/**
 * Created by anhvtt on 09/05/2017.
 */
export const CONFIG_MENU_LEFT = 'CONFIG_MENU_LEFT';
export const SAVE_PRELOAD_DATA = 'SAVE_PRELOAD_DATA';

const commonActions = {
  configLeftMenu(configs) {
    return {
      type: CONFIG_MENU_LEFT,
      configs,
    };
  },
  saveProgressMulti(data) {
    return {
      type: 'SAVE_PROGRESS_MULTI',
      data,
    };
  },
  saveInformationByDomain(data) {
    return {
      type: 'SAVE_INFORMATION_BY_DOMAIN',
      data,
    };
  },
  saveImportDataStatus(data) {
    return {
      type: 'SAVE_IMPORT_DATA_STATUS',
      data,
    };
  },
  savePreloadData(itemIid, data) {
    return {
      type: SAVE_PRELOAD_DATA,
      itemIid,
      data,
    };
  },
  changeLoadingStatus(data) {
    return {
      type: 'CHANGE_LOADING_STATUS',
      data,
    };
  },
  saveTranslations(data) {
    return {
      type: 'SAVE_TRANSLATIONS',
      data,
    };
  },
  setTopMenuElement(element) {
    return {
      type: 'SET_ELEMENT_TOP_MENU',
      element,
    };
  },
  saveTimeCountDown(stateKey, data) {
    return {
      type: 'SAVE_TIME_COUNT_DOWN',
      stateKey,
      data,
    };
  },
  saveTimeCountUp(stateKey, data) {
    return {
      type: 'SAVE_TIME_COUNT_UP',
      stateKey,
      data,
    };
  },
  changeValueOfFieldsHaveToPersist: ({ formid, values }) => {
    return {
      type: 'CHANGE_VALUE_OF_FIELDS_HAVE_TO_PERSIST',
      formid,
      values,
    };
  },
  changeStatusOfTaskListForContest: (url, params, onRequestSuccessful) => {
    //On/off task list need to finish of contest/exam round/exam shift
    return {
      type: 'CHANGE_STATUS_OF_TASK_LIST_FOR_CONTEST',
      url,
      params,
      onRequestSuccessful,
    };
  },
};

export default commonActions;
