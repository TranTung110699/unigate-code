import React from 'react';
import NodeNew from 'components/admin/node/new';
import userMajorSchema from 'components/admin/user_major/schema/form';
import { reqTypes } from 'configs/constants';

const Form = () => {
  const hiddenFields = {
    type: [reqTypes.REGISTRATION_MAJOR],
    admin: 1,
  };
  return (
    <NodeNew
      ntype="user_major"
      mode="new"
      step={reqTypes.REGISTRATION_MAJOR}
      schema={userMajorSchema}
      formid={`admin_request_${reqTypes.REGISTRATION_MAJOR}`}
      hiddenFields={hiddenFields}
    />
  );
};

export default Form;
