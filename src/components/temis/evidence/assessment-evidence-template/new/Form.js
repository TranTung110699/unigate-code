import React from 'react';
import NodeNew from 'components/admin/node/new';
import schema from '../schema/form';

const Form = ({
  mode,
  step,
  node,
  params,
  dialogKey,
  formid = 'new_assessment_evidence_template',
}) => {
  return (
    <NodeNew
      ntype={'assessment_evidence_template'}
      schema={schema}
      mode={mode}
      step={step}
      node={node}
      closeModal
      dialogKey={dialogKey}
      formid={formid}
      searchFormId="assessment_evidence_template_search"
      params={params}
    />
  );
};

export default Form;
