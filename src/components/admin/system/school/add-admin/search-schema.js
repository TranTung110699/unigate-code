const schema = () => {
  return {
    q: {
      type: 'text',
      floatingLabelText: 'iid or name or email',
      floatingLabelFixed: false,
    },
  };
};

const ui = () => {
  return [
    {
      id: 'default',
      fields: ['q'],
    },
  ];
};

export default { schema, ui };
