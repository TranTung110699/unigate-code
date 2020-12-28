/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import NodeNew from 'components/admin/node/new';

const Form = (props) => {
  const {
    mode,
    step,
    node,
    params,
    searchFormId,
    alternativeApi,
    formid,
    schema,
  } = props;

  const hiddenFields = { notRequiredOrganization: 1 };

  if (node && node.iid) {
    hiddenFields.top_equivalent_position_iid = node.iid;
  }

  return (
    <div>
      <NodeNew
        resetForm
        schema={schema}
        mode={mode}
        step={step}
        node={node}
        closeModal
        alternativeApi={alternativeApi}
        formid={formid || 'set_equivalent_position'}
        searchFormId={searchFormId || 'top_equivalent_position_search'}
        params={params}
        hiddenFields={hiddenFields}
      />
    </div>
  );
};

export default Form;
