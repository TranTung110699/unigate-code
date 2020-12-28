import React from 'react';
import schema from 'components/temis/evidence/schema/form';
import NodeNew from 'components/admin/node/new';
import lodashGet from 'lodash.get';

const Form = ({ evidence, readOnly, dialogKey, searchFormId }) => {
  return (
    <NodeNew
      ntype={'assessment_evidence'}
      node={evidence}
      schema={schema}
      readOnly={readOnly}
      mode="edit"
      formid={`update_evidence_${lodashGet(evidence, 'iid')}`}
      dialogKey={dialogKey}
      searchFormId={searchFormId}
    />
  );
};

export default Form;
