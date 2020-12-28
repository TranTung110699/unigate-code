import elementSchema from './elementSchema';

const schema = (formid, values) => {
  const fields = Object.keys(values);

  const menu = {};
  if (fields) {
    fields.forEach((field) => {
      menu[field] = {
        type: 'array',
        schema: elementSchema,
        floatingLabelText: field,
        hiddenAddButton: true,
        hiddenRemoveButton: true,
      };
    });
  }
  return menu;
};

const ui = (step, values) => {
  const config = {
    edit_enable_widget_elements: [
      {
        id: 'default',
        fields: Object.keys(values),
      },
    ],
  };
  return config[step];
};

const layout = {
  edit: '',
};
const finalProcessBeforeSubmit = (fullData, node, schema, mode, step) => {
  if (mode === 'edit' && step === 'enable_widget_elements') {
    return { widget: { elements: fullData } };
  }
  return fullData;
};

export default { schema, ui, layout, finalProcessBeforeSubmit };
