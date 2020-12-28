import React from 'react';
import get from 'lodash.get';
import { isHieuTruong } from 'components/admin/user/utils';
import withTemisConfig from 'common/hoc/withTemisConfig';

const OverviewLayoutFreeStyle = (props) => {
  const fieldNames = get(props, 'groups.id.fieldNames') || {};
  const userRoot = get(props, 'userRoot');

  return (
    <div>
      <div className="row">
        <div className="col-md-12">{fieldNames.text}</div>
        <div
          className={`col-md-9 ${isHieuTruong(userRoot) ? 'display-none' : ''}`}
        >
          {fieldNames.user_organizations}
        </div>
        <div
          className={`col-md-3 m-t-35 ${
            isHieuTruong(userRoot) ? 'display-none' : ''
          }`}
        >
          {fieldNames.include_sub_organizations}
        </div>
        {!!fieldNames.type_of_assessment && (
          <div
            className={`col-md-5 ${
              isHieuTruong(userRoot) ? 'display-none' : ''
            }`}
          >
            {fieldNames.type_of_assessment}
          </div>
        )}
        <div className="col-md-7">{fieldNames.status_of_assessment}</div>
        <div className="col-md-12 text-center">
          {get(props, 'submitButton')}
        </div>
      </div>
    </div>
  );
};

export default withTemisConfig(OverviewLayoutFreeStyle);
