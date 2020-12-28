import React, { Component } from 'react';
import Form from 'schema-form/Form';
import { t1 } from 'translate';
import store from 'store';
import adminSagaActions from 'actions/admin/saga-creators';
import loginAs from './login-as-form-schema';

class LoginAs extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    // console.log({data});
    const payload = {
      user: data.iid,
      apiUrl: '/user/login-as',
      method: 'POST',
      closeModal: true,
    };

    // console.log(adminSagaActions.loginAs(payload));
    store.dispatch(adminSagaActions.loginAs(payload));
  }

  render() {
    const submitLabels = {
      submitting: t1('logging in ...'),
      default: t1('login'),
    };

    return (
      <div>
        <h3>{t1('login_as_user')}</h3>
        <Form
          schema={loginAs}
          onSubmit={this.handleSubmit}
          formid="loginAs"
          alternativeApi="/user/login-as"
          submitLabels={submitLabels}
          mode="new"
        />
      </div>
    );
  }
}

export default LoginAs;
