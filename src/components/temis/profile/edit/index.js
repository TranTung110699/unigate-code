import React from 'react';
import lodashGet from 'lodash.get';
import Form from './Form';
import Warning from 'components/common/Warning';

const TemisProfile = ({ match }) => {
  const handleFormSubmitSuccess = React.useCallback(() => {
    // simple hack so that api get domain will be called again with new user info
    window.location.reload();
  }, []);

  const id = lodashGet(match, 'params.id');

  return (
    <div>
      <Form userId={id} onSuccess={handleFormSubmitSuccess} />
    </div>
  );
};

export default TemisProfile;
