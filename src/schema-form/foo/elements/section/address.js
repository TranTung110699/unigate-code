// contains a list of sample fields
// const fields = ['name'];
import { change } from 'redux-form';
import store from 'store/index';
// import syllabus from 'components/admin/syllabus/schema/form';
// import address from './address';
// import get from 'lodash.get';

const fruits = [
  {
    value: 'apple',
    label: 'Apple (pre-selected)',
  },
  {
    value: 'orange',
    label: 'Orange',
  },
  {
    value: 'lemon',
    label: 'Lemon',
  },
];

const onRadioChange = (formid, value, xpath) => {
  // console.log(xpath);
  store.dispatch(
    change(
      formid,
      `${xpath}.derived_fruit_text_field`,
      value + '... derived....',
    ),
  );
};

const schema = (formid, values, step, xpath) => {
  return {
    favorite_fruit: {
      type: 'radio',
      hintText: `favorite_fruit: radio button, you are inside xpath ${xpath}`,
      floatingLabelText: 'choose a fruit radio',
      defaultValue: 'apple',
      options: fruits,
      onChange: (ev, value) => {
        onRadioChange(formid, value, xpath);
      },
    },
    derived_fruit_text_field: {
      type: 'text',
      hintText: 'value derived from radio above',
    },
  };
};

const ui = (step, values) => {
  return [
    {
      fields: ['favorite_fruit', 'derived_fruit_text_field'],
      id: 'g2',
    },
  ];
};

const fooAddress = {
  schema,
  ui,
  // layout,
};

export default fooAddress;
