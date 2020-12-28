import {
  ntype as allNtypes,
  syllabusSubTypes,
} from '../../../configs/constants';
import { extractHostname } from '../../../common/utils/url';
import { createSelectorWithExtraParams } from '../../../utils/selector';
import lodashGet from 'lodash.get';

export const isScormSyllabus = (node) =>
  node &&
  node.ntype === allNtypes.SYLLABUS &&
  node.sub_type === syllabusSubTypes.SYLLABUS_SCORM;

export const isScormSco = (node, checkNtype = true) =>
  node &&
  (!checkNtype || node.ntype === allNtypes.SCO) &&
  node.tpl_type === 'scorm';

/**
 * Sometimes scorm manifest url is in
 * api.lotuslms.com/ufiles/abc..
 *
 * or api.lotuslms.com/
 *
 * But this will create problems if the SCORM file calls some parent window to update some api
 * (Tincan API) because the scorm iframe is now in api.lotuslms.com , running in a
 * domain called "somecompany.lotuslms.com"
 * and trying to interact with parent DOM in somecompany.lotuslms.com
 * Therefore this function is trying to convert to the same parent windows.
 * At the server side, we need to proxy it
 *
 * For local development nginx setup. See $v/misc/nginx/scorm-on-frontend-domain
 *
 * Update Sep 15 2019: now we have moved the player to frontend under
 * https://frontend.domain/scorm/player2.html?https://api.domain/ufiles/path/to/the/dir/manifest.xml
 *
 * @param url
 */
const replaceScormHost = (url) => {
  // TODO: in case things not working properly, just return url here.
  // for localhost dev
  // return url.replace('http://ufiles', 'http://vlms.local/ufiles');

  const hostname = extractHostname(url);
  let ret;
  // ret = url;
  ret = url.replace(hostname, window.location.hostname);

  // on production we usually use http
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ret = ret.replace('https', 'http');
  }

  return ret;
};

/**
 * Absolute path of the scorm js player.
 * @returns {*}
 */
export const scormPlayerLink = (scormDirectoryUrl) => {
  return `/scorm/player2.html?${getScormManifestUrlByDirectoryUrl(
    scormDirectoryUrl,
  )}`;
  /*
  pre sep 15 2019 version
  const relativePath = '/scorm-player/player.html';

  let ret = window.APP_SERVER_API_URL + relativePath;

  return replaceScormHost(ret);
  */
};

export const getScormManifestUrlByDirectoryUrl = (scormDirectoryUrl) => {
  let ret = (scormDirectoryUrl && `${scormDirectoryUrl}/imsmanifest.xml`) || '';

  if (window.APP_SERVER_API_URL.indexOf('https') === 0) {
    ret = ret.replace('http://', 'https://');
  }

  return replaceScormHost(ret);
};

export const isScormProcessing = (node) =>
  node && lodashGet(node, 'processing_scorm.is_processing_scorm');

export const getTimeScormProcessingStart = (node) =>
  node && lodashGet(node, 'processing_scorm.ts');

export const isScormProcessingSuccess = (node) => {
  if (typeof lodashGet(node, 'processing_scorm.success') !== 'undefined') {
    return lodashGet(node, 'processing_scorm.success');
  }

  return Boolean(
    getScormManifestUrlByDirectoryUrl(lodashGet(node, 'scorm_directory_url')),
  );
};

export const getScormProcessingMessage = (node) =>
  node && lodashGet(node, 'processing_scorm.message');

export const getScormFileLink = (node) =>
  node && lodashGet(node, 'scorm_file.link');

/**
 * By default, scorm (or file/attachment in general) is uploaded to /file/index/upload
 * In some situation, we cannot upload scorm file directly to web server, due to file being too large. We have to workaround
 * and upload file to proxy server and then download the file from proxy server to webserver in a separate process
 *
 * Note: remember if we ever enable this second method, we already have upload code in public/scorm/upload.php
 *
 * This config gives the possibility for us to dynamically switch back and forth between those 2 options
 *
 * @param domainInfo
 * @returns {string|undefined}
 */
export const scormUploadUrl = (domainInfo) =>
  lodashGet(domainInfo, 'conf.scorm_upload_url');
