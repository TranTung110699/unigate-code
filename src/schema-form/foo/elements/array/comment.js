// contains a list of sample fields
// const fields = ['name'];
import { change } from 'redux-form';
import store from 'store/index';
import { extractCurrentIndexFromXpath } from 'common/utils/form';
import votersSchema from './nested-array/voters';

const severities = [
  {
    value: 'minor',
    label: 'minor',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'severe',
    label: 'severe',
  },
];

const onRadioChange = (formid, value, xpath) => {
  const index = extractCurrentIndexFromXpath(xpath);
  store.dispatch(change(formid, `${xpath}.comment`, `${value} index=${index}`));
};

const schema = (formid, values, step, xpath) => ({
  severity: {
    type: 'radio',
    hintText: `comment type. xpath is: ${xpath}`,
    floatingLabelText: 'comment type',
    defaultValue: 'minor',
    options: severities,
    onChange: (ev, value) => {
      onRadioChange(formid, value, xpath);
    },
  },
  comment: {
    type: 'text',
    hintText: 'value derived from radio above',
  },
  voters: {
    type: 'array',
    schema: votersSchema,
  },
});

const ui = (step, values) => [
  {
    fields: ['severity', 'comment', 'voters'],
    id: 'g2',
  },
];

const comment = {
  schema,
  ui,
  // layout,
};

export default comment;
