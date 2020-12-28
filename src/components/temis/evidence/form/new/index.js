import React from 'react';
import schema from 'components/temis/evidence/schema/form';
import NodeNew from 'components/admin/node/new';
import fetchData from 'components/common/fetchData';
import temisApiUrls from 'components/temis/endpoints';
import { connect } from 'react-redux';
import { change } from 'redux-form';

const NewForm = ({
  readOnly,
  dialogKey,
  searchFormId,
  dispatch,
  codeToCreate,
  formid,
  hiddenFields,
  step,
  requestSuccessful,
}) => {
  React.useEffect(
    () => {
      dispatch(change(formid, 'non_unique_code', codeToCreate));
    },
    [formid, dispatch, codeToCreate],
  );

  return (
    <NodeNew
      ntype={'assessment_evidence'}
      schema={schema}
      readOnly={readOnly}
      formid={formid}
      dialogKey={dialogKey}
      hiddenFields={{
        ...(hiddenFields || {}),
        codeToCreate,
      }}
      searchFormId={searchFormId}
      step={step}
      requestSuccessful={requestSuccessful}
    />
  );
};

export default fetchData((props) => {
  return {
    baseUrl: temisApiUrls.get_evidence_code_to_create,
    propKey: 'codeToCreate',
  };
})(connect()(NewForm));
