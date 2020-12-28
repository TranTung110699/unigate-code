import { fork } from 'redux-saga/effects';
import trackerProgress from './tracker';
import exportDataSaga from './exportData';
import confirmImportDataSaga from './confirmImportData';
import changeRelationSaga from './changeRelation';
import domainInfo from './domainInformation';
import markTest from './markTest';
import subscribeNewsletter from './subscribeNewsletter';
import downloadCertificate from './downloadCertificate';
import getTranslations from './getTranslations';
import preloadMediaData from './preloadMediaData';
import preloadAllMediaData from './preloadAllMediaData';
import customizeTest from './customizeTest';
import sendEmailWithCertificate from './sendEmailWithCertificate';
import resetProgressSaga from './resetProgress';
import setRubricProgress from './setRubricProgress';
import importData from './importData';
import downloadData from './downloadData';
import timeCountDow from './timeCountDow';
import createInvoice from './createInvoice';
import timeCountUp from './timeCountUp';
import changeNotificationsStatus from './changeNotificationsStatus';

const commonSagas = [
  fork(exportDataSaga),
  fork(confirmImportDataSaga),
  fork(trackerProgress),
  fork(changeRelationSaga),
  fork(domainInfo),
  fork(markTest),
  fork(subscribeNewsletter),
  fork(downloadCertificate),
  fork(getTranslations),
  fork(preloadMediaData),
  fork(preloadAllMediaData),
  fork(customizeTest),
  fork(sendEmailWithCertificate),
  fork(resetProgressSaga),
  fork(setRubricProgress),
  fork(downloadData),
  fork(importData),
  fork(timeCountDow),
  fork(createInvoice),
  fork(timeCountUp),
  fork(changeNotificationsStatus),
];

export default commonSagas;
