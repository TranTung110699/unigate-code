import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import endpoints from 'api-endpoints';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import schema from './schema';

class Form extends Component {
  render() {
    const { mode, step, node, hiddenFields } = this.props;
    const title = this.props.title || t2('new_syllabus_from_template');
    const formid = this.props.formid || 'new_syllabus_from_template';
    const hf = Object.assign({ max_depth: 2 }, hiddenFields);
    return (
      <NodeNew
        {...this.props}
        hiddenFields={hf}
        ntype={'syllabus'}
        schema={schema}
        mode={mode}
        step={step}
        node={node}
        alternativeApi={endpoints.generate_syllabus_from_template}
        closeModal
        formid={formid}
        searchFormId="syllabus_search"
      />
    );
  }
}

export default connect()(Form);
