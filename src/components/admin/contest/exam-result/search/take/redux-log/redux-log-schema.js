import { t1 } from 'translate/index';
import Attachments from 'schema-form/elements/attachments';

const reduxLogSchema = () => {
  return {
    redux_log_text: {
      type: 'text',
      multiLine: true,
      hintText: t1('paste_content_of_the_log_file'),
      floatingLabelText: t1('paste_content_of_the_log_file'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    redux_log_files: {
      type: Attachments,
      allowDownload: true,
      multiple: false,
      fullWidth: true,
      accept: ['.txt'],
      noFileManager: true,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['redux_log_text', 'redux_log_files'],
    },
  ];
};

export default { schema: reduxLogSchema, ui };
