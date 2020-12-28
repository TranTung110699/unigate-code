import { t2 } from 'translate';
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import categorySchema from '../schema/form';

class Form extends Component {
  render() {
    const {
      mode,
      step,
      node,
      params,
      requestSuccessful,
      alternativeApi,
    } = this.props;
    const title = this.props.title || t2('new_asset_category');
    const formid = this.props.formid || 'new_asset_category';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'asset_category'}
          schema={categorySchema}
          mode={mode}
          step={step}
          requestSuccessful={requestSuccessful}
          alternativeApi={alternativeApi}
          node={node}
          hiddenFields={params}
          closeModal
          searchFormId="asset_category_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
