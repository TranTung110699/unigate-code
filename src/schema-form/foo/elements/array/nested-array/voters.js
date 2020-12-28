import { change } from 'redux-form';
import store from 'store/index';
import { extractCurrentIndexFromXpath } from 'common/utils/form';

const votes = [
  {
    value: 'like',
    label: 'like',
  },
  {
    value: 'dislike',
    label: 'dislike',
  },
  {
    value: 'neutral',
    label: 'neutral',
  },
];

const onRadioChange = (formid, value, xpath) => {
  const index = extractCurrentIndexFromXpath(xpath);
  store.dispatch(change(formid, `${xpath}.voter`, `${value} index=${index}`));
};

const schema = (formid, values, step, xpath) => ({
  vote: {
    type: 'radio',
    hintText: 'voter type. xpath is: ' + xpath,
    floatingLabelText: 'voter type',
    defaultValue: 'minor',
    options: votes,
    onChange: (ev, value) => {
      onRadioChange(formid, value, xpath);
    },
  },
  voter: {
    type: 'text',
    hintText: 'value derived from radio above',
  },
});

const ui = (step, values) => {
  return [
    {
      fields: ['vote', 'voter'],
      id: 'g2',
    },
  ];
};

const voter = {
  schema,
  ui,
  // layout,
};

export default voter;
