import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import pdsSchema from 'components/admin/pds/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, hiddenFields } = this.props;
    const title = this.props.title || t1('new_school');
    const formid = this.props.formid || 'new_school';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'category'}
          schema={pdsSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          hiddenFields={hiddenFields}
          alternativeApi={alternativeApi}
          formid={formid}
          searchFormId="school_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
