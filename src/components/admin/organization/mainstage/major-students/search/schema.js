/* eslint-disable jsx-a11y/anchor-is-valid */
import { t1 } from 'translate';
import getMajorBoxSchema from 'components/admin/user/schema/form-of-training/schema';

const schema = (formid, values, props, organization) => ({
  major: {
    type: 'cascade',
    schema: getMajorBoxSchema({
      floatingLabelText: t1('applicable_for_major'),
      displayFields: ['major', 'training_mode', 'training_level', 'ico'],
      notValidate: true,
      forSearch: true,
      organization,
    }),
  },
  text: {
    type: 'text',
    fullWidth: true,
    floatingLabelText: t1('search_students'),
    label: t1('search_students'),
    hintText: t1('please_enter_search_text'),
    floatingLabelFixed: false,
  },
});

const ui = () => [
  {
    id: 'default',
    wrapperClass: 'col-md-12',
    fields: ['major', 'text'],
  },
];

export default (node) => ({
  schema: (formid, values, step, xpath, props) =>
    schema(formid, values, props, node),
  ui,
});
