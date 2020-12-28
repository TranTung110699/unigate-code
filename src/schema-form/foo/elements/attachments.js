import { t1 } from 'translate';
import { required } from 'common/validators';
import Attachments from 'schema-form/elements/attachments';

const attachment_one = (onChange, formid, values) => {
  return {
    type: Attachments,
    label: t1('upload_an_image_here'),
    allowDownload: true,
    limit: 1,
    multiple: false,
    validate: [required(t1('you_must_upload_one_scorm_file'))],
    normalize: (values) => (values && values[0]) || null,
    format: (value) => (value ? [value] : []),
    accept: ['application/x-zip-compressed', 'image/*', '.zip'],
    height: '150px',
    maxSize: 300,
  };
};
export const attachment_multiple = (onChange, formid, values) => {
  return {
    type: Attachments,
    label: t1('scorm_file'),
    allowDownload: true,
    // limit: -1,
    multiple: true,
    validate: [required(t1('you_must_upload_one_scorm_file'))],
    normalize: (values, previousValue, allValues, previousAllValues) => {
      return values && values.length ? values : null;
    },
    format: (value) => (value ? value : []),
    accept: [
      'application/x-zip-compressed',
      '.zip',
      'image/*',
      'application/pdf',
      '.txt',
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
    ],
    //Maximum file size (in MB)
    maxSize: 300,
  };
};

export default attachment_one;
