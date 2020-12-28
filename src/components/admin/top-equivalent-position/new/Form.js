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

  return (
    <div>
      <NodeNew
        schema={schema}
        mode={mode}
        step={step}
        node={node}
        closeModal
        alternativeApi={alternativeApi}
        formid={formid || 'new_equivalent'}
        searchFormId={searchFormId || 'top_equivalent_position_search'}
        params={params}
      />
    </div>
  );
};

export default Form;
