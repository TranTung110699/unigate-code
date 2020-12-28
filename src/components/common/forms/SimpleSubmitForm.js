/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import Form from 'schema-form/Form';

// simply display a form and submit the data, and NOT going to care about the results returned from server
// data is NOT going to be attached to redux store or anything
// suitable in in system admin forms, for example sync tco info
class SimpleSubmitForm extends Component {
  handleSubmit = (data) => {
    const { onSubmit, formid, executeOnSuccess } = this.props;

    if (onSubmit) {
      const hiddenFields = this.props.hiddenFields || {};

      const params = this.props.params || {};
      const allParams = Object.assign({}, params, hiddenFields);
      onSubmit(data, allParams);
      return;
    }

    this.props.dispatch(
      sagaActions.submitFormRequest(formid, {
        params: data,
        url: this.props.alternativeApi,
        executeOnSuccess,
      }),
    );
  };

  render() {
    const {
      schema,
      alternativeApi,
      submitLabel,
      params,
      hiddenFields,
    } = this.props;
    const formid = this.props.formid || 'simple-submit-form';

    return (
      <Form
        schema={schema}
        alternativeApi={alternativeApi}
        formid={formid}
        onSubmit={this.handleSubmit}
        submitLabel={submitLabel}
        params={params}
        hiddenFields={hiddenFields}
      />
    );
  }
}

SimpleSubmitForm.propTypes = {
  schema: PropTypes.shape(), // required
  alternativeApi: PropTypes.string, // required
  formid: PropTypes.string, // required
  submitLabel: PropTypes.string, // required
  params: PropTypes.shape(),
  hiddenFields: PropTypes.shape(),
  executeOnSuccess: PropTypes.func,
};

export default connect()(SimpleSubmitForm);
