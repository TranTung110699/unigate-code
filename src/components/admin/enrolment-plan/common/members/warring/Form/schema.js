import React from 'react';
import { t1 } from 'translate';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values, localStep, xpath, { totalResult }) => {
  return {
    send_all: {
      type: 'checkbox',
      label: t1('tick_if_send_all'),
      fullWidth: true,
      valueSet: values && values.targets && values.targets.node_iid,
    },
    view_description: {
      type: 'cascade',
      component: (
        <h3>
          {values.send_all
            ? t1('send_notify_for_%s_users_found', [totalResult])
            : t1('send_notify_for_%s_members_selected', [
                Array.isArray(values.items) ? values.items.length : 0,
              ])}
        </h3>
      ),
    },
    delivery_methods: {
      type: 'multiCheckbox',
      fullWidth: true,
      floatingLabelText: t1('select_sending_methods'),
      options: [
        {
          name: 'mail',
          value: 'mail',
          label: t1('mail'),
        },
        {
          name: 'sms',
          value: 'sms',
          label: t1('sms'),
        },
        {
          name: 'notify app',
          value: 'notify_app',
          label: t1('notify_app'),
        },
      ],
      required: true,
    },
    subject: {
      type: 'text',
      floatingLabelText: t1('message_subject'),
      fullWidth: true,
      label: t1('message_subject'),
      hintText: t1('message_subject'),
      required: true,
    },
    content: {
      type: RTE,
      floatingLabelText: t1('message_content'),
      fullWidth: true,
      label: 'message_content',
      hintText: 'please_type_content',
      required: true,
    },
  };
};

const ui = (step, values, themeConfig, xpath, formid, { totalResult }) => {
  return [
    {
      fields: [
        totalResult > 0 && 'send_all',
        'view_description',
        'delivery_methods',
        'subject',
        'content',
      ].filter(Boolean),
      id: 'default',
    },
  ];
};
export default { schema, ui };
