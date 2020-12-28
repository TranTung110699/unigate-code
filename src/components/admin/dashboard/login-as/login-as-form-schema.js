// import Store from 'store';
import { t1 } from 'translate';
import { required } from 'common/validators';

const schema = (formid, values) => ({
  iid: {
    type: 'text',
    hintText: t1('user'),
    floatingLabelText: t1('user_iid_or_email_or_login_name'),
    defaultValue: '',
    errorText: '',
    fullWidth: true,
    validate: required(),
    // onChange: (ev, val) => { store.dispatch(change(formid, 'loginAs', `${params.loginAs} ${val}`)) },
  },
});

const ui = {
  new: [
    {
      fields: ['iid'],
    },
  ],
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
