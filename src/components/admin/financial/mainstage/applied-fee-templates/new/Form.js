import React from 'react';
import NodeNew from 'components/admin/node/new';
import appliedFeeTemplate from 'components/admin/financial/mainstage/applied-fee-templates/schema/form';

const renderForm = (props) => {
  const formid = props.formid || 'new_applied_fee_template';
  return (
    <NodeNew
      {...props}
      ntype={'applied_fee_template'}
      schema={appliedFeeTemplate}
      formid={formid}
    />
  );
};

export default renderForm;
