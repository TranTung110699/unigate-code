/**
 * Created by vohung on 23/05/2017.
 */
import { t1 } from 'translate';
import InputAutoComplete from 'schema-form/elements/input-auto-complete';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values, localStep, xpath, props) => {
  return {
    send_all: {
      type: 'checkbox',
      label: t1('tick_if_send_all_user_learn_course'),
      fullWidth: true,
      valueSet: values && values.targets && values.targets.node_iid,
    },
    targets: {
      nameElement: 'targets',
      type: InputAutoComplete,
      baseUrl: '/site/api/get-user-or-group',
      params: values && values.targets,
      dataSourceConfig: {
        text: 'key',
        value: 'data',
        transformData: 'name',
      },
      floatingLabelText: t1('find_group_or_organization_or_specific_user'),
      fullWidth: true,
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

const ui = (step, values) => {
  const fields =
    values && values.send_all
      ? ['send_all', 'delivery_methods', 'subject', 'content']
      : ['send_all', 'targets', 'delivery_methods', 'subject', 'content'];

  if (step === 'new_send_one') {
    return [
      {
        id: 'default',
        fields: ['delivery_methods', 'subject', 'content'],
      },
    ];
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
