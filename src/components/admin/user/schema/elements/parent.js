import { t1 } from 'translate/index';
import { isEmail, required } from 'common/validators';

const name = {
  type: 'text',
  floatingLabelText: `${t1('the_name_of_parent')} (*)`,
  floatingLabelFixed: t1('the_name_of_parent'),
  validate: required(t1('parent_name_cant_be_empty')),
};

const phone = {
  type: 'text',
  floatingLabelText: `${t1('the_phone_of_parent')} (*)`,
  floatingLabelFixed: t1('the_phone_of_parent'),
  validate: required(t1('parent_phone_cant_be_empty')),
};

const mail = {
  type: 'text',
  floatingLabelText: `${t1('the_email_of_parent')} (*)`,
  floatingLabelFixed: t1('the_email_of_parent'),
  validate: [
    required(t1('email_cannot_be_empty')),
    isEmail(t1('this_is_not_a_valid_email')),
  ],
};

const schema = (formid, values, step, xpath) => {
  return {
    name,
    phone,
    mail,
  };
};

const ui = (step, values) => {
  return [
    {
      title: t1('parent_information'),
      fields: ['name', 'phone', 'mail'],
      id: 'g2',
    },
  ];
};

const x = {
  schema,
  ui,
  // layout,
};

export default x;
