import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import feeCategory from 'components/admin/financial/mainstage/fee-categories/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, params } = this.props;
    const formid = this.props.formid || 'new_fee_category';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          ntype={'fee_category'}
          schema={feeCategory}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
          searchFormId="fee_category_search"
          alternativeApi={alternativeApi}
          params={params}
        />
      </div>
    );
  }
}

export default connect()(Form);
