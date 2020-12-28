import { t2 } from 'translate';
import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import assetSchema from 'components/admin/asset-manager/asset/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, params, requestSuccessful } = this.props;
    const title = this.props.title || t2('new_asset');
    const formid = this.props.formid || 'new_asset';

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'asset'}
          schema={assetSchema}
          mode={mode}
          step={step}
          requestSuccessful={requestSuccessful}
          // alternativeApi={this.props.alternativeApi}
          node={node}
          hiddenFields={params}
          closeModal
          searchFormId="asset_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
