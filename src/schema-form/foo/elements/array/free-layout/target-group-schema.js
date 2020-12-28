import TargetGroupLayoutFreestyle from './target-group-layout-freestyle';

const schema = (formid, values) => ({
  type: {
    type: 'text',
    defaultValue: 1,
    floatingLabelText: 'enter type',
  },
  target: {
    type: 'text',
    floatingLabelText: 'enter name target',
  },
});

const ui = (step, values) => [
  {
    id: 'id',
    fields: ['type', 'target'],
  },
];

const layout = { component: TargetGroupLayoutFreestyle, freestyle: 1 };

export default { schema, ui, layout };
