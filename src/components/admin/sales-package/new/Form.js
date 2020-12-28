import React from 'react';
import NodeNew from '../../node/new';
import schema from './schema';
import { packageStatus } from 'configs/constants/sales-package';

function Form({ mode, step, node, dialogKey, formid, alternativeApi }) {
  const hiddenFields =
    mode === 'new'
      ? {
          hiddenFields: {
            status: packageStatus.created,
          },
        }
      : {};

  return (
    <NodeNew
      schema={schema}
      mode={mode}
      step={step}
      node={node}
      closeModal={!!dialogKey}
      alternativeApi={alternativeApi}
      searchFormId="sales_package_search"
      formid={formid}
      dialogKey={dialogKey}
      {...hiddenFields}
    />
  );
}

export default Form;
