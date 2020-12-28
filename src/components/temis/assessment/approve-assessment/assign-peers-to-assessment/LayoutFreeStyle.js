import React from 'react';
import get from 'lodash.get';

const LayoutFreeStyle = (props) => {
  const fieldNames = get(props, 'groups.id.fieldNames') || {};

  return (
    <div>
      <div className="row">
        <div className="col-md-5">{fieldNames.user_organizations}</div>
        <div className="col-md-3 m-t-35">
          {fieldNames.include_sub_organizations}
        </div>
        <div className="col-md-4">{fieldNames.leader_position}</div>
      </div>
      <div className="row">
        <div className="col-md-9">{fieldNames.text}</div>
        <div className="col-md-3 text-center m-t-10">
          {get(props, 'submitButton')}
        </div>
      </div>
    </div>
  );
};

export default LayoutFreeStyle;
