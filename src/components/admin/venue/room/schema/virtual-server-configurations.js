import { t1 } from 'translate';

const schema = (formid, values, step) => {
  return {
    attendee_password: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('attendee_password'),
      fullWidth: true,
    },
    moderator_password: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('moderator_password'),
      fullWidth: true,
    },
    voice_bridge: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('voice_bridge'),
      fullWidth: true,
    },
    logout_url: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('logout_url'),
      fullWidth: true,
    },
    security_salt: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('security_salt'),
      fullWidth: true,
    },
    bbb_room_url: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('bbb_room_url'),
      fullWidth: true,
    },
    bbb_api_url: {
      type: 'text',
      defaultValue: '',
      floatingLabelText: t1('bbb_api_url'),
      fullWidth: true,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'defaultxxx',
      fields: [
        'attendee_password',
        'moderator_password',
        'voice_bridge',
        'logout_url',
        'security_salt',
        'bbb_room_url',
        'bbb_api_url',
      ],
    },
  ];
};

export default { schema, ui };
