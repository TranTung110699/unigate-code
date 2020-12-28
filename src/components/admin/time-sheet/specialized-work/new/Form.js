import React from 'react';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/time-sheet/schema/form';
import lodashGet from 'lodash.get';

const NewTimeSheetForm = ({
  formid,
  alternativeApi,
  mode,
  step,
  node,
  params,
  searchFormId,
  type,
  requestSuccessful,
}) => {
  formid = formid || `${mode}_${step}_time_sheet_${node && node.id}`;

  let hiddenFields;
  if (type) {
    hiddenFields = Object.assign({}, hiddenFields, {
      type,
    });
  }

  return (
    <NodeNew
      ntype={'time_sheet'}
      schema={schema}
      mode={mode}
      step={step}
      node={
        node && {
          ...node,
          contract_iid: lodashGet(node, 'contract.iid'),
        }
      }
      closeModal
      hiddenFields={hiddenFields}
      alternativeApi={alternativeApi}
      formid={formid}
      searchFormId={searchFormId}
      params={params}
      requestSuccessful={requestSuccessful}
    />
  );
};

export default NewTimeSheetForm;
