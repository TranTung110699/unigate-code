import React from 'react';
import UpdateForm from '../../new/Form';
import lodashGet from 'lodash.get';
import apiUrls from '../../endpoints';

function EditInfo({ className, node }) {
  return (
    <div className={className}>
      <UpdateForm
        mode="edit"
        node={node}
        formid={`edit_sale_package_${lodashGet(node, 'iid')}`}
        alternativeApi={apiUrls.updatePackage}
      />
    </div>
  );
}

export default EditInfo;
