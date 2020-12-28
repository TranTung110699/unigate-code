import React from 'react';
import schema from 'components/temis/evidence/assessment-evidence-template/schema/form';
import NodeNew from 'components/admin/node/new';
import lodashGet from 'lodash.get';

const Form = ({ evidenceTemplate, readOnly, dialogKey, searchFormId }) => {
  return (
    <NodeNew
      ntype={'assessment_evidence_template'}
      node={evidenceTemplate}
      schema={schema}
      readOnly={readOnly}
      mode="edit"
      formid={`update_evidence_template_${lodashGet(evidenceTemplate, 'iid')}`}
      dialogKey={dialogKey}
      searchFormId={searchFormId}
    />
  );
};

export default Form;
