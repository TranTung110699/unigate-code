import React from 'react';
import Icon from 'components/common/Icon';
import lodashGet from 'lodash.get';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';
import SessionsTable from 'components/admin/session/search/Layout';

const FrontendIltBBB = () => {
  return (
    <div className="container-fluid m-t-30">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2>{t1('offline_sessions')}</h2>
          <SessionsTable isStudent={true} />
        </div>
      </div>
    </div>
  );
};

export default FrontendIltBBB;
