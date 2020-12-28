/**
 * Created by hungvo on 26/06/17.
 */
import { t1 } from 'translate';

export const downloadFileFromUrl = ({ downloadUrl, fileName = 'file' }) => {
  const fallbackToRedirect = () => {
    window.location.assign(downloadUrl);
  };

  try {
    fetch(downloadUrl)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        fallbackToRedirect();
      });
  } catch (e) {
    fallbackToRedirect();
  }
};

export const convertFromBase64ToFile = (dataURI, fileName) => {
  let byteString;

  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], { type: mimeString });

  return new File([blob], fileName);
};

/**
 * @param typesOrType
 * @return {Array|undefined}
 *  if undefined => allow everything
 *  else => an array of accept file types
 */
export const allowedFileTypes = (typesOrType) => {
  const filesTypes = [
    'video/*',
    'image/*',
    'audio/*',
    'application/pdf',
    // ppt
    'application/vnd.sealed-ppt',
    // document
    '.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // excel
    '.excel,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel',
    'application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel',
    // zip file type
    '.rar,.gz,application/zip,application/x-compressed',
    // font
    '.font,.ttf',
    // media_type
    'application/vnd.adobe.flash.movie',
  ];

  let types = typesOrType;
  if (!Array.isArray(types)) {
    types = [types];
  }

  // filter out empty value
  types = types.filter(Boolean);

  if (!types.length) {
    return [];
  }

  if (types.some((type) => type === 'anything')) {
    return undefined;
  }

  return filesTypes.filter((fType) =>
    types.some((type) => {
      if (fType.includes(type)) {
        return true;
      }

      if (type === 'swf') {
        return fType === 'application/vnd.adobe.flash.movie';
      }

      // some special cases
      if (type === 'img') {
        return fType === 'image/*';
      }
    }),
  );
};

export const getDisplayFileSize = (sizeInByte) => {
  const allUnits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let sizeInUnit = sizeInByte;
  let unitIndex = 0;
  while (sizeInUnit > 1024) {
    unitIndex += 1;
    sizeInUnit /= 1024;
  }
  return `${Math.round(sizeInUnit * 10) / 10} ${allUnits[unitIndex]}`;
};

export const getFileFullName = (item) => {
  let name = t1('unknown');
  if (item) {
    if (item.name) {
      name = item.name;
    }
    if (item.ext) {
      name += `.${item.ext}`;
    }
  }
  return name;
};

export const getFileKeyForElement = (item) =>
  item.id || item.code || item.iid || getFileFullName(item);

export const getFileExtension = (fileName = '') => {
  if (!!!fileName && typeof fileName !== 'string') return '';

  return fileName.split('.').pop();
};
