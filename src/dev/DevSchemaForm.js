import React, { Component } from 'react';
// import Form from 'schema-form/Form';
import Form from 'components/admin/node/new/index';

import foo from 'schema-form/foo/schema';
import { change, submit } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';

const formid = 'syllabus_new';

class DevSchemaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preSubmitError: false,
    };
  }

  preSubmitErrorCallback = (/*formid, preSubmitPost, data*/) => {
    this.setState({ preSubmitError: true });
  };

  submitForm = () => {
    const { dispatch } = this.props;
    dispatch(change(formid, '__resolved__', 1));
    setTimeout(() => {
      dispatch(submit(formid));
      this.setState({ preSubmitError: false });
    }, 10);
  };

  render() {
    const params = { a: 1 };

    return (
      <div>
        {this.state.preSubmitError && (
          <div>
            <div style={{ color: 'red' }}>Error submitting.</div>
            <div>
              <RaisedButton
                primary
                onClick={this.submitForm}
                label={'OK. Submit it!!'}
              />
            </div>
          </div>
        )}

        <Form
          schema={foo}
          params={params}
          ntype="syllabus"
          mode="new"
          formid={formid}
          preSubmitUrl="/dev/schema-form/presubmit"
          alternativeApi="/dev/schema-form/new"
          preSubmitErrorCallback={this.preSubmitErrorCallback}
        />
      </div>
    );
  }
}

export default connect()(DevSchemaForm);
