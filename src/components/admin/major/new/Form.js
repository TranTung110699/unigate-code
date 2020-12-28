import React from 'react';
import NodeNew from 'components/admin/node/new';
import major from 'components/admin/major/schema/form';

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
        ntype={'major'}
        schema={schema || major}
        mode={mode}
        step={step}
        node={node}
        closeModal
        alternativeApi={alternativeApi}
        formid={formid || 'new_major'}
        searchFormId={searchFormId || 'major_search'}
        params={params}
      />
    </div>
  );
};

export default Form;
