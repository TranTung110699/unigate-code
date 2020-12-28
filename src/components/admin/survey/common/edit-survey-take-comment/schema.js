import RTE from 'schema-form/elements/richtext';

export default {
  schema: (formid, values) => ({
    comment: {
      type: RTE,
      fullWidth: true,
    },
  }),
  ui: () => [
    {
      id: 'default',
      fields: ['comment'],
    },
  ],
};
