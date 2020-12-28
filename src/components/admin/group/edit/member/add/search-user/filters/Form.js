import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';

class Form extends Component {
  render() {
    const { mode, step, node, hiddenFields } = this.props;
    const title = this.props.title || t2('new_syllabus');
    const formid = this.props.formid || 'new_syllabus';
    const hf = Object.assign({ max_depth: 2 }, hiddenFields);
    return (
      <NodeNew
        {...this.props}
        hiddenFields={hf}
        title={title}
        ntype={'syllabus'}
        mode={mode}
        step={step}
        node={node}
        closeModal
        formid={formid}
        searchFormId="syllabus_search"
      />
    );
  }
}

export default connect()(Form);
