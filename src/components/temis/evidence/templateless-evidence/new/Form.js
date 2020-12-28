import React from 'react';
import NewForm from 'components/temis/evidence/form/new';

const Form = ({ readOnly, dialogKey, searchFormId }) => {
  return (
    <NewForm
      readOnly={readOnly}
      formid={`new_templateless_evidence`}
      dialogKey={dialogKey}
      searchFormId={searchFormId}
    />
  );
};

export default Form;
