// const fields = ['name'];
import { t1 } from 'translate';

const schema = (formid, values) => ({
  msg: {
    type: 'text',
    hintText: t1('say_something'),
    floatingLabelText: t1('say_something'),
    defaultValue: t1('hi'),
    errorText: '',
    // validate: [required('name cannot be empty')],
  },
  u: {
    type: 'text',
    hintText: t1('user_name'),
    floatingLabelText: t1('username'),
    defaultValue: t1('php_form'),
    errorText: '',
  },
  n: {
    type: 'text',
    hintText: t1('a_number'),
    floatingLabelText: t1(
      'give_me_a_number._i_will_calc_the_fibonacci_of_that',
    ),
    defaultValue: '10',
    errorText: '',
  },
});

const ui = (step, values) => {
  const group2 = ['msg', 'u', 'n'];

  const config = {
    // step == ''
    new: [
      {
        fields: group2,
        id: 'g2',
        title: t1('a_simple_chat_application'),
      },
    ],
  };

  return config[step];
};

// const layout = {
//   new: 'xxx',
// };

const chat = {
  schema,
  ui,
  // layout,
};

export default chat;
