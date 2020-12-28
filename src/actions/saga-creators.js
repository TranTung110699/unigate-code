const commonSagaActions = {
  subscribeNewsletter: (url, params) => ({
    type: 'SUBSCRIBE_NEWSLETTER',
    url,
    params,
  }),
  exportDataRequest: (url, params, formid, onRequestSuccessful) => ({
    type: 'EXPORT_DATA_REQUEST',
    url,
    params,
    formid,
    onRequestSuccessful,
  }),
  generateOTPForContestants: (url, params, formid) => ({
    type: 'GENERATE_OTP_FOR_CONTESTANTS',
    url,
    params,
    formid,
  }),
  customizeTestRequest: (url, params) => ({
    type: 'CUSTOMIZE_TEST_REQUEST',
    url,
    params,
  }),
  confirmImportDataRequest: (url, params) => ({
    type: 'CONFIRM_IMPORT_DATA_REQUEST',
    url,
    params,
  }),
  createInvoiceRequest: (url, params, executeOnSuccess) => ({
    type: 'CREATE_INVOICE_REQUEST',
    url,
    params,
    executeOnSuccess,
  }),
  confirmOTPToJoinContest: (
    url,
    params,
    executeOnSuccess,
    executeOnFailure,
  ) => ({
    type: 'CONFIRM_OTP_TO_JOIN_CONTEST',
    url,
    params,
    executeOnSuccess,
    executeOnFailure,
  }),
  acceptContestantToRetake: (url, params, formid) => ({
    type: 'ACCEPT_CONTESTANT_TO_RETAKE',
    url,
    params,
    formid,
  }),
  resyncDataFromShareDB: (url, params, formid) => ({
    type: 'RESYNC_DATA_FROM_SHARE_DB',
    url,
    params,
    formid,
  }),
  changeRelationRequest: (
    url,
    params,
    closeModal,
    executeOnSuccess,
    executeOnFailed,
  ) => ({
    type: 'CHANGE_RELATION_REQUEST',
    url,
    params,
    closeModal,
    executeOnSuccess,
    executeOnFailed,
  }),
  preloadMediaData: (itemIid, preloadData) => ({
    type: 'PRELOAD_MEDIA_DATA',
    itemIid,
    preloadData,
  }),
  preloadAllMediaData: (itemIid, preloadData) => ({
    type: 'PRELOAD_ALL_MEDIA_DATA',
    itemIid,
    preloadData,
  }),
  trackerProgressGet: (
    params,
    updateToStoreAfterSuccess = true,
    executeOnSuccess,
  ) => ({
    type: 'TRACKER_PROGRESS_GET',
    params,
    updateToStoreAfterSuccess,
    executeOnSuccess,
  }),
  trackerProgressSave: (
    params,
    updateToStoreAfterSuccess = true,
    executeOnSuccess,
  ) => ({
    type: 'TRACKER_PROGRESS_SAVE',
    params,
    updateToStoreAfterSuccess,
    executeOnSuccess,
  }),
  getInformationByDomain: (hostname) => ({
    type: 'GET_INFORMATION_BY_DOMAIN_REQUEST',
    hostname,
  }),
  getTranslations: (language, version, isTranslating) => ({
    type: 'GET_TRANSLATIONS',
    language,
    version,
    isTranslating,
  }),
  markTest: (params) => ({
    type: 'MARK_TEST',
    params,
  }),
  downloadCertificateRequest: (url, params) => ({
    type: 'DOWNLOAD_CERTIFICATE_REQUEST',
    url,
    params,
  }),
  sendEmailWithCertificateRequest: (url, params) => ({
    type: 'SEND_EMAIL_WITH_CERTIFICATE_REQUEST',
    url,
    params,
  }),
  resetProgressRequest: (params, id) => ({
    type: 'RESET_PROGRESS_REQUEST',
    params,
    id,
  }),
  resetProgressFinished: (id) => ({
    type: 'RESET_PROGRESS_FINISHED',
    id,
  }),
  setRubricProgress: (payload) => ({
    type: 'SET_RUBRIC_PROGRESS',
    payload,
  }),
  downloadDataRequest: (url, params) => ({
    type: 'DOWNLOAD_DATA_REQUEST',
    url,
    params,
  }),
  importDataRequest: (urlNew, urlSearch, key, params, options) => ({
    type: 'IMPORT_DATA_REQUEST',
    urlNew,
    urlSearch,
    key,
    params,
    options,
  }),
  timeCountDown: (duration, stateKey) => ({
    type: 'SAGA_TIME_COUNT_DOWN',
    duration,
    stateKey,
  }),
  timeCountUp: (timeStart, duration, stateKey) => ({
    type: 'SAGA_TIME_COUNT_UP',
    timeStart,
    duration,
    stateKey,
  }),
  changeNotificationsStatus: (url, params, options) => ({
    type: 'CHANGE_NOTIFICATIONS_STATUS',
    url,
    params,
    options,
  }),
  /* getRubricChildrentByCreditSyllabusIid: (userIid, creditSyllabusIid) => ({
    type: 'GET_RUBRIC_CHILDREN_BY_CREDIT_SYLLABUS_IID',
    userIid,
    creditSyllabusIid,
  }), */
};
export default commonSagaActions;
