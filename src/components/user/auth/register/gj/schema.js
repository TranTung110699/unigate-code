import { lname } from 'components/admin/user/schema/elements';
import { t1 } from 'translate';
import { isEmail, isPhoneNumber, required } from 'common/validators';
import FormFreeStyle from './FormFreeStyle';
import { slugifier } from 'common/normalizers';

const newAccount = (formid, values, props) => {
  const fields = {
    name: {
      type: 'text',
      hintText: t1('type_your_name'),
      floatingLabelText: `${t1('full_name')} *`,
      defaultValue: '',
      errorText: '',
      validate: [required(t1('name_cannot_be_empty'))],
    },
    mail: {
      type: 'text',
      floatingLabelText: `${t1('email')} *`,
      hintText: t1('type_your_email'),
      validate: [
        required(t1('email_cannot_be_empty')),
        isEmail(t1('this_is_not_a_valid_email')),
      ],
      defaultValue: '',
      errorText: '',
    },

    phone: {
      type: 'text',
      floatingLabelText: `${t1('phone')} *`,
      hintText: t1('type_your_phone_number'),
      defaultValue: '',
      errorText: '',
      validate: [
        required(t1('phone_cannot_be_empty')),
        isPhoneNumber(t1('invalid_phone_number')),
      ],
    },
    lname: {
      type: 'text',
      normalize: slugifier,
      hintText: t1('type_your_username'),
      floatingLabelText: `${t1('login_name')} *`,
      validate: [required(t1('login_name_cannot_be_empty'))],
    },
    pass: {
      type: 'password',
      hintText: t1('type_your_password'),
      floatingLabelText: `${t1('password')} *`,
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1('password_cannot_be_empty'))],
    },
    pass_retype: {
      type: 'password',
      hintText: t1('type_your_password_again'),
      floatingLabelText: `${t1('password_again')} *`,
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1('password_again_cannot_be_empty'))],
    },
  };

  return fields;
};

const schema = (formid, values, step, xpath, props) => {
  return newAccount(formid, values, props);
};

const ui = () => {
  return [
    {
      id: 'id',
      fields: ['lname', 'pass', 'pass_retype', 'phone'],
    },
  ];
};
const validate = (values) => {
  if (!values.pass_retype)
    return {
      pass_retype: t1('password_retyping_is_required'),
    };
  if (values.pass !== values.pass_retype) {
    return {
      pass_retype: t1('the_password_not_match'),
    };
  }
  return undefined;
};

const finalProcessBeforeSubmit = (fullData) => {
  fullData.name = fullData.lname;

  return fullData;
};

export default {
  schema,
  ui,
  layout: {
    component: FormFreeStyle,
    freestyle: 1,
  },
  validate,
  finalProcessBeforeSubmit,
};
