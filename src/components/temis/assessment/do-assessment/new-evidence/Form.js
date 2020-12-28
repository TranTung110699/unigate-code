import React from 'react';
import NewForm from 'components/temis/evidence/form/new';
import lodashGet from 'lodash.get';

const Form = ({
  readOnly,
  dialogKey,
  searchFormId,
  assessmentRubricIid,
  tieuChuanIid,
  tieuChiIid,
  onNewEvidence,
}) => {
  return (
    <NewForm
      hiddenFields={{
        assessmentRubricIid,
        tieuChuanIid,
        tieuChiIid,
      }}
      step="do_assessment"
      readOnly={readOnly}
      formid={`new_evidence_when_do_assessment_${assessmentRubricIid}_${tieuChuanIid}_${tieuChiIid}`}
      dialogKey={dialogKey}
      searchFormId={searchFormId}
      requestSuccessful={(post) => onNewEvidence(lodashGet(post, 'result'))}
    />
  );
};

export default Form;
