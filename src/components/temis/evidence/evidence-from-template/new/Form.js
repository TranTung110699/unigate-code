import React from 'react';
import NewForm from 'components/temis/evidence/form/new';
import lodashGet from 'lodash.get';

const Form = ({ template, readOnly, dialogKey, searchFormId }) => {
  const templateIid = lodashGet(template, 'iid');

  return (
    <NewForm
      hiddenFields={{
        template_iid: templateIid,
      }}
      step="with_template"
      readOnly={readOnly}
      formid={`new_evidence_from_template_${templateIid}`}
      dialogKey={dialogKey}
      searchFormId={searchFormId}
    />
  );
};

export default Form;
