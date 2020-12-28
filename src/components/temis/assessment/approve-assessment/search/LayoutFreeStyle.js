import React from 'react';
import get from 'lodash.get';
import withTemisConfig from 'common/hoc/withTemisConfig';
import { leaderPositions } from 'configs/constants/user';

const LayoutFreeStyle = (props) => {
  const fieldNames = get(props, 'groups.id.fieldNames') || {};
  const userRoot = get(props, 'userRoot');

  if (get(userRoot, 'leader_position') === leaderPositions.TEACHER) {
    return (
      <div>
        <div className="row display-none">
          <div className="col-md-5">{fieldNames.user_organizations}</div>
          <div className="col-md-3 m-t-35">
            {fieldNames.include_sub_organizations}
          </div>
          <div className="col-md-4">{fieldNames.status_approve}</div>
        </div>
        <div className="row">
          <div className="col-md-5">{fieldNames.text}</div>
          <div className="col-md-5">{fieldNames.status_approve}</div>
          <div className="col-md-2 text-center m-t-10">
            {get(props, 'submitButton')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-5">{fieldNames.user_organizations}</div>
        <div className="col-md-3 m-t-35">
          {fieldNames.include_sub_organizations}
        </div>
        <div className="col-md-4">{fieldNames.status_approve}</div>
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

export default withTemisConfig(LayoutFreeStyle);
