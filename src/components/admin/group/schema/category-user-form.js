import { t1 } from 'translate';
import degreeInfoSchema from './degree-info-form';
import RTE from 'schema-form/elements/richtext';

const schema = () => ({
  note: {
    type: RTE,
    classWrapper: 'col-md-12',
    hintText: t1('enter_note'),
    floatingLabelText: t1('note'),
    defaultValue: '',
    errorText: '',
    multiLine: true,
    rows: 4,
    fullWidth: true,
  },
  degree_info: {
    type: 'section',
    schema: degreeInfoSchema,
  },
});

const ui = (step) => {
  const configs = {
    edit_note: [
      {
        id: 'edit_note',
        title: t1('edit_note'),
        fields: ['note'],
      },
    ],
    edit_degree_info: [
      {
        id: 'edit_degree_info',
        title: t1('edit_degree_info'),
        fields: ['degree_info'],
      },
    ],
  };

  return configs[step];
};

export default { schema, ui };
