import React from 'react';
import getLodash from 'lodash.get';

const searchFormDetailFreestyle = ({ groups }) => (
  <div className="row">
    <div className="col-md-12">
      {getLodash(groups, 'default.fieldNames.fee_collecting_phase')}
    </div>
    <div className="col-md-12">
      {getLodash(groups, 'default.fieldNames.status')}
    </div>
  </div>
);

export default searchFormDetailFreestyle;
