import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { required } from 'common/validators';
import layoutEditPrerequisitesFreeStyle from './layout-edit-prerequisites-free-style';

const schema = (formid, values) => ({
  item: {
    type: 'hidden',
  },
  type: {
    type: 'select',
    fullWidth: true,
    hintText: t1('type_condition'),
    options: [
      {
        value: 'by_score',
        primaryText: t1('score_passed'),
      },
      {
        value: 'pass_only',
        primaryText: t1('pass_only'),
      },
    ],
    validate: [required(t1('condition_type_cannot_be_empty'))],
    classWrapper: 'col-md-12',
  },
  max: {
    type: 'text',
  },
  min: {
    type: 'text',
    validate: [required(t1('min_score_cannot_be_empty'))],
  },
});

const ui = (step, values, themeConfig, xpath) => {
  const { score_scale } = values;
  const { type } = lodashGet(values, xpath, {});

  let fields = ['item', 'type'];

  if (type === 'by_score' && ['0_4', '0_10', '0_100'].includes(score_scale)) {
    fields = fields.concat(['min', 'max']);
  } else if (type === 'by_score') {
    fields = fields.concat(['min']);
  }

  return [
    {
      id: 'default',
      fields,
    },
  ];
};

const layout = () => ({
  component: layoutEditPrerequisitesFreeStyle,
  freestyle: 1,
});

export default { schema, ui, layout };
