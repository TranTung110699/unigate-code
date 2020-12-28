import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import examTemplateApiUrls from 'components/admin/exam-template/endpoints';
import Schema from '../schema/form';

export const newExamTemplateFormId = 'new_exam_template';

class Form extends Component {
  render() {
    const { mode, step, node, searchFormId, title } = this.props;
    let { alternativeApi, hiddenFields } = this.props;
    alternativeApi = alternativeApi || examTemplateApiUrls.new_exam_template;
    hiddenFields = hiddenFields || {};
    const formid = this.props.formid || newExamTemplateFormId;
    return (
      <div>
        <NodeNew
          title={title}
          alternativeApi={alternativeApi}
          hiddenFields={hiddenFields}
          schema={Schema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId={searchFormId}
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
