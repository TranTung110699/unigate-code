import { t1 } from 'translate';

const schema = (childrenFields = null) => ({
  name: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('name'),
    classWrapper: 'col-xs-8',
  },
  weight: {
    type: 'number',
    floatingLabelText: t1('weight'),
    classWrapper: 'col-xs-4',
    fullWidth: true,
  },
  children: {
    type: 'array',
    classWrapper: 'col-xs-12',
    schema: getSchema(childrenFields || ['name', 'weight']),
    floatingLabelText: t1('rubrics'),
  },
});

const getSchema = (fields = [], childrenFields = null) => ({
  schema: () => schema(childrenFields),
  ui: () => [
    {
      id: 'default',
      fields,
    },
  ],
});

export default (fields = [], childrenFields = null) =>
  getSchema(fields, childrenFields);
