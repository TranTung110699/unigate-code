import React from 'react';
import { t1 } from 'translate';
import { required } from 'common/validators';
import { constants } from 'configs/constants';
import getFormSchemaConfigs from 'api-endpoints/form-schema-configs';
import FormLayoutFreestyle from './FormLayoutFreeStyle';
import BasicTable from './BasicTable';
import DisplayHtml from 'components/common/html';
import { slugifier } from 'common/normalizers';

const schema = (formid, values) => ({
  code: {
    type: 'text',
    floatingLabelText: t1('code'),
    fullWidth: true,
    normalize: slugifier,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  title: {
    type: 'text',
    floatingLabelText: t1('title'),
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
  },
  tpl_action: {
    type: 'select',
    floatingLabelText: t1('action'),
    floatingLabelFixed: true,
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('message_template_actions'),
    },
  },
  language: {
    type: 'select',
    floatingLabelText: t1('language'),
    floatingLabelFixed: true,
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
    options: 'async',
    paramsasync: {
      __url__: getFormSchemaConfigs('usable_languages'),
    },
  },
  method: {
    type: 'select',
    floatingLabelText: t1('method'),
    floatingLabelFixed: true,
    fullWidth: true,
    validate: [required(t1('value_is_required_and_can_not_be_empty'))],
    options: constants.communicationMethodsOptions(),
  },
  content: {
    type: 'text',
    floatingLabelText: t1('content'),
    multiLine: true,
    fullWidth: true,
  },
  params: {
    type: () => {
      const items = values.params;
      const columns = ['name', 'type', 'description'];

      return <BasicTable items={items} columns={columns} />;
    },
    fullWidth: true,
  },
  status: {
    type: 'radio',
    floatingLabelText: t1('status'),
    floatingLabelFixed: true,
    fullWidth: true,
    inline: true,
    options: constants.messageTemplateStatusOptions(),
  },
  content_preview: {
    type: () => {
      return (
        <div>
          <h3>{t1('mail_template_preview')}</h3>{' '}
          <DisplayHtml content={values.content} />
        </div>
      );
    },
  },
});

const ui = {
  new: [
    {
      id: 'default',
      fields: [
        'code',
        'title',
        'tpl_action',
        'language',
        'method',
        'content',
        'content_preview',
        'params',
      ],
    },
  ],
  edit: [
    {
      id: 'default',
      fields: [
        'code',
        'title',
        'tpl_action',
        'language',
        'method',
        'content',
        'content_preview',
        'params',
        'status',
      ],
    },
  ],
  preview: [
    {
      id: 'default',
      fields: ['content', 'params'],
    },
  ],
};

const layout = {
  new: {
    component: FormLayoutFreestyle,
    freestyle: 1,
  },
  edit: {
    component: FormLayoutFreestyle,
    freestyle: 1,
  },
  preview: {
    component: FormLayoutFreestyle,
    freestyle: 1,
  },
};

export default { schema, ui, layout };
