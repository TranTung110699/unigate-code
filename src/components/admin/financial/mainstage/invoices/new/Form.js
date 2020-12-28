import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import invoice from 'components/admin/financial/mainstage/invoices/schema/form';

class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      hideSubmitButton,
      submitButton,
      requestSuccessful,
      params,
      searchFormId,
    } = this.props;
    const formid = this.props.formid || 'new_invoice';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          ntype="invoice"
          schema={invoice}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId={searchFormId || 'invoice_search'}
          alternativeApi={alternativeApi}
          hideSubmitButton={hideSubmitButton}
          requestSuccessful={requestSuccessful}
          submitButton={submitButton}
          params={params}
        />
      </div>
    );
  }
}

export default connect()(Form);
