import React, { Component } from 'react';
import Form from 'schema-form/Form';
import adminSagaActions from 'actions/node/saga-creators';
import store from 'store';
import schema from './bug-send-mail-form-schema';

class MailDebug extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    store.dispatch(
      adminSagaActions.submitFormRequest('', {
        extraParams: data,
        url: '/site/dev/test-send-mail',
      }),
    );
  }

  render() {
    const submitLabels = {
      submitting: 'submitting',
      default: 'submit',
    };

    return (
      <div>
        <h3>Debug Sen Mail</h3>
        <Form
          schema={schema}
          onSubmit={this.handleSubmit}
          formid="debugSendMail"
          submitLabels={submitLabels}
          mode="new"
        />
      </div>
    );
  }
}

export default MailDebug;
