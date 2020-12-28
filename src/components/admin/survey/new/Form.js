import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { surveyTargetTypes } from 'configs/constants/survey';
import schema from '../schema/form';

const renderForm = ({
  mode,
  step,
  node,
  dialogKey,
  alternativeApi,
  formid,
  searchFormId,
  params = {},
  isSIS,
}) => {
  const hiddenFields = isSIS
    ? {
        survey_target_type: surveyTargetTypes.SEMESTER,
      }
    : {};

  return (
    <NodeNew
      ntype="survey"
      isSIS={isSIS}
      schema={schema}
      hiddenFields={hiddenFields}
      mode={mode}
      step={step}
      node={node}
      closeModal
      dialogKey={dialogKey}
      alternativeApi={alternativeApi}
      formid={formid || 'new_survey'}
      searchFormId={searchFormId}
      params={params || {}}
    />
  );
};

export default withSchoolConfigs(renderForm);
