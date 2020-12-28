import React from 'react';
import NodeNew from 'components/admin/node/new';
import schema from 'components/temis/evidence/schema/content';

const Form = ({ content, readOnly }) => {
  return <NodeNew node={content} schema={schema} readOnly={readOnly} />;
};

export default Form;
