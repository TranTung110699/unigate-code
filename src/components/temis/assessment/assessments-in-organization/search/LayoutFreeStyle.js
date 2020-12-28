import React from 'react';
import get from 'lodash.get';
import { isHieuTruong } from 'components/admin/user/utils';
import withTemisConfig from 'common/hoc/withTemisConfig';

const LayoutFreeStyle = (props) => {
  const fieldNames = get(props, 'groups.id.fieldNames') || {};
  const userRoot = get(props, 'userRoot');

  return (
    <div>
      <div className={isHieuTruong(userRoot) ? 'display-none' : 'row'}>
        <div className="col-md-9">{fieldNames.user_organizations}</div>
        <div className="col-md-3 m-t-35">
          {fieldNames.include_sub_organizations}
        </div>
      </div>
      <div className="row">
        {!!fieldNames.type_of_assessment && (
          <div className={isHieuTruong(userRoot) ? 'display-none' : 'col-md-4'}>
            {fieldNames.type_of_assessment}
          </div>
        )}
        <div className="col-md-3">{fieldNames.view_type}</div>
        <div className="col-md-5">
          {fieldNames.status_of_assessment}
          {!!fieldNames.type_of_assessment && fieldNames.text}
        </div>
        {!fieldNames.type_of_assessment && (
          <div className="col-md-4">{fieldNames.text}</div>
        )}
        <div className="col-md-12 text-center">
          {get(props, 'submitButton')}
        </div>
      </div>
    </div>
  );
};

export default withTemisConfig(LayoutFreeStyle);
