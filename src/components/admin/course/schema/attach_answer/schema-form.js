import { t1 } from 'translate';
import React from 'react';
import LayoutFreestyle from './LayoutFreestyle';
import Attachments from 'schema-form/elements/attachments';

const schema = {
  attach_result_files: {
    type: Attachments,
    label: t1('attach_result_files'),
    allowDownload: true,
    multiple: true,
    fullWidth: true,
    height: 100,
  },
};

const ui = () => [
  {
    id: 'id', // you still have to have this id even for freestyle
    fields: ['attach_result_files'],
  },
];

export default {
  schema,
  ui,
  layout: {
    component: LayoutFreestyle,
    freestyle: 1,
    isSIS: true,
  },
};
