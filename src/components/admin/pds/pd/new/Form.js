import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import category from 'components/admin/pds/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, hiddenFields } = this.props;
    const title = this.props.title || t1('new_province/district');
    const formid = this.props.formid || 'new_province_district';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          hiddenFields={hiddenFields}
          title={title}
          ntype={'category'}
          schema={category}
          mode={mode}
          step={step}
          node={node}
          closeModal
          alternativeApi={alternativeApi}
          formid={formid}
          searchFormId="province_district_search"
        />
      </div>
    );
  }
}

export default connect()(Form);
