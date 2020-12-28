import { t1 } from 'translate';
import Attachments from 'schema-form/elements/attachments';
import RTE from 'schema-form/elements/richtext';
import React from 'react';

const schema = () => {
  return {
    text: {
      type: RTE,
      floatingLabelText: t1('text'),
      defaultValue: '',
      fullWidth: true,
      multiLine: true,
    },
    attachments: {
      type: Attachments,
      label: <label>{t1('attachments')}</label>,
      allowDownload: true,
      fullWidth: true,
      noFileManager: true,
      className: 'm-t-20',
    },
  };
};

const ui = () => [{ id: 'default', fields: ['attachments'] }];

export default {
  schema,
  ui,
};
